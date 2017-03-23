using Bridge.Contract;
using Bridge.Contract.Constants;
using ICSharpCode.NRefactory.CSharp;
using ICSharpCode.NRefactory.Semantics;
using ICSharpCode.NRefactory.TypeSystem;
using System.Collections.Generic;
using System.Linq;

namespace Bridge.Translator
{
    public class FieldBlock : AbstractEmitterBlock
    {
        public FieldBlock(IEmitter emitter, ITypeInfo typeInfo, bool staticBlock, bool fieldsOnly, bool isObjectLiteral = false)
            : base(emitter, typeInfo.TypeDeclaration)
        {
            this.Emitter = emitter;
            this.TypeInfo = typeInfo;
            this.StaticBlock = staticBlock;
            this.FieldsOnly = fieldsOnly;
            this.Injectors = new List<string>();
            this.IsObjectLiteral = isObjectLiteral;
        }

        public bool IsObjectLiteral
        {
            get;
            set;
        }

        public ITypeInfo TypeInfo
        {
            get;
            set;
        }

        public bool StaticBlock
        {
            get;
            set;
        }

        public bool FieldsOnly
        {
            get;
            set;
        }

        public List<string> Injectors
        {
            get;
            private set;
        }

        public bool WasEmitted
        {
            get;
            private set;
        }

        protected override void DoEmit()
        {
            if (this.Emitter.TempVariables != null)
            {
                this.Emitter.TempVariables = new Dictionary<string, bool>();
            }
            this.EmitFields(this.StaticBlock ? this.TypeInfo.StaticConfig : this.TypeInfo.InstanceConfig);
        }

        protected virtual void EmitFields(TypeConfigInfo info)
        {
            if (this.FieldsOnly || this.IsObjectLiteral)
            {
                if (info.Fields.Count > 0)
                {
                    var hasProperties = this.WriteObject(null, info.Fields, "this.{0} = {1};", "this[{0}] = {1};");
                    if (hasProperties)
                    {
                        this.Emitter.Comma = true;
                        this.WasEmitted = true;
                    }
                }

                if (!this.IsObjectLiteral)
                {
                    return;
                }
            }

            if (info.Events.Count > 0 && !this.IsObjectLiteral)
            {
                var hasProperties = this.WriteObject(JS.Fields.EVENTS, info.Events, JS.Funcs.BRIDGE_EVENT + "(this, \"{0}\", {1});", JS.Funcs.BRIDGE_EVENT + "(this, {0}, {1});");
                if (hasProperties)
                {
                    this.Emitter.Comma = true;
                    this.WasEmitted = true;
                }
            }

            if (info.Properties.Count > 0)
            {
                var hasProperties = this.WriteObject(JS.Fields.PROPERTIES, info.Properties, "this.{0} = {1};", "this[{0}] = {1};");
                if (hasProperties)
                {
                    this.Emitter.Comma = true;
                    this.WasEmitted = true;
                }
            }

            if (info.Alias.Count > 0 && !this.IsObjectLiteral)
            {
                this.WriteAlias("alias", info.Alias);
                this.Emitter.Comma = true;
            }
        }

        protected virtual bool WriteObject(string objectName, List<TypeConfigItem> members, string format, string interfaceFormat)
        {
            bool hasProperties = this.HasProperties(objectName, members);

            if (hasProperties && objectName != null && !this.IsObjectLiteral)
            {
                this.EnsureComma();
                this.Write(objectName);

                this.WriteColon();
                this.BeginBlock();
            }

            bool isProperty = JS.Fields.PROPERTIES == objectName;
            bool isField = objectName == null;
            int count = 0;

            foreach (var member in members)
            {
                object constValue = null;
                bool isPrimitive = false;
                var primitiveExpr = member.Initializer as PrimitiveExpression;
                bool write = false;
                bool writeScript = false;

                if (primitiveExpr != null)
                {
                    isPrimitive = true;
                    constValue = primitiveExpr.Value;

                    ResolveResult rr = null;
                    if (member.VarInitializer != null)
                    {
                        rr = this.Emitter.Resolver.ResolveNode(member.VarInitializer, this.Emitter);
                    }
                    else
                    {
                        rr = this.Emitter.Resolver.ResolveNode(member.Entity, this.Emitter);
                    }

                    if (rr != null && rr.Type.Kind == TypeKind.Enum)
                    {
                        constValue = Helpers.GetEnumValue(this.Emitter, rr.Type, constValue);
                        writeScript = true;
                    }
                }

                if (constValue is RawValue)
                {
                    constValue = constValue.ToString();
                    write = true;
                    writeScript = false;
                }

                var isNull = member.Initializer.IsNull || member.Initializer is NullReferenceExpression;

                if (!isNull && !isPrimitive)
                {
                    var constrr = this.Emitter.Resolver.ResolveNode(member.Initializer, this.Emitter);
                    if (constrr != null && constrr.IsCompileTimeConstant)
                    {
                        isPrimitive = true;
                        constValue = constrr.ConstantValue;

                        if (constrr.Type.Kind == TypeKind.Enum)
                        {
                            constValue = Helpers.GetEnumValue(this.Emitter, constrr.Type, constrr.ConstantValue);
                        }

                        writeScript = true;
                    }
                }

                var isNullable = false;

                if (isPrimitive && constValue is AstType)
                {
                    var itype = this.Emitter.Resolver.ResolveNode((AstType)constValue, this.Emitter);

                    if (NullableType.IsNullable(itype.Type))
                    {
                        isNullable = true;
                    }
                }

                string tpl = null;
                MemberResolveResult init_rr = null;
                if (isField && member.VarInitializer != null)
                {
                    init_rr = this.Emitter.Resolver.ResolveNode(member.VarInitializer, this.Emitter) as MemberResolveResult;
                    tpl = init_rr != null ? this.Emitter.GetInline(init_rr.Member) : null;
                }

                bool isAutoProperty = false;

                if (isProperty)
                {
                    var member_rr = this.Emitter.Resolver.ResolveNode(member.Entity, this.Emitter) as MemberResolveResult;
                    var property = (IProperty)member_rr.Member;
                    isAutoProperty = Helpers.IsAutoProperty(property);
                }

                bool written = false;
                if (!isNull && (!isPrimitive || constValue is AstType || tpl != null) && !(isProperty && !IsObjectLiteral && !isAutoProperty))
                {
                    string value = null;
                    bool needContinue = false;
                    string defValue = "";
                    if (!isPrimitive)
                    {
                        var oldWriter = this.SaveWriter();
                        this.NewWriter();
                        member.Initializer.AcceptVisitor(this.Emitter);
                        value = this.Emitter.Output.ToString();
                        this.RestoreWriter(oldWriter);

                        ResolveResult rr = null;
                        AstType astType = null;
                        if (member.VarInitializer != null)
                        {
                            rr = this.Emitter.Resolver.ResolveNode(member.VarInitializer, this.Emitter);
                        }
                        else
                        {
                            astType = member.Entity.ReturnType;
                            rr = this.Emitter.Resolver.ResolveNode(member.Entity, this.Emitter);
                        }

                        constValue = Inspector.GetDefaultFieldValue(rr.Type, astType);
                        if (rr.Type.Kind == TypeKind.Enum)
                        {
                            constValue = Helpers.GetEnumValue(this.Emitter, rr.Type, constValue);
                        }
                        isNullable = NullableType.IsNullable(rr.Type);
                        needContinue = constValue is IType;
                        writeScript = true;

                        /*if (needContinue && !(member.Initializer is ObjectCreateExpression))
                        {
                            defValue = " || " + Inspector.GetStructDefaultValue((IType)constValue, this.Emitter);
                        }*/
                    }
                    else if (constValue is AstType)
                    {
                        value = isNullable
                            ? "null"
                            : Inspector.GetStructDefaultValue((AstType)constValue, this.Emitter);
                        constValue = value;
                        write = true;
                        needContinue = !isProperty && !isNullable;
                    }

                    var name = member.GetName(this.Emitter);

                    bool isValidIdentifier = Helpers.IsValidIdentifier(name);

                    if (isProperty && isPrimitive)
                    {
                        constValue = "null";

                        if (this.IsObjectLiteral)
                        {
                            written = true;
                            if (isValidIdentifier)
                            {
                                this.Write(string.Format("this.{0} = {1};", name, value));
                            }
                            else
                            {
                                this.Write(string.Format("this[{0}] = {1};", AbstractEmitterBlock.ToJavaScript(name, this.Emitter), value));
                            }

                            this.WriteNewLine();
                        }
                        else
                        {
                            this.Injectors.Add(string.Format(name.StartsWith("\"") || !isValidIdentifier ? "this[{0}] = {1};" : "this.{0} = {1};", isValidIdentifier ? name : AbstractEmitterBlock.ToJavaScript(name, this.Emitter), value));
                        }
                    }
                    else
                    {
                        if (this.IsObjectLiteral)
                        {
                            written = true;
                            if (isValidIdentifier)
                            {
                                this.Write(string.Format("this.{0} = {1};", name, value + defValue));
                            }
                            else
                            {
                                this.Write(string.Format("this[{0}] = {1};", AbstractEmitterBlock.ToJavaScript(name, this.Emitter), value + defValue));
                            }
                            this.WriteNewLine();
                        }
                        else if (tpl != null)
                        {
                            if (!tpl.Contains("{0}"))
                            {
                                tpl = tpl + " = {0};";
                            }

                            string v = null;
                            if (!isNull && (!isPrimitive || constValue is AstType))
                            {
                                v = value + defValue;
                            }
                            else
                            {
                                if (write)
                                {
                                    v = constValue != null ? constValue.ToString() : "";
                                }
                                else if (writeScript)
                                {
                                    v = AbstractEmitterBlock.ToJavaScript(constValue, this.Emitter);
                                }
                                else
                                {
                                    var oldWriter = this.SaveWriter();
                                    this.NewWriter();
                                    member.Initializer.AcceptVisitor(this.Emitter);
                                    v = this.Emitter.Output.ToString();
                                    this.RestoreWriter(oldWriter);
                                }
                            }

                            tpl = tpl.Replace("{this}", "this").Replace("{0}", v);

                            if (!tpl.EndsWith(";"))
                            {
                                tpl += ";";
                            }
                            this.Injectors.Add(tpl);
                        }
                        else
                        {
                            if (isField && !isValidIdentifier)
                            {
                                this.Injectors.Add(string.Format("this[{0}] = {1};", name.StartsWith("\"") ? name : AbstractEmitterBlock.ToJavaScript(name, this.Emitter), value + defValue));
                            }
                            else
                            {
                                this.Injectors.Add(string.Format(name.StartsWith("\"") ? interfaceFormat : format, name, value + defValue));
                            }

                            if (isProperty)
                            {
                                needContinue = false;
                                constValue = "null";
                                write = true;
                            }
                        }
                    }

                    if (needContinue || tpl != null)
                    {
                        continue;
                    }
                }

                count++;

                if (written)
                {
                    continue;
                }

                var mname = member.GetName(this.Emitter, true);

                if (this.TypeInfo.IsEnum)
                {
                    var memeber_rr = (MemberResolveResult)this.Emitter.Resolver.ResolveNode(member.Entity, this.Emitter);
                    var mode = this.Emitter.Validator.EnumEmitMode(memeber_rr.Member.DeclaringTypeDefinition);

                    var attr = Helpers.GetInheritedAttribute(memeber_rr.Member, Translator.Bridge_ASSEMBLY + ".NameAttribute");

                    if (attr != null)
                    {
                        mname = this.Emitter.GetEntityName(memeber_rr.Member);
                    }
                    else if (mode >= 3 && mode < 7)
                    {
                        switch (mode)
                        {
                            case 3:
                                mname = Object.Net.Utilities.StringUtils.ToLowerCamelCase(memeber_rr.Member.Name);
                                break;

                            case 4:
                                mname = memeber_rr.Member.Name;
                                break;

                            case 5:
                                mname = memeber_rr.Member.Name.ToLowerInvariant();
                                break;

                            case 6:
                                mname = memeber_rr.Member.Name.ToUpperInvariant();
                                break;
                        }
                    }
                    else if (mode < 3 && mode != 1)
                    {
                        mname = member.Name;
                    }
                }

                bool isValid = Helpers.IsValidIdentifier(mname);
                if (!isValid)
                {
                    if (this.IsObjectLiteral)
                    {
                        mname = "[" + AbstractEmitterBlock.ToJavaScript(mname, this.Emitter) + "]";
                    }
                    else
                    {
                        mname = AbstractEmitterBlock.ToJavaScript(mname, this.Emitter);
                    }
                }

                if (this.IsObjectLiteral)
                {
                    this.WriteThis();
                    if (isValid)
                    {
                        this.WriteDot();
                    }
                    this.Write(mname);
                    this.Write(" = ");
                }
                else
                {
                    this.EnsureComma();
                    XmlToJsDoc.EmitComment(this, member.Entity, null, member.Entity is FieldDeclaration ? member.VarInitializer : null);
                    this.Write(mname);
                    this.WriteColon();
                }

                bool close = false;
                if (isProperty && !IsObjectLiteral && !isAutoProperty)
                {
                    this.BeginBlock();
                    new VisitorPropertyBlock(this.Emitter, (PropertyDeclaration)member.Entity).Emit();
                    this.WriteNewLine();
                    this.EndBlock();
                    this.Emitter.Comma = true;
                    continue;
                }

                if (constValue is AstType)
                {
                    if (isNullable)
                    {
                        this.Write("null");
                    }
                    else
                    {
                        this.Write(Inspector.GetStructDefaultValue((AstType)constValue, this.Emitter));
                    }
                }
                else if (constValue is IType)
                {
                    if (isNullable)
                    {
                        this.Write("null");
                    }
                    else
                    {
                        this.Write(Inspector.GetStructDefaultValue((IType)constValue, this.Emitter));
                    }
                }
                else if (write)
                {
                    this.Write(constValue);
                }
                else if (writeScript)
                {
                    this.WriteScript(constValue);
                }
                else
                {
                    member.Initializer.AcceptVisitor(this.Emitter);
                }

                if (close)
                {
                    this.Write(" }");
                }

                if (this.IsObjectLiteral)
                {
                    this.WriteSemiColon(true);
                }

                this.Emitter.Comma = true;
            }

            if (count > 0 && objectName != null && !IsObjectLiteral)
            {
                this.WriteNewLine();
                this.EndBlock();
            }

            return count > 0;
        }

        protected virtual bool HasProperties(string objectName, List<TypeConfigItem> members)
        {
            foreach (var member in members)
            {
                object constValue = null;
                bool isPrimitive = false;
                var primitiveExpr = member.Initializer as PrimitiveExpression;
                if (primitiveExpr != null)
                {
                    isPrimitive = true;
                    constValue = primitiveExpr.Value;
                }

                var isNull = member.Initializer.IsNull || member.Initializer is NullReferenceExpression;

                if (!isNull && !isPrimitive)
                {
                    var constrr = this.Emitter.Resolver.ResolveNode(member.Initializer, this.Emitter) as ConstantResolveResult;
                    if (constrr != null)
                    {
                        isPrimitive = true;
                        constValue = constrr.ConstantValue;
                    }
                }

                if (isNull)
                {
                    return true;
                }

                if (objectName != JS.Fields.PROPERTIES)
                {
                    if (!isPrimitive || constValue is AstType)
                    {
                        continue;
                    }
                }

                return true;
            }

            return false;
        }

        protected virtual void WriteAlias(string objectName, List<TypeConfigItem> members)
        {
            int pos = this.Emitter.Output.Length;
            bool oldComma = this.Emitter.Comma;
            bool oldNewLine = this.Emitter.IsNewLine;
            bool nonEmpty = false;

            if (objectName != null)
            {
                this.EnsureComma();
                this.Write(objectName);

                this.WriteColon();
                this.WriteOpenBracket();
                this.WriteNewLine();
            }

            foreach (var member in members)
            {
                if (member.DerivedMember != null)
                {
                    if (this.EmitMemberAlias(member.DerivedMember, member.InterfaceMember))
                    {
                        nonEmpty = true;
                    }

                    continue;
                }

                var rr = Emitter.Resolver.ResolveNode(member.Entity, Emitter) as MemberResolveResult;

                if (rr == null && member.VarInitializer != null)
                {
                    rr = Emitter.Resolver.ResolveNode(member.VarInitializer, Emitter) as MemberResolveResult;
                }

                if (rr != null)
                {
                    foreach (var interfaceMember in rr.Member.ImplementedInterfaceMembers)
                    {
                        if (this.EmitMemberAlias(rr.Member, interfaceMember))
                        {
                            nonEmpty = true;
                        }
                    }
                }
            }

            this.WriteNewLine();
            this.WriteCloseBracket();

            if (!nonEmpty)
            {
                this.Emitter.Output.Length = pos;
                this.Emitter.Comma = oldComma;
                this.Emitter.IsNewLine = oldNewLine;
            }
        }

        protected bool EmitMemberAlias(IMember member, IMember interfaceMember)
        {
            bool nonEmpty = false;
            if (member.IsShadowing || !member.IsOverride)
            {
                var baseMember = InheritanceHelper.GetBaseMember(member);

                if (baseMember != null && baseMember.ImplementedInterfaceMembers.Contains(interfaceMember))
                {
                    return false;
                }
            }

            if (member is IProperty && ((IProperty)member).IsIndexer)
            {
                var property = (IProperty)member;
                if (property.CanGet)
                {
                    nonEmpty = true;
                    this.EnsureComma();
                    this.WriteScript(Helpers.GetPropertyRef(member, this.Emitter, false, false, false, true));
                    this.WriteComma();
                    var alias = Helpers.GetPropertyRef(interfaceMember, this.Emitter, false, false, false);

                    if (alias.StartsWith("\""))
                    {
                        this.Write(alias);
                    }
                    else
                    {
                        this.WriteScript(alias);
                    }

                    this.Emitter.Comma = true;
                }

                if (property.CanSet)
                {
                    nonEmpty = true;
                    this.EnsureComma();
                    this.WriteScript(Helpers.GetPropertyRef(member, this.Emitter, true, false, false, true));
                    this.WriteComma();
                    var alias = Helpers.GetPropertyRef(interfaceMember, this.Emitter, true, false, false);

                    if (alias.StartsWith("\""))
                    {
                        this.Write(alias);
                    }
                    else
                    {
                        this.WriteScript(alias);
                    }

                    this.Emitter.Comma = true;
                }
            }
            else if (member is IEvent)
            {
                var ev = (IEvent)member;
                if (ev.CanAdd)
                {
                    nonEmpty = true;
                    this.EnsureComma();
                    this.WriteScript(Helpers.GetEventRef(member, this.Emitter, false, false, false, true));
                    this.WriteComma();
                    var alias = Helpers.GetEventRef(interfaceMember, this.Emitter, false, false, false);

                    if (alias.StartsWith("\""))
                    {
                        this.Write(alias);
                    }
                    else
                    {
                        this.WriteScript(alias);
                    }

                    this.Emitter.Comma = true;
                }

                if (ev.CanRemove)
                {
                    nonEmpty = true;
                    this.EnsureComma();
                    this.WriteScript(Helpers.GetEventRef(member, this.Emitter, true, false, false, true));
                    this.WriteComma();
                    var alias = Helpers.GetEventRef(interfaceMember, this.Emitter, true, false, false);

                    if (alias.StartsWith("\""))
                    {
                        this.Write(alias);
                    }
                    else
                    {
                        this.WriteScript(alias);
                    }

                    this.Emitter.Comma = true;
                }
            }
            else
            {
                nonEmpty = true;
                this.EnsureComma();
                this.WriteScript(OverloadsCollection.Create(Emitter, member).GetOverloadName(false, null, true));
                this.WriteComma();
                var alias = OverloadsCollection.Create(Emitter, interfaceMember).GetOverloadName();

                if (alias.StartsWith("\""))
                {
                    this.Write(alias);
                }
                else
                {
                    this.WriteScript(alias);
                }
            }

            this.Emitter.Comma = true;
            return nonEmpty;
        }
    }
}
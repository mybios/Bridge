using Bridge.Contract;

using ICSharpCode.NRefactory.CSharp;
using ICSharpCode.NRefactory.Semantics;
using ICSharpCode.NRefactory.TypeSystem;

namespace Bridge.Translator.TypeScript
{
    public class MemberBlock : TypeScriptBlock
    {
        public MemberBlock(IEmitter emitter, ITypeInfo typeInfo, bool staticBlock)
            : base(emitter, typeInfo.TypeDeclaration)
        {
            this.Emitter = emitter;
            this.TypeInfo = typeInfo;
            this.StaticBlock = staticBlock;
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

        protected override void DoEmit()
        {
            this.EmitFields(this.StaticBlock ? this.TypeInfo.StaticConfig : this.TypeInfo.InstanceConfig);
        }

        protected virtual void EmitFields(TypeConfigInfo info)
        {
            if (info.Fields.Count > 0)
            {
                foreach (var field in info.Fields)
                {
                    if (field.Entity.HasModifier(Modifiers.Public) || this.TypeInfo.IsEnum)
                    {
                        var fieldDecl = field.Entity as FieldDeclaration;
                        if (fieldDecl != null)
                        {
                            foreach (var variableInitializer in fieldDecl.Variables)
                            {
                                this.WriteFieldDeclaration(field, variableInitializer);
                            }
                        }
                        else
                        {
                            this.WriteFieldDeclaration(field, null);
                        }
                    }
                }
            }

            if (info.Events.Count > 0)
            {
                foreach (var ev in info.Events)
                {
                    if (ev.Entity.HasModifier(Modifiers.Public) || this.TypeInfo.Type.Kind == TypeKind.Interface)
                    {
                        var memberResult = this.Emitter.Resolver.ResolveNode(ev.VarInitializer, this.Emitter) as MemberResolveResult;

                        if (memberResult != null)
                        {
                            var ignoreInterface = memberResult.Member.DeclaringType.Kind == TypeKind.Interface &&
                                      memberResult.Member.DeclaringType.TypeParameterCount > 0;

                            this.WriteEvent(ev, Helpers.GetEventRef(memberResult.Member, this.Emitter, false, ignoreInterface:ignoreInterface), true);
                            this.WriteEvent(ev, Helpers.GetEventRef(memberResult.Member, this.Emitter, true, ignoreInterface: ignoreInterface), false);

                            if (!ignoreInterface && this.TypeInfo.Type.Kind == TypeKind.Interface)
                            {
                                this.WriteEvent(ev, Helpers.GetEventRef(memberResult.Member, this.Emitter, false, ignoreInterface: true), true);
                                this.WriteEvent(ev, Helpers.GetEventRef(memberResult.Member, this.Emitter, true, ignoreInterface: true), false);
                            }
                        }
                        else
                        {
                            var name = ev.GetName(this.Emitter);
                            name = Helpers.ReplaceFirstDollar(name);

                            this.WriteEvent(ev, Helpers.GetAddOrRemove(true, name), true);
                            this.WriteEvent(ev, Helpers.GetAddOrRemove(false, name), false);
                        }
                    }
                }
            }

            /*if (info.Properties.Count > 0)
            {
                foreach (var prop in info.Properties)
                {
                    if (prop.Entity.HasModifier(Modifiers.Public))
                    {
                        var name = prop.GetName(this.Emitter);
                        name = Helpers.ReplaceFirstDollar(name);

                        this.WriteProp(prop, name);
                    }
                }
            }*/

            new MethodsBlock(this.Emitter, this.TypeInfo, this.StaticBlock).Emit();
        }

        private void WriteFieldDeclaration(TypeConfigItem field, VariableInitializer variableInitializer)
        {
            XmlToJsDoc.EmitComment(this, field.Entity, null, variableInitializer);

            if (this.TypeInfo.IsEnum)
            {
                this.Write(EnumBlock.GetEnumItemName(this.Emitter, field));
            }
            else
            {
                this.Write(field.GetName(this.Emitter));
            }

            this.WriteColon();

            string typeName = this.TypeInfo.IsEnum
                ? (this.Emitter.Validator.IsStringNameEnum(this.TypeInfo.Type) ? "string" : "number")
                : BridgeTypes.ToTypeScriptName(field.Entity.ReturnType, this.Emitter);
            this.Write(typeName);
            this.WriteSemiColon();
            this.WriteNewLine();
        }

        private void WriteEvent(TypeConfigItem ev, string name, bool adder)
        {
            XmlToJsDoc.EmitComment(this, ev.Entity, adder);
            this.Write(name);
            this.WriteOpenParentheses();
            this.Write("value");
            this.WriteColon();
            string typeName = BridgeTypes.ToTypeScriptName(ev.Entity.ReturnType, this.Emitter);
            this.Write(typeName);
            this.WriteCloseParentheses();
            this.WriteColon();
            this.Write("void");

            this.WriteSemiColon();
            this.WriteNewLine();
        }

        private void WriteProp(TypeConfigItem ev, string name)
        {
            XmlToJsDoc.EmitComment(this, ev.Entity);
            this.Write(name);
            this.WriteColon();

            string typeName = BridgeTypes.ToTypeScriptName(ev.Entity.ReturnType, this.Emitter);
            this.Write(typeName);

            this.WriteSemiColon();
            this.WriteNewLine();
        }
    }
}
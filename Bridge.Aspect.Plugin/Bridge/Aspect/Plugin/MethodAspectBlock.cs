namespace Bridge.Aspect.Plugin
{
    using Bridge.Contract;
    using ICSharpCode.NRefactory.CSharp;
    using ICSharpCode.NRefactory.Semantics;
    using ICSharpCode.NRefactory.TypeSystem;
    using Mono.Cecil;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.CompilerServices;

    public class MethodAspectBlock : ConstructorAspectBlock
    {
        public MethodAspectBlock(IConstructorBlock block, AspectPlugin plugin) : base(block, plugin)
        {
        }

        protected virtual void EmitMethodAspect(List<string> list, List<AspectInfo> aspectInfos, EntityDeclaration method)
        {
            AspectCollection aspects = base.Plugin.Aspects;
            List<string> excludeTypes = new List<string>();
            string fullName = base.Emitter.GetTypeDefinition().FullName;
            aspectInfos.Sort((Comparison<AspectInfo>) ((a, b) => a.Priority.CompareTo(b.Priority)));
            foreach (AspectInfo info in aspectInfos)
            {
                bool? isSetter = null;
                if (this.IsAccessor)
                {
                    isSetter = new bool?(this.IsSetter);
                }
                string item = this.GetAspectCode(info, method, excludeTypes, isSetter);
                if ((item != null) && (item.Length > 0))
                {
                    list.Add(item);
                }
            }
            if (!this.IsAccessor)
            {
                AttributeTargets[] targetsArray1 = new AttributeTargets[] { AttributeTargets.Class, AttributeTargets.Assembly };
                foreach (AttributeTargets targets in targetsArray1)
                {
                    if (aspects.ContainsKey(targets))
                    {
                        List<AspectInfo> local1 = aspects[targets];
                        local1.Sort((Comparison<AspectInfo>) ((a, b) => a.Priority.CompareTo(b.Priority)));
                        foreach (AspectInfo info2 in local1)
                        {
                            if (((targets != AttributeTargets.Class) || (info2.TargetName == fullName)) && info2.IsMethodAspect(base.Emitter))
                            {
                                bool? nullable2 = null;
                                if (this.IsAccessor)
                                {
                                    nullable2 = new bool?(this.IsSetter);
                                }
                                string str3 = this.GetAspectCode(info2, method, excludeTypes, nullable2);
                                if ((str3 != null) && (str3.Length > 0))
                                {
                                    list.Add(str3);
                                }
                            }
                        }
                    }
                    if (targets == AttributeTargets.Class)
                    {
                        List<AspectInfo> list3 = new List<AspectInfo>();
                        this.FindClassInheritedAspects(base.Emitter.GetTypeDefinition(), method, list3);
                        foreach (AspectInfo info3 in list3)
                        {
                            if (info3.IsMethodAspect(base.Emitter))
                            {
                                bool? nullable3 = null;
                                if (this.IsAccessor)
                                {
                                    nullable3 = new bool?(this.IsSetter);
                                }
                                string str4 = this.GetAspectCode(info3, method, excludeTypes, nullable3);
                                if ((str4 != null) && (str4.Length > 0))
                                {
                                    list.Add(str4);
                                }
                            }
                        }
                    }
                }
            }
        }

        protected virtual void FindClassInheritedAspects(TypeDefinition baseType, EntityDeclaration method, List<AspectInfo> aspectInfos)
        {
            if (baseType.CustomAttributes.Count > 0)
            {
                string str;
                TypeDefinition typeDefinition = base.Emitter.GetTypeDefinition();
                if (this.IsAccessor)
                {
                    str = Helpers.GetPropertyRef(this.Member, base.Emitter, this.IsSetter, false, false, false);
                }
                else
                {
                    MethodDeclaration methodDeclaration = method as MethodDeclaration;
                    OperatorDeclaration operatorDeclaration = method as OperatorDeclaration;
                    OverloadsCollection overloadss = (methodDeclaration != null) ? OverloadsCollection.Create(base.Emitter, methodDeclaration) : OverloadsCollection.Create(base.Emitter, operatorDeclaration);
                    if (overloadss.HasOverloads)
                    {
                        str = overloadss.GetOverloadName(false, null, false);
                    }
                    else
                    {
                        str = base.Emitter.GetEntityName(method, false, false);
                    }
                }
                foreach (CustomAttribute attribute in baseType.CustomAttributes)
                {
                    if (AspectHelpers.IsMethodAspectAttribute(attribute.AttributeType, base.Emitter))
                    {
                        AspectInfo item = AspectHelpers.GetAspectInfo(attribute, base.Emitter, base.Plugin, AttributeTargets.Method, str);
                        if (((typeDefinition.FullName == baseType.FullName) || (item.Inheritance == TranslatorMulticastInheritance.All)) || ((item.Inheritance == TranslatorMulticastInheritance.Strict) && method.HasModifier(Modifiers.Override)))
                        {
                            aspectInfos.Add(item);
                        }
                    }
                }
            }
            baseType = base.Emitter.GetBaseTypeDefinition(baseType);
            if (baseType != null)
            {
                this.FindClassInheritedAspects(baseType, method, aspectInfos);
            }
        }

        protected virtual void FindInheritedAspect(IType baseType, IMethod aspectMethod, List<AspectInfo> aspectInfos)
        {
            IEnumerable<IMethod> methods = baseType.GetMethods(null, GetMemberOptions.IgnoreInheritedMembers);
            IMethod member = null;
            if (methods != null)
            {
                foreach (IMethod method2 in methods)
                {
                    if (ParameterListComparer.Instance.Equals(method2.Parameters, aspectMethod.Parameters) && method2.ReturnType.Equals(aspectMethod.ReturnType))
                    {
                        member = method2;
                        break;
                    }
                }
            }
            if ((member != null) && (member.Attributes.Count > 0))
            {
                foreach (IAttribute attribute in member.Attributes)
                {
                    if (AspectHelpers.IsMethodAspectAttribute(attribute.AttributeType))
                    {
                        string targetName = OverloadsCollection.Create(base.Emitter, member, false, false).GetOverloadName(false, null, false);
                        AspectInfo item = AspectHelpers.GetAspectInfo(attribute, base.Emitter, base.Plugin, AttributeTargets.Method, targetName);
                        if (item.Inheritance != TranslatorMulticastInheritance.None)
                        {
                            aspectInfos.Add(item);
                        }
                    }
                }
            }
            if (((member == null) || !member.IsVirtual) || member.IsOverride)
            {
                IType type = baseType.DirectBaseTypes.FirstOrDefault<IType>();
                if (type != null)
                {
                    this.FindInheritedAspect(type, aspectMethod, aspectInfos);
                }
            }
        }

        protected virtual void FindPropertyInheritedAspect(TypeDefinition baseType, EntityDeclaration property, List<AspectInfo> aspectInfos, bool isSetter)
        {
            PropertyDefinition definition = baseType.Properties.FirstOrDefault<PropertyDefinition>(p => p.Name == property.Name);
            if (((definition != null) && ((isSetter ? definition.SetMethod : definition.GetMethod) != null)) && ((isSetter ? definition.SetMethod : definition.GetMethod).CustomAttributes.Count > 0))
            {
                foreach (CustomAttribute attribute in (isSetter ? definition.SetMethod : definition.GetMethod).CustomAttributes)
                {
                    if (AspectHelpers.IsMethodAspectAttribute(attribute.AttributeType, base.Emitter))
                    {
                        string name = property.Name;
                        AspectInfo item = AspectHelpers.GetAspectInfo(attribute, base.Emitter, base.Plugin, AttributeTargets.Method, name);
                        if (item.Inheritance != TranslatorMulticastInheritance.None)
                        {
                            aspectInfos.Add(item);
                        }
                    }
                }
            }
            MethodDefinition definition2 = (definition != null) ? (definition.GetMethod ?? definition.SetMethod) : null;
            if (((definition == null) || !definition2.IsVirtual) || !definition2.IsNewSlot)
            {
                baseType = base.Emitter.GetBaseTypeDefinition(baseType);
                if (baseType != null)
                {
                    this.FindPropertyInheritedAspect(baseType, property, aspectInfos, isSetter);
                }
            }
        }

        protected override string FormatAspect(AspectInfo aspect, EntityDeclaration entity, string argList, string propList)
        {
            string str = null;
            if (this.IsAccessor)
            {
                str = Helpers.GetPropertyRef(this.Member, base.Emitter, this.IsSetter, false, false, false);
            }
            else
            {
                str = this.IsGroup ? null : base.Emitter.GetEntityName(entity, false, false);
                if (this.IsGroup)
                {
                    MethodDeclaration methodDeclaration = (MethodDeclaration) entity;
                    str = OverloadsCollection.Create(base.Emitter, methodDeclaration).GetOverloadName(false, null, false);
                }
            }
            string str2 = aspect.ClientType ?? aspect.AspectType;
            if ((propList.Length > 0) && (aspect.MergeFormat != null))
            {
                return string.Format(aspect.MergeFormat, new object[] { str2, str, "this", argList, propList });
            }
            return string.Format(aspect.Format, new object[] { str2, str, "this", argList });
        }

        public override IEnumerable<string> GetAspects()
        {
            IEnumerator<AttributeSection> enumerator4;
            List<string> list = new List<string>();
            base.Emitter.GetTypeDefinition();
            foreach (KeyValuePair<string, List<MethodDeclaration>> pair in base.ConstructorBlock.StaticBlock ? base.ConstructorBlock.TypeInfo.StaticMethods : base.ConstructorBlock.TypeInfo.InstanceMethods)
            {
                this.IsGroup = pair.Value.Count > 1;
                foreach (MethodDeclaration declaration in pair.Value)
                {
                    List<AspectInfo> aspectInfos = new List<AspectInfo>();
                    OverloadsCollection overloadss = OverloadsCollection.Create(base.Emitter, declaration);
                    this.IsGroup = overloadss.HasOverloads;
                    if (overloadss.Member != null)
                    {
                        if (overloadss.Member.Attributes.Count > 0)
                        {
                            foreach (IAttribute attribute in overloadss.Member.Attributes)
                            {
                                if (AspectHelpers.IsMethodAspectAttribute(attribute.AttributeType))
                                {
                                    string targetName = this.IsGroup ? overloadss.GetOverloadName(false, null, false) : base.Emitter.GetEntityName(declaration, false, false);
                                    AspectInfo item = AspectHelpers.GetAspectInfo(attribute, base.Emitter, base.Plugin, AttributeTargets.Method, targetName);
                                    aspectInfos.Add(item);
                                }
                            }
                        }
                    }
                    else
                    {
                        using (enumerator4 = declaration.Attributes.GetEnumerator())
                        {
                            while (enumerator4.MoveNext())
                            {
                                foreach (ICSharpCode.NRefactory.CSharp.Attribute attribute2 in enumerator4.Current.Attributes)
                                {
                                    ResolveResult result = base.Emitter.Resolver.ResolveNode(attribute2, base.Emitter);
                                    if ((result != null) && AspectHelpers.IsMethodAspectAttribute(result.Type))
                                    {
                                        aspectInfos.Add(AspectHelpers.GetAspectInfo(base.Plugin, attribute2, result.Type, AttributeTargets.Method, base.Emitter.GetEntityName(declaration, false, false)));
                                    }
                                }
                            }
                        }
                    }
                    if (declaration.HasModifier(Modifiers.Override))
                    {
                        MemberResolveResult result2 = base.Emitter.Resolver.ResolveNode(declaration, base.Emitter) as MemberResolveResult;
                        IType baseType = result2.Member.DeclaringType.DirectBaseTypes.FirstOrDefault<IType>();
                        this.FindInheritedAspect(baseType, (IMethod) result2.Member, aspectInfos);
                    }
                    this.EmitMethodAspect(list, aspectInfos, declaration);
                }
            }
            this.IsAccessor = true;
            foreach (KeyValuePair<string, List<EntityDeclaration>> pair2 in base.ConstructorBlock.StaticBlock ? base.ConstructorBlock.TypeInfo.StaticProperties : base.ConstructorBlock.TypeInfo.InstanceProperties)
            {
                foreach (EntityDeclaration declaration2 in pair2.Value)
                {
                    List<AspectInfo> list3 = new List<AspectInfo>();
                    IProperty member = (base.Emitter.Resolver.ResolveNode(declaration2, base.Emitter) as MemberResolveResult).Member as IProperty;
                    this.Member = member;
                    if ((member != null) && member.CanGet)
                    {
                        this.IsSetter = false;
                        if (member.Getter.Attributes.Count > 0)
                        {
                            foreach (IAttribute attribute3 in member.Getter.Attributes)
                            {
                                if (AspectHelpers.IsMethodAspectAttribute(attribute3.AttributeType))
                                {
                                    string name = declaration2.Name;
                                    AspectInfo info2 = AspectHelpers.GetAspectInfo(attribute3, base.Emitter, base.Plugin, AttributeTargets.Method, name);
                                    list3.Add(info2);
                                }
                            }
                        }
                        if (declaration2.HasModifier(Modifiers.Override))
                        {
                            this.FindPropertyInheritedAspect(base.Emitter.GetBaseTypeDefinition(), declaration2, list3, false);
                        }
                        this.EmitMethodAspect(list, list3, declaration2);
                    }
                    if ((member != null) && member.CanSet)
                    {
                        this.IsSetter = true;
                        if (member.Setter.Attributes.Count > 0)
                        {
                            foreach (IAttribute attribute4 in member.Setter.Attributes)
                            {
                                if (AspectHelpers.IsMethodAspectAttribute(attribute4.AttributeType))
                                {
                                    string str3 = declaration2.Name;
                                    AspectInfo info3 = AspectHelpers.GetAspectInfo(attribute4, base.Emitter, base.Plugin, AttributeTargets.Method, str3);
                                    list3.Add(info3);
                                }
                            }
                        }
                        if (declaration2.HasModifier(Modifiers.Override))
                        {
                            this.FindPropertyInheritedAspect(base.Emitter.GetBaseTypeDefinition(), declaration2, list3, true);
                        }
                        this.EmitMethodAspect(list, list3, declaration2);
                    }
                }
            }
            this.IsAccessor = false;
            if (base.ConstructorBlock.StaticBlock && (base.ConstructorBlock.TypeInfo.Operators.Count > 0))
            {
                foreach (KeyValuePair<OperatorType, List<OperatorDeclaration>> pair3 in base.ConstructorBlock.TypeInfo.Operators)
                {
                    this.IsGroup = pair3.Value.Count > 1;
                    foreach (OperatorDeclaration declaration3 in pair3.Value)
                    {
                        List<AspectInfo> list4 = new List<AspectInfo>();
                        OverloadsCollection overloadss2 = OverloadsCollection.Create(base.Emitter, declaration3);
                        this.IsGroup = overloadss2.HasOverloads;
                        if (overloadss2.Member != null)
                        {
                            if (overloadss2.Member.Attributes.Count > 0)
                            {
                                foreach (IAttribute attribute5 in overloadss2.Member.Attributes)
                                {
                                    if (AspectHelpers.IsMethodAspectAttribute(attribute5.AttributeType))
                                    {
                                        string str4 = this.IsGroup ? overloadss2.GetOverloadName(false, null, false) : base.Emitter.GetEntityName(declaration3, false, false);
                                        AspectInfo info4 = AspectHelpers.GetAspectInfo(attribute5, base.Emitter, base.Plugin, AttributeTargets.Method, str4);
                                        list4.Add(info4);
                                    }
                                }
                            }
                        }
                        else
                        {
                            using (enumerator4 = declaration3.Attributes.GetEnumerator())
                            {
                                while (enumerator4.MoveNext())
                                {
                                    foreach (ICSharpCode.NRefactory.CSharp.Attribute attribute6 in enumerator4.Current.Attributes)
                                    {
                                        ResolveResult result3 = base.Emitter.Resolver.ResolveNode(attribute6, base.Emitter);
                                        if ((result3 != null) && AspectHelpers.IsMethodAspectAttribute(result3.Type))
                                        {
                                            list4.Add(AspectHelpers.GetAspectInfo(base.Plugin, attribute6, result3.Type, AttributeTargets.Method, base.Emitter.GetEntityName(declaration3, false, false)));
                                        }
                                    }
                                }
                            }
                        }
                        if (declaration3.HasModifier(Modifiers.Override))
                        {
                            MemberResolveResult result4 = base.Emitter.Resolver.ResolveNode(declaration3, base.Emitter) as MemberResolveResult;
                            IType type2 = result4.Member.DeclaringType.DirectBaseTypes.FirstOrDefault<IType>();
                            this.FindInheritedAspect(type2, (IMethod) result4.Member, list4);
                        }
                        this.EmitMethodAspect(list, list4, declaration3);
                    }
                }
            }
            return list;
        }

        private bool IsAccessor { get; set; }

        protected bool IsGroup { get; set; }

        private bool IsSetter { get; set; }

        public IProperty Member { get; set; }
        
    }
}


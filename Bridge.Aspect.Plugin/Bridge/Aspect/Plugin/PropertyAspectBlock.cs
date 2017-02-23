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

    public class PropertyAspectBlock : ConstructorAspectBlock
    {
        public PropertyAspectBlock(IConstructorBlock block, AspectPlugin plugin) : base(block, plugin)
        {
        }

        private void AddAspectCode(List<string> list, AspectInfo info, EntityDeclaration property, List<string> excludeTypes)
        {
            if (info.IsMethodAspect(base.Emitter))
            {
                this.IsSetter = false;
                string item = this.GetAspectCode(info, property, excludeTypes, false);
                if ((item != null) && (item.Length > 0))
                {
                    list.Add(item);
                }
                if ((this.Member is IProperty) && ((IProperty) this.Member).CanSet)
                {
                    this.IsSetter = true;
                    item = this.GetAspectCode(info, property, excludeTypes, true);
                    if ((item != null) && (item.Length > 0))
                    {
                        list.Add(item);
                    }
                }
            }
            else
            {
                string str2 = this.GetAspectCode(info, property, excludeTypes, null);
                if ((str2 != null) && (str2.Length > 0))
                {
                    list.Add(str2);
                }
            }
        }

        protected virtual void EmitPropertyAspect(List<string> list, List<AspectInfo> aspectInfos, EntityDeclaration property)
        {
            AspectCollection aspects = base.Plugin.Aspects;
            List<string> excludeTypes = new List<string>();
            string fullName = base.Emitter.GetTypeDefinition().FullName;
            aspectInfos.Sort((Comparison<AspectInfo>) ((a, b) => a.Priority.CompareTo(b.Priority)));
            foreach (AspectInfo info in aspectInfos)
            {
                this.AddAspectCode(list, info, property, excludeTypes);
            }
            AttributeTargets[] targetsArray1 = new AttributeTargets[] { AttributeTargets.Class, AttributeTargets.Assembly };
            foreach (AttributeTargets targets in targetsArray1)
            {
                if (aspects.ContainsKey(targets))
                {
                    List<AspectInfo> local1 = aspects[targets];
                    local1.Sort((Comparison<AspectInfo>) ((a, b) => a.Priority.CompareTo(b.Priority)));
                    foreach (AspectInfo info2 in local1)
                    {
                        if (((targets != AttributeTargets.Class) || (info2.TargetName == fullName)) && (info2.IsPropertyAspect(base.Emitter) || info2.IsMethodAspect(base.Emitter)))
                        {
                            this.AddAspectCode(list, info2, property, excludeTypes);
                        }
                    }
                }
                if (targets == AttributeTargets.Class)
                {
                    List<AspectInfo> list3 = new List<AspectInfo>();
                    this.FindClassInheritedAspects(base.Emitter.GetTypeDefinition(), property, list3);
                    foreach (AspectInfo info3 in list3)
                    {
                        if (info3.IsPropertyAspect(base.Emitter) || info3.IsMethodAspect(base.Emitter))
                        {
                            this.AddAspectCode(list, info3, property, excludeTypes);
                        }
                    }
                }
            }
        }

        protected virtual void FindClassInheritedAspects(TypeDefinition baseType, EntityDeclaration property, List<AspectInfo> aspectInfos)
        {
            if (baseType.CustomAttributes.Count > 0)
            {
                TypeDefinition typeDefinition = base.Emitter.GetTypeDefinition();
                string name = property.Name;
                foreach (CustomAttribute attribute in baseType.CustomAttributes)
                {
                    if (AspectHelpers.IsPropertyAspectAttribute(attribute.AttributeType, base.Emitter) || AspectHelpers.IsMethodAspectAttribute(attribute.AttributeType, base.Emitter))
                    {
                        AspectInfo item = AspectHelpers.GetAspectInfo(attribute, base.Emitter, base.Plugin, AttributeTargets.Property, name);
                        if (((typeDefinition.FullName == baseType.FullName) || (item.Inheritance == TranslatorMulticastInheritance.All)) || ((item.Inheritance == TranslatorMulticastInheritance.Strict) && property.HasModifier(Modifiers.Override)))
                        {
                            aspectInfos.Add(item);
                        }
                    }
                }
            }
            baseType = base.Emitter.GetBaseTypeDefinition(baseType);
            if (baseType != null)
            {
                this.FindClassInheritedAspects(baseType, property, aspectInfos);
            }
        }

        protected virtual void FindPropertyInheritedAspect(TypeDefinition baseType, EntityDeclaration property, List<AspectInfo> aspectInfos)
        {
            PropertyDefinition definition = baseType.Properties.FirstOrDefault<PropertyDefinition>(p => p.Name == property.Name);
            if ((definition != null) && (definition.CustomAttributes.Count > 0))
            {
                foreach (CustomAttribute attribute in definition.CustomAttributes)
                {
                    if (AspectHelpers.IsPropertyAspectAttribute(attribute.AttributeType, base.Emitter) || AspectHelpers.IsMethodAspectAttribute(attribute.AttributeType, base.Emitter))
                    {
                        string name = property.Name;
                        AspectInfo item = AspectHelpers.GetAspectInfo(attribute, base.Emitter, base.Plugin, AttributeTargets.Property, name);
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
                    this.FindPropertyInheritedAspect(baseType, property, aspectInfos);
                }
            }
        }

        protected override string FormatAspect(AspectInfo aspect, EntityDeclaration entity, string argList, string propList)
        {
            if (aspect.IsMethodAspect(base.Emitter))
            {
                return this.FormatMethodAspect(aspect, entity, argList, propList);
            }
            string str = aspect.ClientType ?? aspect.AspectType;
            string str2 = Helpers.GetPropertyRef(this.Member, base.Emitter, true, false, false, false);
            string str3 = Helpers.GetPropertyRef(this.Member, base.Emitter, false, false, false, false);
            string str4 = "";
            if ((str2 != ("set" + entity.Name)) && (str3 != ("get" + entity.Name)))
            {
                str4 = $", {{getter:'{str3}', setter: '{str2}'}}";
            }
            else if (str2 != ("set" + entity.Name))
            {
                str4 = $", {{setter: '{str2}'}}";
            }
            else if (str3 != ("get" + entity.Name))
            {
                str4 = $", {{getter: '{str3}'}}";
            }
            if ((propList.Length > 0) && (aspect.MergeFormat != null))
            {
                return string.Format(aspect.MergeFormat, new object[] { str, entity.Name, "this", argList, propList, str4 });
            }
            return string.Format(aspect.Format, new object[] { str, entity.Name, "this", argList, str4 });
        }

        protected string FormatMethodAspect(AspectInfo aspect, EntityDeclaration entity, string argList, string propList)
        {
            string str = Helpers.GetPropertyRef(this.Member, base.Emitter, this.IsSetter, false, false, false);
            string str2 = aspect.ClientType ?? aspect.AspectType;
            if ((propList.Length > 0) && (aspect.MergeFormat != null))
            {
                return string.Format(aspect.MergeFormat, new object[] { str2, str, "this", argList, propList });
            }
            return string.Format(aspect.Format, new object[] { str2, str, "this", argList });
        }

        public override IEnumerable<string> GetAspects()
        {
            IConstructorBlock constructorBlock = base.ConstructorBlock;
            List<string> list = new List<string>();
            foreach (KeyValuePair<string, List<EntityDeclaration>> pair in constructorBlock.StaticBlock ? constructorBlock.TypeInfo.StaticProperties : constructorBlock.TypeInfo.InstanceProperties)
            {
                foreach (EntityDeclaration declaration in pair.Value)
                {
                    List<AspectInfo> aspectInfos = new List<AspectInfo>();
                    IMember member = (base.Emitter.Resolver.ResolveNode(declaration, base.Emitter) as MemberResolveResult).Member;
                    this.Member = member;
                    if (member.Attributes.Count > 0)
                    {
                        foreach (IAttribute attribute in member.Attributes)
                        {
                            if (AspectHelpers.IsPropertyAspectAttribute(attribute.AttributeType) || AspectHelpers.IsMethodAspectAttribute(attribute.AttributeType))
                            {
                                string name = declaration.Name;
                                AspectInfo item = AspectHelpers.GetAspectInfo(attribute, base.Emitter, base.Plugin, AttributeTargets.Property, name);
                                aspectInfos.Add(item);
                            }
                        }
                    }
                    if (declaration.HasModifier(Modifiers.Override))
                    {
                        this.FindPropertyInheritedAspect(base.Emitter.GetBaseTypeDefinition(), declaration, aspectInfos);
                    }
                    this.EmitPropertyAspect(list, aspectInfos, declaration);
                }
            }
            return list;
        }

        private bool IsSetter { get; set; }

        private IMember Member { get; set; }
        
    }
}


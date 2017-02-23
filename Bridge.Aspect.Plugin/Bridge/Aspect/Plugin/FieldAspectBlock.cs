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

    public class FieldAspectBlock : ConstructorAspectBlock
    {
        private TypeConfigItem currentField;

        public FieldAspectBlock(IConstructorBlock block, AspectPlugin plugin) : base(block, plugin)
        {
        }

        private void AddAspectCode(List<string> list, AspectInfo info, TypeConfigItem field, List<string> excludeTypes)
        {
            this.currentField = field;
            string item = this.GetAspectCode(info, field.Entity, excludeTypes, null);
            if ((item != null) && (item.Length > 0))
            {
                list.Add(item);
            }
        }

        protected virtual void EmitFieldAspect(List<string> list, List<AspectInfo> aspectInfos, TypeConfigItem field)
        {
            AspectCollection aspects = base.Plugin.Aspects;
            List<string> excludeTypes = new List<string>();
            string fullName = base.Emitter.GetTypeDefinition().FullName;
            aspectInfos.Sort((Comparison<AspectInfo>) ((a, b) => a.Priority.CompareTo(b.Priority)));
            foreach (AspectInfo info in aspectInfos)
            {
                this.AddAspectCode(list, info, field, excludeTypes);
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
                        if (((targets != AttributeTargets.Class) || (info2.TargetName == fullName)) && info2.IsFieldAspect(base.Emitter))
                        {
                            this.AddAspectCode(list, info2, field, excludeTypes);
                        }
                    }
                }
                if (targets == AttributeTargets.Class)
                {
                    List<AspectInfo> list3 = new List<AspectInfo>();
                    this.FindClassInheritedAspects(base.Emitter.GetTypeDefinition(), field, list3);
                    foreach (AspectInfo info3 in list3)
                    {
                        if (info3.IsFieldAspect(base.Emitter))
                        {
                            this.AddAspectCode(list, info3, field, excludeTypes);
                        }
                    }
                }
            }
        }

        protected virtual void FindClassInheritedAspects(TypeDefinition baseType, TypeConfigItem field, List<AspectInfo> aspectInfos)
        {
            if (baseType.CustomAttributes.Count > 0)
            {
                TypeDefinition typeDefinition = base.Emitter.GetTypeDefinition();
                string name = field.Name;
                foreach (CustomAttribute attribute in baseType.CustomAttributes)
                {
                    if (AspectHelpers.IsFieldAspectAttribute(attribute.AttributeType, base.Emitter))
                    {
                        AspectInfo item = AspectHelpers.GetAspectInfo(attribute, base.Emitter, base.Plugin, AttributeTargets.Field, name);
                        if ((typeDefinition.FullName == baseType.FullName) || (item.Inheritance == TranslatorMulticastInheritance.All))
                        {
                            aspectInfos.Add(item);
                        }
                    }
                }
            }
            baseType = base.Emitter.GetBaseTypeDefinition(baseType);
            if (baseType != null)
            {
                this.FindClassInheritedAspects(baseType, field, aspectInfos);
            }
        }

        protected override string FormatAspect(AspectInfo aspect, EntityDeclaration entity, string argList, string propList)
        {
            string str = aspect.ClientType ?? aspect.AspectType;
            string name = this.currentField.GetName(base.Emitter, false);
            if ((propList.Length > 0) && (aspect.MergeFormat != null))
            {
                return string.Format(aspect.MergeFormat, new object[] { str, name, "this", argList, propList });
            }
            return string.Format(aspect.Format, new object[] { str, name, "this", argList });
        }

        public override IEnumerable<string> GetAspects()
        {
            IConstructorBlock constructorBlock = base.ConstructorBlock;
            List<string> list = new List<string>();
            foreach (TypeConfigItem item in (constructorBlock.StaticBlock ? constructorBlock.TypeInfo.StaticConfig : constructorBlock.TypeInfo.InstanceConfig).Fields)
            {
                List<AspectInfo> aspectInfos = new List<AspectInfo>();
                IMember member = null;
                FieldDeclaration entity = item.Entity as FieldDeclaration;
                if (entity != null)
                {
                    member = (base.Emitter.Resolver.ResolveNode(entity.Variables.First<VariableInitializer>(), base.Emitter) as MemberResolveResult).Member;
                }
                else
                {
                    member = (base.Emitter.Resolver.ResolveNode(item.Entity, base.Emitter) as MemberResolveResult).Member;
                }
                if (member.Attributes.Count > 0)
                {
                    foreach (IAttribute attribute in member.Attributes)
                    {
                        if (AspectHelpers.IsFieldAspectAttribute(attribute.AttributeType))
                        {
                            string name = member.Name;
                            AspectInfo info = AspectHelpers.GetAspectInfo(attribute, base.Emitter, base.Plugin, AttributeTargets.Field, name);
                            aspectInfos.Add(info);
                        }
                    }
                }
                this.EmitFieldAspect(list, aspectInfos, item);
            }
            return list;
        }
        
    }
}


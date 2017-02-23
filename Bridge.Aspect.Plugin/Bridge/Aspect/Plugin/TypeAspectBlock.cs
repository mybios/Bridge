namespace Bridge.Aspect.Plugin
{
    using Bridge.Contract;
    using ICSharpCode.NRefactory.CSharp;
    using Mono.Cecil;
    using System;
    using System.Collections.Generic;
    using System.Runtime.CompilerServices;

    public class TypeAspectBlock : ConstructorAspectBlock
    {
        public TypeAspectBlock(IConstructorBlock block, AspectPlugin plugin) : base(block, plugin)
        {
        }

        protected virtual void EmitTypeAspect(List<string> list, TypeDefinition type)
        {
            bool? nullable;
            IConstructorBlock constructorBlock = base.ConstructorBlock;
            AspectCollection aspects = base.Plugin.Aspects;
            List<string> excludeTypes = new List<string>();
            string fullName = type.FullName;
            List<AspectInfo> aspectInfos = new List<AspectInfo>();
            this.FindClassInheritedAspects(base.Emitter.GetTypeDefinition(), type, aspectInfos);
            aspectInfos.Sort((Comparison<AspectInfo>) ((a, b) => a.Priority.CompareTo(b.Priority)));
            foreach (AspectInfo info in aspectInfos)
            {
                nullable = null;
                string item = this.GetAspectCode(info, constructorBlock.TypeInfo.TypeDeclaration, excludeTypes, nullable);
                if ((item != null) && (item.Length > 0))
                {
                    list.Add(item);
                }
            }
            AttributeTargets[] targetsArray1 = new AttributeTargets[] { AttributeTargets.Assembly };
            foreach (AttributeTargets targets in targetsArray1)
            {
                if (aspects.ContainsKey(targets))
                {
                    List<AspectInfo> local1 = aspects[targets];
                    local1.Sort((Comparison<AspectInfo>) ((a, b) => a.Priority.CompareTo(b.Priority)));
                    foreach (AspectInfo info2 in local1)
                    {
                        if (info2.IsTypeAspect(base.Emitter))
                        {
                            nullable = null;
                            string str2 = this.GetAspectCode(info2, constructorBlock.TypeInfo.TypeDeclaration, excludeTypes, nullable);
                            if ((str2 != null) && (str2.Length > 0))
                            {
                                list.Add(str2);
                            }
                        }
                    }
                }
            }
        }

        protected virtual void FindClassInheritedAspects(TypeDefinition baseType, TypeDefinition thisType, List<AspectInfo> aspectInfos)
        {
            if (baseType.CustomAttributes.Count > 0)
            {
                foreach (CustomAttribute attribute in baseType.CustomAttributes)
                {
                    if (AspectHelpers.IsTypeAspectAttribute(attribute.AttributeType, base.Emitter))
                    {
                        AspectInfo item = AspectHelpers.GetAspectInfo(attribute, base.Emitter, base.Plugin, AttributeTargets.Class, thisType.FullName);
                        if (((baseType.FullName == thisType.FullName) || (item.Inheritance == TranslatorMulticastInheritance.All)) || (item.Inheritance == TranslatorMulticastInheritance.Strict))
                        {
                            aspectInfos.Add(item);
                        }
                    }
                }
            }
            baseType = base.Emitter.GetBaseTypeDefinition(baseType);
            if (baseType != null)
            {
                this.FindClassInheritedAspects(baseType, thisType, aspectInfos);
            }
        }

        protected override string FormatAspect(AspectInfo aspect, EntityDeclaration entity, string argList, string propList)
        {
            string str = base.Emitter.GetEntityName(entity, false, false);
            string str2 = aspect.ClientType ?? aspect.AspectType;
            if ((propList.Length > 0) && (aspect.MergeFormat != null))
            {
                return string.Format(aspect.MergeFormat, new object[] { str2, str, "this", argList, propList });
            }
            return string.Format(aspect.Format, new object[] { str2, str, "this", argList });
        }

        public override IEnumerable<string> GetAspects()
        {
            List<string> list = new List<string>();
            if (!base.ConstructorBlock.StaticBlock)
            {
                this.EmitTypeAspect(list, base.Emitter.GetTypeDefinition());
            }
            return list;
        }
    }
}


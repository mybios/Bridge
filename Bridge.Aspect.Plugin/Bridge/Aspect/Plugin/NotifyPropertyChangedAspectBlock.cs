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

    public class NotifyPropertyChangedAspectBlock : ConstructorAspectBlock
    {
        public NotifyPropertyChangedAspectBlock(IConstructorBlock block, AspectPlugin plugin) : base(block, plugin)
        {
        }

        protected virtual bool AddAspects(AspectInfo aspect, EntityDeclaration entity, List<string> excludeTypes, List<string> list)
        {
            if (excludeTypes.Contains(aspect.AspectType))
            {
                return false;
            }
            if (!this.Match(aspect, entity, null))
            {
                return false;
            }
            if (this.Exclude(aspect, excludeTypes))
            {
                return false;
            }
            IConstructorBlock constructorBlock = base.ConstructorBlock;
            foreach (KeyValuePair<string, List<EntityDeclaration>> pair in constructorBlock.StaticBlock ? constructorBlock.TypeInfo.StaticProperties : constructorBlock.TypeInfo.InstanceProperties)
            {
                foreach (EntityDeclaration declaration in pair.Value)
                {
                    MemberResolveResult result = base.Emitter.Resolver.ResolveNode(declaration, base.Emitter) as MemberResolveResult;
                    this.Member = result.Member;
                    IMember member = this.Member;
                    bool flag = false;
                    if (member.Attributes.Count > 0)
                    {
                        using (IEnumerator<IAttribute> enumerator3 = member.Attributes.GetEnumerator())
                        {
                            while (enumerator3.MoveNext())
                            {
                                if (AspectHelpers.IsTypeAttribute(enumerator3.Current.AttributeType, "Bridge.Aspect.IgnoreAutoChangeNotificationAttribute"))
                                {
                                    flag = true;
                                    goto Label_0112;
                                }
                            }
                        }
                    }
                Label_0112:
                    if (!flag)
                    {
                        string aspectCode = this.FormatAspect(aspect, declaration, this.GetArgList(aspect), this.GetPropList(aspect));
                        aspectCode = this.OnApply(aspect, declaration, aspectCode);
                        list.Add(aspectCode);
                    }
                }
            }
            return true;
        }

        protected virtual void EmitAspect(List<string> list, TypeDefinition type)
        {
            IConstructorBlock constructorBlock = base.ConstructorBlock;
            AspectCollection aspects = base.Plugin.Aspects;
            List<string> excludeTypes = new List<string>();
            List<AspectInfo> aspectInfos = new List<AspectInfo>();
            this.FindClassInheritedAspects(base.Emitter.GetTypeDefinition(), type, aspectInfos);
            foreach (AspectInfo info in aspectInfos)
            {
                if (this.AddAspects(info, constructorBlock.TypeInfo.TypeDeclaration, excludeTypes, list))
                {
                    return;
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
                        if (info2.IsTypeAspect(base.Emitter) && this.AddAspects(info2, constructorBlock.TypeInfo.TypeDeclaration, excludeTypes, list))
                        {
                            break;
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
                    if (AspectHelpers.IsNotifyPropertyChangedAspectAttribute(attribute.AttributeType, base.Emitter))
                    {
                        AspectInfo item = AspectHelpers.GetAspectInfo(attribute, base.Emitter, base.Plugin, AttributeTargets.Class, thisType.FullName);
                        if (((baseType.FullName == thisType.FullName) || (item.Inheritance == TranslatorMulticastInheritance.All)) || (item.Inheritance == TranslatorMulticastInheritance.Strict))
                        {
                            aspectInfos.Add(item);
                            return;
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
            string name = entity.Name;
            string str2 = aspect.ClientType ?? aspect.AspectType;
            string str3 = Helpers.GetPropertyRef(this.Member, base.Emitter, true, false, false, false);
            string str4 = Helpers.GetPropertyRef(this.Member, base.Emitter, false, false, false, false);
            string str5 = "";
            if ((str3 != ("set" + entity.Name)) && (str4 != ("get" + entity.Name)))
            {
                str5 = $", {{getter:'{str4}', setter: '{str3}'}}";
            }
            else if (str3 != ("set" + entity.Name))
            {
                str5 = $", {{setter: '{str3}'}}";
            }
            else if (str4 != ("get" + entity.Name))
            {
                str5 = $", {{getter: '{str4}'}}";
            }
            if (this.Member.Attributes.Count > 0)
            {
                IType declaringType = this.Member.DeclaringType;
                List<string> list = new List<string>();
                foreach (IAttribute attribute in this.Member.Attributes)
                {
                    if (AspectHelpers.IsTypeAttribute(attribute.AttributeType, "Bridge.Aspect.NotificationDependencyAttribute"))
                    {
                        string dependencyName = attribute.PositionalArguments[0].ConstantValue.ToString();
                        IField member = declaringType.GetFields(f => f.Name == dependencyName, GetMemberOptions.None).FirstOrDefault<IField>();
                        if (member != null)
                        {
                            if (member.IsReadOnly || member.IsConst)
                            {
                                throw new EmitterException(entity, "Readonly field cannot be dependency - " + dependencyName);
                            }
                            list.Add("field:" + OverloadsCollection.Create(base.Emitter, member, false, false).GetOverloadName(false, null, false));
                        }
                        else
                        {
                            IProperty property = declaringType.GetProperties(p => p.Name == dependencyName, GetMemberOptions.None).FirstOrDefault<IProperty>();
                            if (property == null)
                            {
                                throw new EmitterException(entity, "Cannot find notification dependency - " + dependencyName);
                            }
                            if (!property.CanSet)
                            {
                                throw new EmitterException(entity, "Property without setter cannot be dependency - " + dependencyName);
                            }
                            list.Add($"prop:{Helpers.GetPropertyRef(property, base.Emitter, false, false, false, false)}+{Helpers.GetPropertyRef(property, base.Emitter, true, false, false, false)}");
                        }
                    }
                }
                if (list.Count > 0)
                {
                    string str6 = base.Emitter.ToJavaScript(list.ToArray());
                    if (str5 == "")
                    {
                        str5 = $", {{dependency: {str6}}}";
                    }
                    else
                    {
                        str5 = str5.Insert(str5.Length - 1, $", dependency: {str6}");
                    }
                }
            }
            if ((propList.Length > 0) && (aspect.MergeFormat != null))
            {
                return string.Format(aspect.MergeFormat, new object[] { str2, name, "this", argList, propList, str5 });
            }
            return string.Format(aspect.Format, new object[] { str2, name, "this", argList, str5 });
        }

        public override IEnumerable<string> GetAspects()
        {
            List<string> list = new List<string>();
            this.EmitAspect(list, base.Emitter.GetTypeDefinition());
            return list;
        }

        private IMember Member { get; set; }
        
    }
}


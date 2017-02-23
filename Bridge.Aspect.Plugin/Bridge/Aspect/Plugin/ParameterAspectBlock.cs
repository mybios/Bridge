namespace Bridge.Aspect.Plugin
{
    using Bridge.Contract;
    using ICSharpCode.NRefactory.CSharp;
    using ICSharpCode.NRefactory.TypeSystem;
    using Mono.Cecil;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.CompilerServices;

    public class ParameterAspectBlock : ConstructorAspectBlock
    {
        public ParameterAspectBlock(IConstructorBlock block, AspectPlugin plugin) : base(block, plugin)
        {
        }

        protected virtual void EmitAspect(List<string> list, List<AspectInfo> aspectInfos, EntityDeclaration method)
        {
            AspectCollection aspects = base.Plugin.Aspects;
            List<string> excludeTypes = new List<string>();
            string fullName = base.Emitter.GetTypeDefinition().FullName;
            aspectInfos.Sort((Comparison<AspectInfo>) ((a, b) => a.Priority.CompareTo(b.Priority)));
            foreach (AspectInfo info in aspectInfos)
            {
                bool? isSetter = null;
                string item = this.GetAspectCode(info, method, excludeTypes, isSetter);
                if ((item != null) && (item.Length > 0))
                {
                    list.Add(item);
                }
            }
        }

        protected virtual void FindInheritedAspect(IType baseType, IMethod aspectMethod, List<AspectInfo> aspectInfos, int index)
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
            if ((member != null) && (member.Parameters.Count > index))
            {
                IParameter parameter = member.Parameters.ElementAt<IParameter>(index);
                foreach (IAttribute attribute in parameter.Attributes)
                {
                    if (AspectHelpers.IsParameterAspectAttribute(attribute.AttributeType))
                    {
                        AspectInfo item = AspectHelpers.GetAspectInfo(attribute, base.Emitter, base.Plugin, AttributeTargets.Parameter, parameter.Name);
                        item.AdditionalInfo["index"] = index.ToString();
                        item.AdditionalInfo["name"] = parameter.Name;
                        item.AdditionalInfo["type"] = BridgeTypes.ToJsName(parameter.Type, base.Emitter, false, false, false);
                        item.AdditionalInfo["methodName"] = OverloadsCollection.Create(base.Emitter, member, false, false).GetOverloadName(false, null, false);
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
                    this.FindInheritedAspect(type, member ?? aspectMethod, aspectInfos, index);
                }
            }
        }

        protected virtual void FindPropertyInheritedAspect(TypeDefinition baseType, EntityDeclaration property, List<AspectInfo> aspectInfos)
        {
            PropertyDeclaration propDeclaration = (PropertyDeclaration) property;
            PropertyDefinition definition = baseType.Properties.FirstOrDefault<PropertyDefinition>(p => p.Name == property.Name);
            if ((definition != null) && (definition.CustomAttributes.Count > 0))
            {
                foreach (CustomAttribute attribute in definition.CustomAttributes)
                {
                    if (AspectHelpers.IsParameterAspectAttribute(attribute.AttributeType, base.Emitter))
                    {
                        AspectInfo item = AspectHelpers.GetAspectInfo(attribute, base.Emitter, base.Plugin, AttributeTargets.Parameter, "value");
                        item.AdditionalInfo["index"] = "0";
                        item.AdditionalInfo["name"] = "value";
                        item.AdditionalInfo["type"] = BridgeTypes.ToJsName(propDeclaration.ReturnType, base.Emitter);
                        item.AdditionalInfo["methodName"] = OverloadsCollection.Create(base.Emitter, propDeclaration, true).GetOverloadName(false, null, false);
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
            string str = aspect.AdditionalInfo["methodName"];
            string str2 = aspect.AdditionalInfo["name"];
            string str3 = aspect.AdditionalInfo["index"];
            string str4 = aspect.AdditionalInfo["type"];
            string str5 = aspect.ClientType ?? aspect.AspectType;
            if ((propList.Length > 0) && (aspect.MergeFormat != null))
            {
                return string.Format(aspect.MergeFormat, new object[] { str5, str, "this", argList, propList, str2, str3, str4 });
            }
            return string.Format(aspect.Format, new object[] { str5, str, "this", argList, str2, str3, str4 });
        }

        public override IEnumerable<string> GetAspects()
        {
            IConstructorBlock constructorBlock = base.ConstructorBlock;
            Dictionary<string, List<EntityDeclaration>> dictionary = constructorBlock.StaticBlock ? constructorBlock.TypeInfo.StaticProperties : constructorBlock.TypeInfo.InstanceProperties;
            List<string> list = new List<string>();
            TypeDefinition typeDefinition = base.Emitter.GetTypeDefinition();
            foreach (KeyValuePair<string, List<MethodDeclaration>> pair in constructorBlock.StaticBlock ? constructorBlock.TypeInfo.StaticMethods : constructorBlock.TypeInfo.InstanceMethods)
            {
                this.IsGroup = pair.Value.Count > 1;
                foreach (MethodDeclaration declaration in pair.Value)
                {
                    List<AspectInfo> aspectInfos = new List<AspectInfo>();
                    OverloadsCollection overloadss = OverloadsCollection.Create(base.Emitter, declaration);
                    if (overloadss.Member != null)
                    {
                        string targetName = this.IsGroup ? overloadss.GetOverloadName(false, null, false) : base.Emitter.GetEntityName(declaration, false, false);
                        bool flag = declaration.HasModifier(Modifiers.Override);
                        IList<IParameter> parameters = ((IMethod) overloadss.Member).Parameters;
                        if ((overloadss.Member.Attributes.Count > 0) && (parameters.Count > 0))
                        {
                            foreach (IAttribute attribute in overloadss.Member.Attributes)
                            {
                                if (AspectHelpers.IsParameterAspectAttribute(attribute.AttributeType))
                                {
                                    for (int j = 0; j < parameters.Count; j++)
                                    {
                                        IParameter parameter = parameters[j];
                                        AspectInfo item = AspectHelpers.GetAspectInfo(attribute, base.Emitter, base.Plugin, AttributeTargets.Parameter, targetName);
                                        item.AdditionalInfo["index"] = j.ToString();
                                        item.AdditionalInfo["name"] = parameter.Name;
                                        item.AdditionalInfo["type"] = BridgeTypes.ToJsName(declaration.Parameters.ElementAt<ParameterDeclaration>(j).Type, base.Emitter);
                                        item.AdditionalInfo["methodName"] = targetName;
                                        aspectInfos.Add(item);
                                    }
                                }
                            }
                        }
                        this.IsGroup = overloadss.HasOverloads;
                        for (int i = 0; i < parameters.Count; i++)
                        {
                            IParameter parameter2 = parameters[i];
                            if (parameter2.Attributes.Count > 0)
                            {
                                foreach (IAttribute attribute2 in parameter2.Attributes)
                                {
                                    if (AspectHelpers.IsParameterAspectAttribute(attribute2.AttributeType))
                                    {
                                        AspectInfo info2 = AspectHelpers.GetAspectInfo(attribute2, base.Emitter, base.Plugin, AttributeTargets.Parameter, targetName);
                                        info2.AdditionalInfo["index"] = i.ToString();
                                        info2.AdditionalInfo["name"] = parameter2.Name;
                                        info2.AdditionalInfo["type"] = BridgeTypes.ToJsName(declaration.Parameters.ElementAt<ParameterDeclaration>(i).Type, base.Emitter);
                                        info2.AdditionalInfo["methodName"] = targetName;
                                        aspectInfos.Add(info2);
                                    }
                                }
                            }
                            if (flag)
                            {
                                IType baseType = overloadss.Member.DeclaringType.DirectBaseTypes.FirstOrDefault<IType>();
                                this.FindInheritedAspect(baseType, (IMethod) overloadss.Member, aspectInfos, i);
                            }
                        }
                    }
                    this.EmitAspect(list, aspectInfos, declaration);
                }
            }
            this.IsGroup = false;
            foreach (KeyValuePair<string, List<EntityDeclaration>> pair2 in dictionary)
            {
                using (List<EntityDeclaration>.Enumerator enumerator5 = pair2.Value.GetEnumerator())
                {
                    while (enumerator5.MoveNext())
                    {
                        EntityDeclaration property = enumerator5.Current;
                        PropertyDeclaration propDeclaration = property as PropertyDeclaration;
                        if (propDeclaration != null && (propDeclaration.Setter != null) && !propDeclaration.Setter.IsNull)
                        {
                            List<AspectInfo> list4 = new List<AspectInfo>();
                            PropertyDefinition definition2 = typeDefinition.Properties.FirstOrDefault<PropertyDefinition>(p => p.Name == property.Name);
                            if ((definition2 != null) && (definition2.CustomAttributes.Count > 0))
                            {
                                foreach (CustomAttribute attribute3 in definition2.CustomAttributes)
                                {
                                    if (AspectHelpers.IsParameterAspectAttribute(attribute3.AttributeType, base.Emitter))
                                    {
                                        AspectInfo info3 = AspectHelpers.GetAspectInfo(attribute3, base.Emitter, base.Plugin, AttributeTargets.Parameter, "value");
                                        info3.AdditionalInfo["index"] = "0";
                                        info3.AdditionalInfo["name"] = "value";
                                        info3.AdditionalInfo["type"] = BridgeTypes.ToJsName(propDeclaration.ReturnType, base.Emitter);
                                        info3.AdditionalInfo["methodName"] = OverloadsCollection.Create(base.Emitter, propDeclaration, true).GetOverloadName(false, null, false);
                                        list4.Add(info3);
                                    }
                                }
                            }
                            if (property.HasModifier(Modifiers.Override))
                            {
                                this.FindPropertyInheritedAspect(base.Emitter.GetBaseTypeDefinition(), property, list4);
                            }
                            this.EmitAspect(list, list4, property);
                        }
                    }
                }
            }
            return list;
        }

        protected bool IsGroup { get; set; }
        
    }
}


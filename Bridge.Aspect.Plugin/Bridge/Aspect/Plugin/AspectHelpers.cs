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
    using System.Text.RegularExpressions;

    public static class AspectHelpers
    {
        public static string GetAspectFormat(IType type, string name)
        {
            IEnumerable<IField> fields = type.GetFields(f => f.Name == name, GetMemberOptions.IgnoreInheritedMembers);
            if (fields.Count<IField>() > 0)
            {
                return fields.First<IField>().ConstantValue.ToString();
            }
            IType[] typeArray = type.GetAllBaseTypes().ToArray<IType>();
            for (int i = typeArray.Length - 1; i >= 0; i--)
            {
                fields = typeArray[i].GetFields(f => f.Name == name, GetMemberOptions.None);
                if (fields.Count<IField>() > 0)
                {
                    return fields.First<IField>().ConstantValue.ToString();
                }
            }
            return null;
        }

        public static string GetAspectFormat(TypeReference type, IEmitter emitter, string name)
        {
            TypeDefinition definition = Helpers.ToTypeDefinition(type, emitter);
            if (definition == null)
            {
                return null;
            }
            FieldDefinition definition2 = definition.Fields.FirstOrDefault<FieldDefinition>(f => f.Name == name);
            if (definition2 != null)
            {
                return definition2.Constant.ToString();
            }
            TypeReference baseType = definition.BaseType;
            if (baseType != null)
            {
                return GetAspectFormat(Helpers.ToTypeDefinition(baseType, emitter), emitter, name);
            }
            return null;
        }

        public static AspectInfo GetAspectInfo(AspectPlugin plugin, ICSharpCode.NRefactory.CSharp.Attribute attr, IType type, AttributeTargets target, string targetName)
        {
            AspectInfo info = new AspectInfo(plugin);
            if (attr.HasArgumentList)
            {
                foreach (PrimitiveExpression expression in attr.Arguments)
                {
                    if (expression != null)
                    {
                        info.ConstructorArguments.Add(expression.Value);
                    }
                }
            }
            info.Target = target;
            info.AspectType = type.FullName;
            info.Type = type;
            info.Format = GetAspectFormat(type, "Format");
            info.MergeFormat = GetAspectFormat(type, "MergeFormat");
            info.TargetName = targetName;
            foreach (Expression local1 in attr.Arguments)
            {
                NamedExpression expression2 = local1 as NamedExpression;
                NamedArgumentExpression expression3 = local1 as NamedArgumentExpression;
                if (expression2 != null)
                {
                    PrimitiveExpression expression4 = expression2.Expression as PrimitiveExpression;
                    if (expression4 != null)
                    {
                        info.Properties.Add(expression2.Name, expression4.Value);
                    }
                }
                else if (expression3 != null)
                {
                    PrimitiveExpression expression5 = expression3.Expression as PrimitiveExpression;
                    if (expression5 != null)
                    {
                        info.Properties.Add(expression3.Name, expression5.Value);
                    }
                }
            }
            ReadAspectTypeProperties(plugin, type);
            return info;
        }

        public static AspectInfo GetAspectInfo(IAttribute attr, IEmitter emitter, AspectPlugin plugin, AttributeTargets target, string targetName)
        {
            IType attributeType = attr.AttributeType;
            AspectInfo info = new AspectInfo(plugin);
            if (attr.PositionalArguments.Count > 0)
            {
                foreach (ResolveResult result in attr.PositionalArguments)
                {
                    if (result.Type.Kind == TypeKind.Enum)
                    {
                        info.ConstructorArguments.Add(Helpers.GetEnumValue(emitter, result.Type, result.ConstantValue));
                    }
                    else
                    {
                        info.ConstructorArguments.Add(result.ConstantValue);
                    }
                }
            }
            TypeDefinition typeDefinition = emitter.BridgeTypes.Get(attributeType, false).TypeDefinition;
            info.Target = target;
            info.AspectType = attributeType.FullName;
            info.ClientType = emitter.Validator.GetCustomTypeName(typeDefinition, emitter);
            info.Type = attr.AttributeType;
            info.Format = GetAspectFormat(attributeType, "Format");
            info.MergeFormat = GetAspectFormat(attributeType, "MergeFormat");
            info.TargetName = targetName;
            foreach (KeyValuePair<IMember, ResolveResult> pair in attr.NamedArguments)
            {
                if (pair.Value.Type.Kind == TypeKind.Enum)
                {
                    info.Properties.Add(pair.Key.Name, Helpers.GetEnumValue(emitter, pair.Value.Type, pair.Value.ConstantValue));
                }
                else
                {
                    info.Properties.Add(pair.Key.Name, pair.Value.ConstantValue);
                }
            }
            ReadAspectTypeProperties(plugin, attributeType);
            return info;
        }

        public static AspectInfo GetAspectInfo(CustomAttribute attr, IEmitter emitter, AspectPlugin plugin, AttributeTargets target, string targetName)
        {
            TypeReference attributeType = attr.AttributeType;
            AspectInfo info = new AspectInfo(plugin);
            if (attr.HasConstructorArguments)
            {
                foreach (CustomAttributeArgument argument in attr.ConstructorArguments)
                {
                    info.ConstructorArguments.Add(argument.Value);
                }
            }
            info.Target = target;
            info.AspectType = attributeType.FullName;
            info.ClientType = emitter.Validator.GetCustomTypeName(Helpers.ToTypeDefinition(attributeType, emitter), emitter);
            info.TypeReference = attributeType;
            info.Type = emitter.BridgeTypes.Get(attributeType, false).Type;
            info.Format = GetAspectFormat(attributeType, emitter, "Format");
            info.MergeFormat = GetAspectFormat(attributeType, emitter, "MergeFormat");
            info.TargetName = targetName;
            foreach (CustomAttributeNamedArgument argument2 in attr.Properties)
            {
                info.Properties.Add(argument2.Name, argument2.Argument.Value);
            }
            ReadAspectTypeProperties(emitter, plugin, attributeType);
            return info;
        }

        public static bool IsAspectAttribute(IType type) => 
            IsTypeAttribute(type, "Bridge.Aspect.AspectAttribute");

        public static bool IsAspectAttribute(TypeReference type, IEmitter emitter) => 
            Helpers.IsAssignableFrom(emitter.TypeDefinitions["Bridge.Aspect.AspectAttribute"], Helpers.ToTypeDefinition(type, emitter), emitter);

        public static bool IsFieldAspectAttribute(IType type) => 
            IsTypeAttribute(type, "Bridge.Aspect.FieldAspectAttribute");

        public static bool IsFieldAspectAttribute(TypeReference type, IEmitter emitter) => 
            Helpers.IsAssignableFrom(emitter.TypeDefinitions["Bridge.Aspect.FieldAspectAttribute"], Helpers.ToTypeDefinition(type, emitter), emitter);

        public static bool IsMethodAspectAttribute(IType type) => 
            IsTypeAttribute(type, "Bridge.Aspect.AbstractMethodAspectAttribute");

        public static bool IsMethodAspectAttribute(TypeReference type, IEmitter emitter) => 
            Helpers.IsAssignableFrom(emitter.TypeDefinitions["Bridge.Aspect.AbstractMethodAspectAttribute"], Helpers.ToTypeDefinition(type, emitter), emitter);

        public static bool IsMulticastAspectAttribute(IType type) => 
            IsTypeAttribute(type, "Bridge.Aspect.MulticastAspectAttribute");

        public static bool IsMulticastAspectAttribute(TypeReference type, IEmitter emitter) => 
            Helpers.IsAssignableFrom(emitter.TypeDefinitions["Bridge.Aspect.MulticastAspectAttribute"], Helpers.ToTypeDefinition(type, emitter), emitter);

        public static bool IsNotifyPropertyChangedAspectAttribute(TypeReference type, IEmitter emitter) => 
            Helpers.IsAssignableFrom(emitter.TypeDefinitions["Bridge.Aspect.NotifyPropertyChangedAttribute"], Helpers.ToTypeDefinition(type, emitter), emitter);

        public static bool IsParameterAspectAttribute(IType type) => 
            IsTypeAttribute(type, "Bridge.Aspect.ParameterAspectAttribute");

        public static bool IsParameterAspectAttribute(TypeReference type, IEmitter emitter) => 
            Helpers.IsAssignableFrom(emitter.TypeDefinitions["Bridge.Aspect.ParameterAspectAttribute"], Helpers.ToTypeDefinition(type, emitter), emitter);

        public static bool IsPropertyAspectAttribute(IType type) => 
            IsTypeAttribute(type, "Bridge.Aspect.PropertyAspectAttribute");

        public static bool IsPropertyAspectAttribute(TypeReference type, IEmitter emitter) => 
            Helpers.IsAssignableFrom(emitter.TypeDefinitions["Bridge.Aspect.PropertyAspectAttribute"], Helpers.ToTypeDefinition(type, emitter), emitter);

        public static bool IsTypeAspectAttribute(TypeReference type, IEmitter emitter) => 
            Helpers.IsAssignableFrom(emitter.TypeDefinitions["Bridge.Aspect.TypeAspectAttribute"], Helpers.ToTypeDefinition(type, emitter), emitter);

        public static bool IsTypeAttribute(IType type, string name)
        {
            if (type.FullName == name)
            {
                return true;
            }
            if (type.DirectBaseTypes != null)
            {
                using (IEnumerator<IType> enumerator = type.DirectBaseTypes.GetEnumerator())
                {
                    while (enumerator.MoveNext())
                    {
                        if (IsTypeAttribute(enumerator.Current, name))
                        {
                            return true;
                        }
                    }
                }
            }
            return false;
        }

        public static bool IsTypeAttribute(TypeReference type, string name, IEmitter emitter) => 
            Helpers.IsAssignableFrom(emitter.TypeDefinitions[name], Helpers.ToTypeDefinition(type, emitter), emitter);

        public static bool MatchTarget(string targetMask, string target)
        {
            string str;
            if ((targetMask == null) || (targetMask.Length == 0))
            {
                return true;
            }
            if (targetMask.StartsWith("regex:"))
            {
                str = targetMask.Substring(6);
            }
            else
            {
                str = "^" + Regex.Escape(targetMask).Replace(@"\*", ".*").Replace(@"\?", ".") + "$";
            }
            return Regex.IsMatch(target, str);
        }

        public static bool MatchTargetAttributes(TranslatorMulticastAttributes targetMembersAttributes, ParameterDeclaration entity)
        {
            bool flag = true;
            if (targetMembersAttributes == TranslatorMulticastAttributes.Default)
            {
                return flag;
            }
            flag = false;
            return ((((targetMembersAttributes & TranslatorMulticastAttributes.OutParameter) == TranslatorMulticastAttributes.Instance) && (entity.ParameterModifier == ParameterModifier.Out)) || ((((targetMembersAttributes & TranslatorMulticastAttributes.RefParameter) == TranslatorMulticastAttributes.RefParameter) && (entity.ParameterModifier == ParameterModifier.Ref)) || flag));
        }

        public static bool MatchTargetAttributes(TranslatorMulticastAttributes targetMembersAttributes, EntityDeclaration entity, IEmitter emitter, bool? isSetter)
        {
            bool flag = true;
            if (targetMembersAttributes == TranslatorMulticastAttributes.Default)
            {
                return flag;
            }
            MemberResolveResult result = emitter.Resolver.ResolveNode(entity, emitter) as MemberResolveResult;
            flag = false;
            if (((targetMembersAttributes & TranslatorMulticastAttributes.Instance) == TranslatorMulticastAttributes.Instance) && !entity.HasModifier(Modifiers.Static))
            {
                return true;
            }
            if (((targetMembersAttributes & TranslatorMulticastAttributes.Internal) == TranslatorMulticastAttributes.Internal) && entity.HasModifier(Modifiers.Internal))
            {
                return true;
            }
            if ((((targetMembersAttributes & TranslatorMulticastAttributes.NonVirtual) == TranslatorMulticastAttributes.NonVirtual) && !entity.HasModifier(Modifiers.Virtual)) && !entity.HasModifier(Modifiers.Override))
            {
                return true;
            }
            if (((targetMembersAttributes & TranslatorMulticastAttributes.Private) == TranslatorMulticastAttributes.Private) && (entity.HasModifier(Modifiers.Private) || ((!entity.HasModifier(Modifiers.Public) && !entity.HasModifier(Modifiers.Protected)) && !entity.HasModifier(Modifiers.Internal))))
            {
                return true;
            }
            if (((targetMembersAttributes & TranslatorMulticastAttributes.Protected) == TranslatorMulticastAttributes.Protected) && entity.HasModifier(Modifiers.Protected))
            {
                return true;
            }
            if (((targetMembersAttributes & TranslatorMulticastAttributes.Public) == TranslatorMulticastAttributes.Public) && entity.HasModifier(Modifiers.Public))
            {
                return true;
            }
            if (((targetMembersAttributes & TranslatorMulticastAttributes.Static) == TranslatorMulticastAttributes.Static) && entity.HasModifier(Modifiers.Static))
            {
                return true;
            }
            if (((targetMembersAttributes & TranslatorMulticastAttributes.Virtual) == TranslatorMulticastAttributes.Virtual) && (entity.HasModifier(Modifiers.Virtual) || entity.HasModifier(Modifiers.Override)))
            {
                return true;
            }
            if (((targetMembersAttributes & TranslatorMulticastAttributes.Async) == TranslatorMulticastAttributes.Virtual) && entity.HasModifier(Modifiers.Async))
            {
                return true;
            }
            if (((targetMembersAttributes & TranslatorMulticastAttributes.NonAsync) == TranslatorMulticastAttributes.Virtual) && !entity.HasModifier(Modifiers.Async))
            {
                return true;
            }
            IMethod member = null;
            if ((result != null) && (result.Member is IMethod))
            {
                member = (IMethod) result.Member;
            }
            else if (((result != null) && (result.Member is IProperty)) && isSetter.HasValue)
            {
                IProperty property = (IProperty) result.Member;
                member = isSetter.Value ? property.Setter : property.Getter;
            }
            if (member == null)
            {
                return flag;
            }
            return ((((targetMembersAttributes & TranslatorMulticastAttributes.Accessor) == TranslatorMulticastAttributes.Accessor) && member.IsAccessor) || ((((targetMembersAttributes & TranslatorMulticastAttributes.NonAccessor) == TranslatorMulticastAttributes.NonAccessor) && !member.IsAccessor) || ((((targetMembersAttributes & TranslatorMulticastAttributes.Operator) == TranslatorMulticastAttributes.Operator) && member.IsOperator) || ((((targetMembersAttributes & TranslatorMulticastAttributes.NonOperator) == TranslatorMulticastAttributes.NonOperator) && !member.IsOperator) || ((((targetMembersAttributes & TranslatorMulticastAttributes.CompilerGenerated) == TranslatorMulticastAttributes.CompilerGenerated) && (!member.HasBody || member.BodyRegion.IsEmpty)) || (((((targetMembersAttributes & TranslatorMulticastAttributes.NonCompilerGenerated) == TranslatorMulticastAttributes.NonCompilerGenerated) && member.HasBody) && !member.BodyRegion.IsEmpty) || flag))))));
        }

        public static void ReadAspectTypeProperties(AspectPlugin plugin, IType type)
        {
            if (!plugin.AspectTypeProperties.ContainsKey(type.FullName))
            {
                Dictionary<string, object> dictionary = new Dictionary<string, object>();
                plugin.AspectTypeProperties.Add(type.FullName, dictionary);
                foreach (IAttribute attribute in type.GetDefinition().Attributes)
                {
                    if (attribute.AttributeType.FullName == "Bridge.Aspect.MulticastOptionsAttribute")
                    {
                        foreach (KeyValuePair<IMember, ResolveResult> pair in attribute.NamedArguments)
                        {
                            dictionary.Add(pair.Key.Name, pair.Value.ConstantValue);
                        }
                    }
                }
            }
        }

        public static void ReadAspectTypeProperties(IEmitter emitter, AspectPlugin plugin, TypeReference type)
        {
            if (!plugin.AspectTypeProperties.ContainsKey(type.FullName))
            {
                Dictionary<string, object> dictionary = new Dictionary<string, object>();
                plugin.AspectTypeProperties.Add(type.FullName, dictionary);
                foreach (CustomAttribute attribute in Helpers.ToTypeDefinition(type, emitter).CustomAttributes)
                {
                    if (attribute.AttributeType.FullName == "Bridge.Aspect.MulticastOptionsAttribute")
                    {
                        foreach (CustomAttributeNamedArgument argument in attribute.Properties)
                        {
                            dictionary.Add(argument.Name, argument.Argument.Value);
                        }
                    }
                }
            }
        }
    }
}


namespace Bridge.Aspect.Plugin
{
    using Bridge.Contract;
    using ICSharpCode.NRefactory.TypeSystem;
    using Mono.Cecil;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.CompilerServices;

    public class AspectInfo
    {
        private Dictionary<string, object> customProperties;

        public AspectInfo(Bridge.Aspect.Plugin.AspectPlugin plugin)
        {
            this.Properties = new Dictionary<string, object>();
            this.AdditionalInfo = new Dictionary<string, string>();
            this.ConstructorArguments = new List<object>();
            this.AspectPlugin = plugin;
        }

        public T GetProperty<T>(string key, T defaultValue)
        {
            Dictionary<string, object> dictionary = this.AspectPlugin.AspectTypeProperties[this.AspectType];
            if (this.Properties.ContainsKey(key))
            {
                if (typeof(T).IsEnum)
                {
                    return (T) this.Properties[key];
                }
                return (T) Convert.ChangeType(this.Properties[key], typeof(T));
            }
            if (!dictionary.ContainsKey(key))
            {
                return defaultValue;
            }
            if (typeof(T).IsEnum)
            {
                return (T) dictionary[key];
            }
            return (T) Convert.ChangeType(dictionary[key], typeof(T));
        }

        public bool IsFieldAspect(IEmitter emitter)
        {
            string name = "Bridge.Aspect.FieldAspectAttribute";
            if (this.Type != null)
            {
                return AspectHelpers.IsTypeAttribute(this.Type, name);
            }
            return AspectHelpers.IsTypeAttribute(this.TypeReference, name, emitter);
        }

        public bool IsMethodAspect(IEmitter emitter)
        {
            string name = "Bridge.Aspect.MethodAspectAttribute";
            if (this.Type != null)
            {
                return AspectHelpers.IsTypeAttribute(this.Type, name);
            }
            return AspectHelpers.IsTypeAttribute(this.TypeReference, name, emitter);
        }

        public bool IsPropertyAspect(IEmitter emitter)
        {
            string name = "Bridge.Aspect.PropertyAspectAttribute";
            if (this.Type != null)
            {
                return AspectHelpers.IsTypeAttribute(this.Type, name);
            }
            return AspectHelpers.IsTypeAttribute(this.TypeReference, name, emitter);
        }

        public bool IsTypeAspect(IEmitter emitter)
        {
            string name = "Bridge.Aspect.TypeAspectAttribute";
            if (this.Type != null)
            {
                return AspectHelpers.IsTypeAttribute(this.Type, name);
            }
            return AspectHelpers.IsTypeAttribute(this.TypeReference, name, emitter);
        }

        public Dictionary<string, string> AdditionalInfo { get; set; }

        public Bridge.Aspect.Plugin.AspectPlugin AspectPlugin { get; set; }

        public string AspectType { get; set; }

        public string ClientType { get; set; }

        public List<object> ConstructorArguments { get; set; }

        public Dictionary<string, object> CustomProperties
        {
            get
            {
                if (this.customProperties == null)
                {
                    string[] source = new string[] { "TargetMembersAttributes", "TargetMembers", "TargetTypesAttributes", "TargetTypes", "Exclude", "Multiple", "Replace", "Inheritance", "Priority" };
                    this.customProperties = new Dictionary<string, object>();
                    foreach (KeyValuePair<string, object> pair in this.Properties)
                    {
                        string key = pair.Key;
                        if (!source.Contains<string>(key))
                        {
                            this.customProperties.Add(pair.Key, pair.Value);
                        }
                    }
                }
                return this.customProperties;
            }
        }

        public bool Exclude =>
            this.GetProperty<bool>("Exclude", false);

        public string Format { get; set; }

        public TranslatorMulticastInheritance Inheritance =>
            this.GetProperty<TranslatorMulticastInheritance>("Inheritance", TranslatorMulticastInheritance.None);

        public string MergeFormat { get; set; }

        public bool Multiple =>
            this.GetProperty<bool>("Multiple", true);

        public int Priority =>
            this.GetProperty<int>("Priority", 0);

        public Dictionary<string, object> Properties { get; set; }

        public bool Replace =>
            this.GetProperty<bool>("Replace", false);

        public AttributeTargets Target { get; set; }

        public string TargetMembers =>
            this.GetProperty<string>("TargetMembers", "");

        public TranslatorMulticastAttributes TargetMembersAttributes =>
            this.GetProperty<TranslatorMulticastAttributes>("TargetMembersAttributes", TranslatorMulticastAttributes.Default);

        public string TargetName { get; set; }

        public string TargetTypes =>
            this.GetProperty<string>("TargetTypes", "");

        public TranslatorMulticastAttributes TargetTypesAttributes =>
            this.GetProperty<TranslatorMulticastAttributes>("TargetTypesAttributes", TranslatorMulticastAttributes.Default);

        public IType Type { get; set; }

        public Mono.Cecil.TypeReference TypeReference { get; set; }
    }
}


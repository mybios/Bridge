namespace Bridge.Aspect.Plugin
{
    using Bridge.Contract;
    using Bridge.Licensing;
    using Mono.Cecil;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.Composition;
    using System.Linq;
    using System.Runtime.CompilerServices;

    [Export(typeof(IPlugin))]
    public class AspectPlugin : AbstractPlugin
    {
        private IEnumerable<string> aspectsCache;
        private string cacheKey;

        public AspectPlugin()
        {
            this.Aspects = new AspectCollection();
            this.AspectTypeProperties = new Dictionary<string, Dictionary<string, object>>();
        }

        public override void BeforeEmit(IEmitter emitter, ITranslator translator)
        {
            this.InspectGlobalAspects(emitter, translator.AssemblyDefinition);
        }

        protected virtual IEnumerable<string> GetAspects(IConstructorBlock constructorBlock)
        {
            if (!this.HasAspectsAPI(constructorBlock.Emitter))
            {
                return new string[0];
            }
            if (this.cacheKey != (constructorBlock.TypeInfo.Key + constructorBlock.StaticBlock.ToString()))
            {
                this.cacheKey = constructorBlock.TypeInfo.Key + constructorBlock.StaticBlock.ToString();
                this.aspectsCache = null;
            }
            if (this.aspectsCache == null)
            {
                ProjectPropertyReader reader = new ProjectPropertyReader(constructorBlock.Emitter.Translator.AssemblyDefinition);
                this.License.Init(reader.Read());
                IEnumerable<string> aspects = new ParameterAspectBlock(constructorBlock, this).GetAspects();
                IEnumerable<string> second = new MethodAspectBlock(constructorBlock, this).GetAspects();
                IEnumerable<string> enumerable3 = new PropertyAspectBlock(constructorBlock, this).GetAspects();
                IEnumerable<string> enumerable4 = new FieldAspectBlock(constructorBlock, this).GetAspects();
                IEnumerable<string> enumerable5 = new TypeAspectBlock(constructorBlock, this).GetAspects();
                IEnumerable<string> enumerable6 = new NotifyPropertyChangedAspectBlock(constructorBlock, this).GetAspects();
                this.aspectsCache = aspects.Concat<string>(enumerable5).Concat<string>(second).Concat<string>(enumerable3).Concat<string>(enumerable4).Concat<string>(enumerable6);
            }
            return this.aspectsCache;
        }

        public override IEnumerable<string> GetConstructorInjectors(IConstructorBlock constructorBlock) => 
            this.GetAspects(constructorBlock);

        public bool HasAspectsAPI(IEmitter emitter) => 
            emitter.TypeDefinitions.ContainsKey("Bridge.Aspect.AspectAttribute");

        public override bool HasConstructorInjectors(IConstructorBlock constructorBlock) => 
            this.GetAspects(constructorBlock).Any<string>();

        protected virtual void InspectGlobalAspects(IEmitter emitter, AssemblyDefinition assemblyDefinition)
        {
            if (assemblyDefinition.HasCustomAttributes && this.HasAspectsAPI(emitter))
            {
                foreach (CustomAttribute attribute in assemblyDefinition.CustomAttributes)
                {
                    if (AspectHelpers.IsMulticastAspectAttribute(attribute.AttributeType, emitter))
                    {
                        List<AspectInfo> list;
                        AspectCollection aspects = this.Aspects;
                        if (aspects.ContainsKey(AttributeTargets.Assembly))
                        {
                            list = aspects[AttributeTargets.Assembly];
                        }
                        else
                        {
                            list = new List<AspectInfo>();
                            aspects.Add(AttributeTargets.Assembly, list);
                        }
                        AspectInfo item = AspectHelpers.GetAspectInfo(attribute, emitter, this, AttributeTargets.Assembly, null);
                        list.Add(item);
                    }
                }
            }
        }

        public override void OnConfigRead(IAssemblyInfo config)
        {
            config.AutoPropertyToField = false;
        }

        public AspectCollection Aspects { get; set; }

        public Dictionary<string, Dictionary<string, object>> AspectTypeProperties { get; set; }

        internal Bridge.Licensing.License License =>
            Bridge.Licensing.License.Instance;

        private class ProjectPropertyReader
        {
            public ProjectPropertyReader(Mono.Cecil.AssemblyDefinition assemblyDefinition)
            {
                this.AssemblyDefinition = assemblyDefinition;
            }

            private string GetAttributeValue(string key)
            {
                CustomAttribute attribute = (from x in this.AssemblyDefinition.CustomAttributes
                    where x.AttributeType.FullName.Equals(key)
                    select x).FirstOrDefault<CustomAttribute>();
                if ((attribute != null) && attribute.HasConstructorArguments)
                {
                    CustomAttributeArgument argument = attribute.ConstructorArguments.FirstOrDefault<CustomAttributeArgument>();
                    if (((argument.Value != null) && (argument.Type != null)) && (argument.Type.FullName == "System.String"))
                    {
                        return argument.Value.ToString();
                    }
                }
                return null;
            }

            public Dictionary<string, string> Read()
            {
                Dictionary<string, string> dictionary = new Dictionary<string, string>();
                if (this.AssemblyDefinition.HasCustomAttributes)
                {
                    string[] textArray1 = new string[] { "System.Reflection.AssemblyCompanyAttribute", "System.Runtime.InteropServices.GuidAttribute", "System.Reflection.AssemblyTrademarkAttribute", "System.Reflection.AssemblyProductAttribute", "System.Reflection.AssemblyTitleAttribute", "System.Reflection.AssemblyCopyrightAttribute" };
                    foreach (string str in textArray1)
                    {
                        string attributeValue = this.GetAttributeValue(str);
                        if (attributeValue != null)
                        {
                            dictionary.Add(this.Trim(str), attributeValue);
                        }
                    }
                    dictionary.Add("AssemblyName", this.AssemblyDefinition.Name.Name);
                }
                return dictionary;
            }

            private string Trim(string s)
            {
                char[] separator = new char[] { '.' };
                return s.Split(separator, StringSplitOptions.RemoveEmptyEntries).LastOrDefault<string>()?.Replace("Attribute", "");
            }

            public Mono.Cecil.AssemblyDefinition AssemblyDefinition { get; private set; }
        }
    }
}


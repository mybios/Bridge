namespace Bridge.Aspect.Plugin
{
    using Bridge.Contract;
    using ICSharpCode.NRefactory.CSharp;
    using ICSharpCode.NRefactory.TypeSystem;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Runtime.CompilerServices;
    using System.Runtime.InteropServices;
    using System.Text;

    public abstract class ConstructorAspectBlock : AbstractAspectBlock
    {
        public ConstructorAspectBlock(IConstructorBlock constructorBlock, AspectPlugin plugin) : base(constructorBlock.Emitter)
        {
            this.ConstructorBlock = constructorBlock;
            this.Plugin = plugin;
        }

        protected virtual bool Exclude(AspectInfo aspect, List<string> excludeTypes)
        {
            if (aspect.Exclude)
            {
                excludeTypes.Add(aspect.AspectType);
                return true;
            }
            bool replace = aspect.Replace;
            if (!aspect.Multiple | replace)
            {
                excludeTypes.Add(aspect.AspectType);
            }
            return false;
        }

        protected abstract string FormatAspect(AspectInfo aspect, EntityDeclaration entity, string argList, string propList);
        protected virtual string GetArgList(AspectInfo aspect)
        {
            string str = "";
            if (aspect.ConstructorArguments.Count <= 0)
            {
                return str;
            }
            StringBuilder builder = new StringBuilder();
            bool flag = false;
            foreach (object obj2 in aspect.ConstructorArguments)
            {
                if (flag)
                {
                    builder.Append(", ");
                }
                builder.Append(base.Emitter.ToJavaScript(obj2));
                flag = true;
            }
            return builder.ToString();
        }

        protected virtual string GetAspectCode(AspectInfo aspect, EntityDeclaration entity, List<string> excludeTypes, bool? isSetter = new bool?())
        {
            if (excludeTypes.Contains(aspect.AspectType))
            {
                return null;
            }
            if (!this.Match(aspect, entity, isSetter))
            {
                return null;
            }
            if (this.Exclude(aspect, excludeTypes))
            {
                return null;
            }
            string aspectCode = this.FormatAspect(aspect, entity, this.GetArgList(aspect), this.GetPropList(aspect));
            return this.OnApply(aspect, entity, aspectCode);
        }

        protected virtual string GetPropList(AspectInfo aspect)
        {
            string str = "";
            if (aspect.CustomProperties.Count <= 0)
            {
                return str;
            }
            IEnumerable<IField> fields = aspect.Type.GetFields(null, GetMemberOptions.None);
            StringBuilder builder = new StringBuilder();
            bool flag = false;
            using (Dictionary<string, object>.Enumerator enumerator = aspect.CustomProperties.GetEnumerator())
            {
                while (enumerator.MoveNext())
                {
                    KeyValuePair<string, object> arg = enumerator.Current;
                    if (flag)
                    {
                        builder.Append(", ");
                    }
                    string str2 = fields.Any<IField>(f => (f.Name == arg.Key)) ? (!base.Emitter.AssemblyInfo.PreserveMemberCase ? (arg.Key[0].ToString().ToLowerInvariant() + arg.Key.Substring(1)) : arg.Key) : ("set" + arg.Key);
                    builder.AppendFormat("{0}:{1}", str2, base.Emitter.ToJavaScript(arg.Value));
                    flag = true;
                }
            }
            return builder.ToString();
        }

        protected virtual bool Match(AspectInfo aspect, EntityDeclaration entity, bool? isSetter)
        {
            string targetMembers = aspect.TargetMembers;
            TranslatorMulticastAttributes targetTypesAttributes = aspect.TargetTypesAttributes;
            string targetTypes = aspect.TargetTypes;
            string fullName = base.Emitter.TypeInfo.Type.FullName;
            string name = entity.Name;
            if (isSetter.HasValue)
            {
                if (entity is PropertyDeclaration)
                {
                    name = Helpers.GetPropertyRef((PropertyDeclaration) entity, base.Emitter, isSetter.Value, false, false, false);
                }
                else if (entity is IndexerDeclaration)
                {
                    name = Helpers.GetPropertyRef((IndexerDeclaration) entity, base.Emitter, isSetter.Value, false, false);
                }
            }
            return (((AspectHelpers.MatchTargetAttributes(aspect.TargetMembersAttributes, entity, base.Emitter, isSetter) && AspectHelpers.MatchTargetAttributes(targetTypesAttributes, base.Emitter.TypeInfo.TypeDeclaration, base.Emitter, isSetter)) && AspectHelpers.MatchTarget(targetMembers, name)) && AspectHelpers.MatchTarget(targetTypes, fullName));
        }

        protected virtual string OnApply(AspectInfo aspect, EntityDeclaration entity, string aspectCode)
        {
            if (!this.Plugin.License.Licenses.Aspect.Demand(1))
            {
                return $"/*{aspect.AspectType}: you reached demo version limitation*/";
            }
            return aspectCode;
        }

        public IConstructorBlock ConstructorBlock { get; set; }

        public AspectPlugin Plugin { get; set; }
    }
}


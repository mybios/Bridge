namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Bridge.Aspect.FieldAspectAttribute"), AttributeUsage(AttributeTargets.Field | AttributeTargets.Class | AttributeTargets.Assembly, AllowMultiple=true)]
    public abstract class FieldAspectAttribute : MulticastAspectAttribute
    {
        public readonly string FieldName;
        public object FieldValue;
        public const string Format = "new {0}({3}).init('{1}', {2});";
        public const string MergeFormat = "Bridge.merge(new {0}({3}), {{{4}}}).init('{1}', {2});";
        public readonly object Scope;

        protected FieldAspectAttribute()
        {
        }

        public virtual void OnGetValue(FieldAspectEventArgs eventArgs)
        {
        }

        public virtual void OnSetValue(FieldAspectEventArgs eventArgs)
        {
        }

        public void Remove()
        {
        }

        protected virtual bool RunTimeValidate(string fieldName, object scope) => 
            true;
    }
}


namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Bridge.Aspect.PropertyAspectAttribute"), AttributeUsage(AttributeTargets.Property | AttributeTargets.Class | AttributeTargets.Assembly, AllowMultiple=true)]
    public abstract class PropertyAspectAttribute : MulticastAspectAttribute
    {
        public const string Format = "new {0}({3}).init('{1}', {2}{4});";
        public const string MergeFormat = "Bridge.merge(new {0}({3}), {{{4}}}).init('{1}', {2}{5});";
        public readonly string PropertyName;
        public readonly object Scope;

        protected PropertyAspectAttribute()
        {
        }

        protected virtual Type[] GetExceptionTypes(string propertyName, object scope) => 
            null;

        [Template("{this}.getter.call({this}.scope)")]
        public T Getter<T>() => 
            default(T);

        public virtual void OnException(PropertyAspectEventArgs eventArgs)
        {
        }

        public virtual void OnGetValue(PropertyAspectEventArgs eventArgs)
        {
        }

        public virtual void OnSetValue(PropertyAspectEventArgs eventArgs)
        {
        }

        public virtual void OnSuccess(PropertyAspectEventArgs eventArgs)
        {
        }

        public void Remove()
        {
        }

        protected virtual bool RunTimeValidate(string propertyName, object scope) => 
            true;

        [Template("{this}.setter.call({this}.scope, {value})")]
        public void Setter(object value)
        {
        }
    }
}


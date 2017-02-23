namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Bridge.Aspect.TypeAspectAttribute"), AttributeUsage(AttributeTargets.Class | AttributeTargets.Assembly, AllowMultiple=true)]
    public abstract class TypeAspectAttribute : MulticastAspectAttribute
    {
        public const string Format = "$ctorWrapper:new {0}({3}).init({2}, arguments, {{body}});";
        public readonly object Instance;
        public const string MergeFormat = "$ctorWrapper:Bridge.merge(new {0}({3}), {{{4}}}).init({2}, arguments, {{body}});";
        public readonly string TypeName;

        protected TypeAspectAttribute()
        {
        }

        protected virtual Type[] GetExceptionTypes(object instance, string typeName) => 
            null;

        public virtual void OnAfterInstance(TypeAspectEventArgs eventArgs)
        {
        }

        public virtual void OnBeforeInstance(TypeAspectEventArgs eventArgs)
        {
        }

        public virtual void OnException(TypeAspectEventArgs eventArgs)
        {
        }

        protected virtual bool RunTimeValidate(object instance) => 
            true;
    }
}


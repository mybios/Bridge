namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Bridge.Aspect.AbstractMethodAspectAttribute"), AttributeUsage(AttributeTargets.Method | AttributeTargets.Constructor | AttributeTargets.Class | AttributeTargets.Assembly, AllowMultiple=true)]
    public abstract class AbstractMethodAspectAttribute : MulticastAspectAttribute
    {
        public const string Format = "new {0}({3}).init('{1}', {2});";
        public const string MergeFormat = "Bridge.merge(new {0}({3}), {{{4}}}).init('{1}', {2});";
        public readonly string MethodName;
        public readonly object Scope;
        public readonly Delegate TargetMethod;

        protected AbstractMethodAspectAttribute()
        {
        }

        public void Init(string methodName, object scope)
        {
        }

        public void Proceed(object[] args)
        {

        }
        [IgnoreGeneric]
        public T Proceed<T>(object[] args)
        {
            return default(T);
        }
        public void Remove()
        {

        }

        protected virtual bool RunTimeValidate(string methodName, object scope) => 
            true;
    }
}


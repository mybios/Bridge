namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Bridge.Aspect.ParametertAspectAttribute"), AttributeUsage(AttributeTargets.Parameter | AttributeTargets.Property | AttributeTargets.Method | AttributeTargets.Class | AttributeTargets.Assembly, AllowMultiple=true)]
    public abstract class ParameterAspectAttribute : MulticastAspectAttribute
    {
        public const string Format = "new {0}({3}).init('{4}', {5}, {6}, '{1}', {2});";
        public const string MergeFormat = "Bridge.merge(new {0}({3}), {{{4}}}).init('{5}', {6}, {7},'{1}', {2});";
        public readonly string MethodName;
        public readonly int ParameterIndex;
        public readonly string ParameterName;
        public readonly Type ParameterType;
        public readonly object Scope;
        public readonly Delegate TargetMethod;

        protected ParameterAspectAttribute()
        {
        }

        public virtual void ParameterValidate(ParameterAspectEventArgs eventArgs)
        {
        }

        public void Remove()
        {
        }

        protected virtual bool RunTimeValidate(string parameterName, int parameterIndex, Type parameterType, string methodName, object scope) => 
            true;
    }
}


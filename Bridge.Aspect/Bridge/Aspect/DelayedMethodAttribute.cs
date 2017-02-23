namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Bridge.Aspect.DelayedMethodAttribute"), AttributeUsage(AttributeTargets.Method, AllowMultiple=false)]
    public class DelayedMethodAttribute : AbstractMethodAspectAttribute
    {
        public DelayedMethodAttribute(int delay)
        {
        }
    }
}


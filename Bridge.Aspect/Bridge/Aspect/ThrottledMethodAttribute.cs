namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Bridge.Aspect.ThrottledMethodAttribute"), AttributeUsage(AttributeTargets.Method, AllowMultiple=false)]
    public class ThrottledMethodAttribute : AbstractMethodAspectAttribute
    {
        public ThrottledMethodAttribute(int interval)
        {
        }
    }
}


namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Bridge.Aspect.BarrierMethodAttribute"), AttributeUsage(AttributeTargets.Method, AllowMultiple=false)]
    public class BarrierMethodAttribute : AbstractMethodAspectAttribute
    {
        public BarrierMethodAttribute(int count)
        {
        }
    }
}


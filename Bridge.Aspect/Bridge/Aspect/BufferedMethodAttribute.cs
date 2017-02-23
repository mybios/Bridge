namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Bridge.Aspect.BufferedMethodAttribute"), AttributeUsage(AttributeTargets.Method, AllowMultiple=false)]
    public class BufferedMethodAttribute : AbstractMethodAspectAttribute
    {
        public BufferedMethodAttribute(int buffer)
        {
        }
    }
}


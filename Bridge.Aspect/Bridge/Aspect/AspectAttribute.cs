namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Bridge.Aspect.AspectAttribute")]
    public abstract class AspectAttribute : Attribute
    {
        protected AspectAttribute()
        {
        }
    }
}


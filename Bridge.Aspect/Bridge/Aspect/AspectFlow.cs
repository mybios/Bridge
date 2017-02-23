namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Enum(Emit.Value)]
    public enum AspectFlow
    {
        Default,
        Continue,
        RethrowException,
        Return
    }
}


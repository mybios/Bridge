namespace Bridge.Aspect.Plugin
{
    using System;

    [Flags]
    public enum TranslatorMulticastAttributes
    {
        Accessor = 0x800,
        Async = 0x20000,
        CompilerGenerated = 0x8000,
        Default = 0,
        Instance = 0x40,
        Internal = 8,
        NonAccessor = 0x1000,
        NonAsync = 0x40000,
        NonCompilerGenerated = 0x10000,
        NonOperator = 0x4000,
        NonVirtual = 0x100,
        Operator = 0x2000,
        OutParameter = 0x200,
        Private = 2,
        Protected = 4,
        Public = 0x10,
        RefParameter = 0x400,
        Static = 0x20,
        Virtual = 0x80
    }
}


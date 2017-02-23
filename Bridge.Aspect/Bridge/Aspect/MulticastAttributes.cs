namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External]
    public class MulticastAttributes
    {
        public const int Accessor = 0x800;
        public const int Async = 0x20000;
        public const int CompilerGenerated = 0x8000;
        public const int Default = 0;
        public const int Instance = 0x40;
        public const int Internal = 8;
        public const int NonAccessor = 0x1000;
        public const int NonAsync = 0x40000;
        public const int NonCompilerGenerated = 0x10000;
        public const int NonOperator = 0x4000;
        public const int NonVirtual = 0x100;
        public const int Operator = 0x2000;
        public const int OutParameter = 0x200;
        public const int Private = 2;
        public const int Protected = 4;
        public const int Public = 0x10;
        public const int RefParameter = 0x400;
        public const int Static = 0x20;
        public const int Virtual = 0x80;
    }
}


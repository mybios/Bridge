namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Object")]
    public class TypeAspectEventArgs
    {
        public readonly object[] Arguments;
        public readonly System.Exception Exception;
        public readonly object Instance;
        public object Tag;
        public readonly string TypeName;
    }
}


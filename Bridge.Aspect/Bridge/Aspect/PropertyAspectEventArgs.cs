namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Object")]
    public class PropertyAspectEventArgs
    {
        public readonly System.Exception Exception;
        public AspectFlow Flow;
        public readonly bool IsGetter;
        public readonly string PropertyName;
        public readonly object Scope;
        public object Value;
    }
}


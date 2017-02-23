namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Object")]
    public class FieldAspectEventArgs
    {
        public readonly string FieldName;
        public readonly bool IsGetter;
        public object OldValue;
        public readonly object Scope;
        public bool? Update;
        public object Value;
    }
}


namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Object")]
    public class NotifyPropertyChangedAspectEventArgs
    {
        public AspectFlow Flow;
        public readonly bool Force;
        public readonly object LastValue;
        public readonly string PropertyName;
        public readonly object Scope;
        public readonly object Value;
    }
}


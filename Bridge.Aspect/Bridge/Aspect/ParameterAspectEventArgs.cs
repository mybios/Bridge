namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Object")]
    public class ParameterAspectEventArgs
    {
        public readonly string MethodName;
        public readonly object Parameter;
        public readonly int ParameterIndex;
        public readonly string ParameterName;
        public readonly Type ParameterType;
        public readonly object Scope;
    }
}


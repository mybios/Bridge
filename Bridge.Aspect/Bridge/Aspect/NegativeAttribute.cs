namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Bridge.Aspect.NegativeAttribute")]
    public class NegativeAttribute : ParameterContractAspectAttribute
    {
        public sealed override bool Validate(ParameterAspectEventArgs eventArgs) => 
            false;
    }
}


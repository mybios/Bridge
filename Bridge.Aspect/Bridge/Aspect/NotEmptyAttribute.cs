namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Bridge.Aspect.NotEmptyAttribute")]
    public class NotEmptyAttribute : ParameterContractAspectAttribute
    {
        public sealed override bool Validate(ParameterAspectEventArgs eventArgs) => 
            false;
    }
}


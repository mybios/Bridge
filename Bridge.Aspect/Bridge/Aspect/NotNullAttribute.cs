namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Bridge.Aspect.NotNullAttribute")]
    public class NotNullAttribute : ParameterContractAspectAttribute
    {
        public sealed override bool Validate(ParameterAspectEventArgs eventArgs) => 
            false;
    }
}


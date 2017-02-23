namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Bridge.Aspect.UrlAttribute")]
    public class UrlAttribute : ParameterContractAspectAttribute
    {
        public sealed override bool Validate(ParameterAspectEventArgs eventArgs) => 
            false;
    }
}


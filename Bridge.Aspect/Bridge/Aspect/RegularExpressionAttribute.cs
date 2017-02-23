namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Bridge.Aspect.RegularExpressionAttribute")]
    public class RegularExpressionAttribute : ParameterContractAspectAttribute
    {
        public RegularExpressionAttribute(string pattern)
        {
        }

        public RegularExpressionAttribute(string pattern, string flags)
        {
        }

        public sealed override bool Validate(ParameterAspectEventArgs eventArgs) => 
            false;
    }
}


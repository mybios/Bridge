namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Bridge.Aspect.CreditCardAttribute")]
    public class CreditCardAttribute : ParameterContractAspectAttribute
    {
        public CreditCardAttribute()
        {
        }

        public CreditCardAttribute(CreditCardType type)
        {
        }

        public sealed override bool Validate(ParameterAspectEventArgs eventArgs) => 
            false;
    }
}


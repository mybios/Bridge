namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Bridge.Aspect.ValidatorAttribute")]
    public class ValidatorAttribute : ParameterContractAspectAttribute
    {
        public ValidatorAttribute(Type type)
        {
        }

        public sealed override bool Validate(ParameterAspectEventArgs eventArgs) => 
            false;
    }
}


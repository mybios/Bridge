namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Bridge.Aspect.LengthAttribute")]
    public class LengthAttribute : ParameterContractAspectAttribute
    {
        public LengthAttribute(int max)
        {
        }

        public LengthAttribute(int max, int min)
        {
        }

        public sealed override bool Validate(ParameterAspectEventArgs eventArgs) => 
            false;
    }
}


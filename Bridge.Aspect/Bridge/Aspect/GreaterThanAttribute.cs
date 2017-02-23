namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Bridge.Aspect.GreaterThanAttribute")]
    public class GreaterThanAttribute : ParameterContractAspectAttribute
    {
        public GreaterThanAttribute(decimal min)
        {
        }

        public GreaterThanAttribute(double min)
        {
        }

        public GreaterThanAttribute(int min)
        {
        }

        public GreaterThanAttribute(long min)
        {
        }

        public GreaterThanAttribute(uint min)
        {
        }

        public GreaterThanAttribute(ulong min)
        {
        }

        public GreaterThanAttribute(decimal min, bool strict)
        {
        }

        public GreaterThanAttribute(double min, bool strict)
        {
        }

        public GreaterThanAttribute(int min, bool strict)
        {
        }

        public GreaterThanAttribute(long min, bool strict)
        {
        }

        public GreaterThanAttribute(uint min, bool strict)
        {
        }

        public GreaterThanAttribute(ulong min, bool strict)
        {
        }

        public sealed override bool Validate(ParameterAspectEventArgs eventArgs) => 
            false;
    }
}


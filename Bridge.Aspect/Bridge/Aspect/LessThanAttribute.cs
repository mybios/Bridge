namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Bridge.Aspect.LessThanAttribute")]
    public class LessThanAttribute : ParameterContractAspectAttribute
    {
        public LessThanAttribute(decimal max)
        {
        }

        public LessThanAttribute(double max)
        {
        }

        public LessThanAttribute(int max)
        {
        }

        public LessThanAttribute(long max)
        {
        }

        public LessThanAttribute(uint max)
        {
        }

        public LessThanAttribute(ulong max)
        {
        }

        public LessThanAttribute(decimal max, bool strict)
        {
        }

        public LessThanAttribute(double max, bool strict)
        {
        }

        public LessThanAttribute(int max, bool strict)
        {
        }

        public LessThanAttribute(long max, bool strict)
        {
        }

        public LessThanAttribute(uint max, bool strict)
        {
        }

        public LessThanAttribute(ulong max, bool strict)
        {
        }

        public sealed override bool Validate(ParameterAspectEventArgs eventArgs) => 
            false;
    }
}


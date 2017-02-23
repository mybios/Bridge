namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Bridge.Aspect.RangeAttribute")]
    public class RangeAttribute : ParameterContractAspectAttribute
    {
        public RangeAttribute(decimal min, decimal max)
        {
        }

        public RangeAttribute(double min, double max)
        {
        }

        public RangeAttribute(int min, int max)
        {
        }

        public RangeAttribute(long min, long max)
        {
        }

        public RangeAttribute(uint min, uint max)
        {
        }

        public RangeAttribute(ulong min, ulong max)
        {
        }

        public RangeAttribute(decimal min, decimal max, bool strict)
        {
        }

        public RangeAttribute(double min, double max, bool strict)
        {
        }

        public RangeAttribute(int min, int max, bool strict)
        {
        }

        public RangeAttribute(long min, long max, bool strict)
        {
        }

        public RangeAttribute(uint min, uint max, bool strict)
        {
        }

        public RangeAttribute(ulong min, ulong max, bool strict)
        {
        }

        public sealed override bool Validate(ParameterAspectEventArgs eventArgs) => 
            false;
    }
}


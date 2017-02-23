namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Bridge.Aspect.ParameterContractAspectAttribute")]
    public abstract class ParameterContractAspectAttribute : ParameterAspectAttribute
    {
        public string Message;

        protected ParameterContractAspectAttribute()
        {
        }

        public virtual Exception CreateException(ParameterAspectEventArgs eventArgs) => 
            null;

        public sealed override void ParameterValidate(ParameterAspectEventArgs eventArgs)
        {
        }

        public abstract bool Validate(ParameterAspectEventArgs eventArgs);
    }
}


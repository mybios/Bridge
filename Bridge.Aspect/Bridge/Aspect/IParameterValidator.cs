namespace Bridge.Aspect
{
    using System;

    public interface IParameterValidator
    {
        bool Validate(ParameterAspectEventArgs eventArgs);
    }
}


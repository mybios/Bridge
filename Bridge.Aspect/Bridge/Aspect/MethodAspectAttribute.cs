namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Bridge.Aspect.MethodAspectAttribute")]
    public abstract class MethodAspectAttribute : AbstractMethodAspectAttribute
    {
        protected MethodAspectAttribute()
        {
        }

        protected virtual Type[] GetExceptionTypes(string methodName, object scope) => 
            null;

        public virtual void OnEntry(MethodAspectEventArgs eventArgs)
        {
        }

        public virtual void OnException(MethodAspectEventArgs eventArgs)
        {
        }

        public virtual void OnExit(MethodAspectEventArgs eventArgs)
        {
        }

        public virtual void OnSuccess(MethodAspectEventArgs eventArgs)
        {
        }
    }
}


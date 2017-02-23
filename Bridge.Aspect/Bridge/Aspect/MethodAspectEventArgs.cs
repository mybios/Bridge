namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Object")]
    public class MethodAspectEventArgs
    {
        public readonly object[] Arguments;
        public readonly System.Exception Exception;
        public AspectFlow Flow;
        public readonly string MethodName;
        public object ReturnValue;
        public readonly object Scope;
        public object Tag;

        public void Invoke()
        {

        }
        [IgnoreGeneric]
        public T Invoke<T>()
        {
            return default(T);
        }
        public void Proceed()
        {

        }
        [IgnoreGeneric]
        public T Proceed<T>()
        {
            return default(T);
        }
    }
}


namespace Bridge.Aspect
{
    using Bridge;
    using System;
    using System.ComponentModel;

    [External, Name("Bridge.Aspect.NotifyPropertyChangedAttribute"), AttributeUsage(AttributeTargets.Class | AttributeTargets.Assembly, AllowMultiple=false)]
    public class NotifyPropertyChangedAttribute : MulticastAspectAttribute
    {
        public const string Format = "new {0}({3}).init('{1}', {2}{4});";
        public const string MergeFormat = "Bridge.merge(new {0}({3}), {{{4}}}).init('{1}', {2}{5});";
        public readonly string PropertyName;
        public bool RaiseOnChange = true;
        public readonly object Scope;

        protected virtual void BeforeEvent(NotifyPropertyChangedAspectEventArgs eventArgs)
        {
        }

        public T Getter<T>() => 
            default(T);

        public void RaiseEvent()
        {
        }

        public static void RaiseEvents(INotifyPropertyChanged instance)
        {
        }

        public static void ResumeEvents()
        {
        }

        public static void ResumeEvents(INotifyPropertyChanged instance)
        {
        }

        protected virtual bool RunTimeValidate(string propertyName, object scope) => 
            true;

        public void Setter(object value)
        {
        }

        public static void SuspendEvents()
        {
        }

        public static void SuspendEvents(INotifyPropertyChanged instance)
        {
        }
    }
}


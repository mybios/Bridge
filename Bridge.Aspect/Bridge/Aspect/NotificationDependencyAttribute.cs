namespace Bridge.Aspect
{
    using System;

    [AttributeUsage(AttributeTargets.Property, AllowMultiple=true)]
    public class NotificationDependencyAttribute : Attribute
    {
        public NotificationDependencyAttribute(string name)
        {
        }
    }
}


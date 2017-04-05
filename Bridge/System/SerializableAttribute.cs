using System;
using System.Reflection;
using Bridge;

namespace System
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Struct, Inherited = false)]
    public sealed class SerializableAttribute : Attribute
    {
    }
}

using Bridge;

namespace System.Reflection
{
    /// <summary>
    /// Specifies flags that control binding and the way in which the search for members and types is conducted by reflection.
    /// </summary>
    [External]
    [Flags]
    [Enum(Emit.Value)]
    public enum BindingFlags
    {
        Default = 0,
        DeclaredOnly = 2,
        Instance = 4,
        Static = 8,
        Public = 16,
        NonPublic = 32,
        FlattenHierarchy = 64,
    }
}
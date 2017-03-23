using Bridge;
using System.Collections;
using System.Collections.Generic;

namespace System.Linq
{
    [External]
    [IgnoreGeneric]
    public interface ILookup<TKey, TElement> : IEnumerable<Grouping<TKey, TElement>>
    {
        int Count
        {
            [Template("count()")]
            get;
        }

        [AccessorsIndexer]
        EnumerableInstance<TElement> this[TKey key]
        {
            [Template("get({0})")]
            get;
        }

        [Template("contains({key})")]
        bool Contains(TKey key);
    }

    [External]
    [IgnoreGeneric]
    public class Lookup<TKey, TElement> : ILookup<TKey, TElement>
    {
        internal extern Lookup();

        public extern int Count
        {
            [Template("count()")]
            get;
        }

        [AccessorsIndexer]
        public extern EnumerableInstance<TElement> this[TKey key]
        {
            [Template("get({0})")]
            get;
        }

        public extern bool Contains(TKey key);

        public extern IEnumerator<Grouping<TKey, TElement>> GetEnumerator();

        extern IEnumerator IEnumerable.GetEnumerator();
    }
}
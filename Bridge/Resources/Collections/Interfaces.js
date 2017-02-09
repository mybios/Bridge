    Bridge.define('System.Collections.IEnumerable', {
        $kind: "interface"
    });
    Bridge.define('System.Collections.IEnumerator', {
        $kind: "interface"
    });
    Bridge.define('System.Collections.IEqualityComparer', {
        $kind: "interface"
    });
    Bridge.define('System.Collections.ICollection', {
        inherits: [System.Collections.IEnumerable],
        $kind: "interface"
    });
    Bridge.define('System.Collections.IList', {
        inherits: [System.Collections.ICollection],
        $kind: "interface"
    });
    Bridge.define('System.Collections.IDictionary', {
        inherits: [System.Collections.ICollection],
        $kind: "interface"
    });

    Bridge.define('System.Collections.Generic.IEnumerator$1', (function(){var func = function (T) {
        return {
            inherits: [System.Collections.IEnumerator],
            $kind: "interface"
        };
    };func.$typeArguments = ["T"];return func;})());

    Bridge.define('System.Collections.Generic.IEnumerable$1', (function(){var func = function (T) {
        return {
            inherits: [System.Collections.IEnumerable],
            $kind: "interface"
        };
    };func.$typeArguments = ["T"];return func;})());

    Bridge.define('System.Collections.Generic.ICollection$1', (function(){var func = function (T) {
        return {
            inherits: [System.Collections.Generic.IEnumerable$1(T)],
            $kind: "interface"
        };
    };func.$typeArguments = ["T"];return func;})());

    Bridge.define('System.Collections.Generic.IEqualityComparer$1', (function(){var func = function (T) {
        return {
            $kind: "interface"
        };
    };func.$typeArguments = ["T"];return func;})());

    Bridge.define('System.Collections.Generic.IDictionary$2', (function(){var func = function (TKey, TValue) {
        return {
            inherits: [System.Collections.Generic.IEnumerable$1(System.Collections.Generic.KeyValuePair$2(TKey, TValue))],
            $kind: "interface"
        };
    };func.$typeArguments = ["TKey", "TValue"];return func;})());

    Bridge.define('System.Collections.Generic.IList$1', (function(){var func = function (T) {
        return {
            inherits: [System.Collections.Generic.ICollection$1(T)],
            $kind: "interface"
        };
    };func.$typeArguments = ["T"];return func;})());

    Bridge.define('System.Collections.Generic.IComparer$1', (function(){var func = function (T) {
        return {
            $kind: "interface"
        };
    };func.$typeArguments = ["T"];return func;})());

    Bridge.define('System.Collections.Generic.ISet$1', (function(){var func = function (T) {
        return {
            inherits: [System.Collections.Generic.ICollection$1(T)],
            $kind: "interface"
        };
    };func.$typeArguments = ["T"];return func;})());

    Bridge.define('System.Collections.Generic.IReadOnlyCollection$1', (function(){var func = function (T) {
        return {
            inherits: [System.Collections.Generic.IEnumerable$1(T)],
            $kind: "interface"
        };
    };func.$typeArguments = ["T"];return func;})());

    Bridge.define('System.Collections.Generic.IReadOnlyList$1', (function(){var func = function (T) {
        return {
            inherits: [System.Collections.Generic.IReadOnlyCollection$1(T)],
            $kind: "interface"
        };
    };func.$typeArguments = ["T"];return func;})());

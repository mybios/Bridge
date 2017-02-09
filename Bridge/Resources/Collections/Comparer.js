    Bridge.define('System.Collections.Generic.Comparer$1', (function(){var func = function (T) {
        return {
            inherits: [System.Collections.Generic.IComparer$1(T)],

            ctor: function (fn) {
                this.$initialize();
                this.fn = fn;
                this.compare = fn;
                this["System$Collections$Generic$IComparer$1$" + Bridge.getTypeAlias(T) + "$compare"] = fn;
            }
        }
    };func.$typeArguments = ["T"];return func;})());

    System.Collections.Generic.Comparer$1.$default = new (System.Collections.Generic.Comparer$1(Object))(function (x, y) {
        if (!Bridge.hasValue(x)) {
            return !Bridge.hasValue(y) ? 0 : -1;
        } else if (!Bridge.hasValue(y)) {
            return 1;
        }

        return Bridge.compare(x, y);
    });

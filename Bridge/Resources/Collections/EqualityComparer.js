    Bridge.define('System.Collections.Generic.EqualityComparer$1', (function(){var func = function (T) {
		if(T == Function)
		{
			return {
				inherits: [System.Collections.Generic.IEqualityComparer$1(T)],

				statics: {
					config: {
						init: function () {
							this.def = new (System.Collections.Generic.EqualityComparer$1(T))();
						}
					}
				},

				config: {
					alias: [
						"equals2", "System$Collections$Generic$IEqualityComparer$1$equals2",
						"getHashCode2", "System$Collections$Generic$IEqualityComparer$1$getHashCode2"
					]
				},

				equals2: function (x, y) {
					return x == y;
				},

				getHashCode2: function (obj) {
					return Bridge.isDefined(obj, true) ? Bridge.getHashCode(obj) : 0;
				}
			};
		}
		return {
            inherits: [System.Collections.Generic.IEqualityComparer$1(T)],

            statics: {
                config: {
                    init: function () {
                        this.def = new (System.Collections.Generic.EqualityComparer$1(T))();
                    }
                }
            },

            config: {
                alias: [
                    "equals2", "System$Collections$Generic$IEqualityComparer$1$equals2",
                    "getHashCode2", "System$Collections$Generic$IEqualityComparer$1$getHashCode2"
                ]
            },

            equals2: function (x, y) {
				if (T == Function)
				{
					return x == y;
				}
                if (!Bridge.isDefined(x, true)) {
                    return !Bridge.isDefined(y, true);
                } else if (Bridge.isDefined(y, true)) {
                    var isBridge = x && x.$$name;

                    if (!isBridge || x && x.$boxed || y && y.$boxed) {
                        return Bridge.equals(x, y);
                    }
                    else if (Bridge.isFunction(x.equalsT)) {
                        return Bridge.equalsT(x, y);
                    }
                    else if (Bridge.isFunction(x.equals)) {
                        return Bridge.equals(x, y);
                    }

                    return x === y;
                }

                return false;
            },

            getHashCode2: function (obj) {
                return Bridge.isDefined(obj, true) ? Bridge.getHashCode(obj) : 0;
            }
        };
    };func.$typeArguments = ["T"];return func;})());

    System.Collections.Generic.EqualityComparer$1.$default = new (System.Collections.Generic.EqualityComparer$1(System.Object))();

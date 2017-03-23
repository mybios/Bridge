/**
 * Bridge Test library - special tests with custom config options like useTypedArrays
 * @version 16.0.0
 * @author Object.NET, Inc.
 * @copyright Copyright 2008-2017 Object.NET, Inc.
 * @compiler Bridge.NET 16.0.0
 */
Bridge.assembly("Bridge.ClientTest.Batch2", function ($asm, globals) {
    "use strict";

    Bridge.define("Bridge.ClientTest.Batch2.BridgeIssues.Bridge1385", {
        statics: {
            testIsTypedArrayForByte: function () {
                var value = System.Array.init(new Uint8Array(3), System.Byte);
                Bridge.Test.NUnit.Assert.true(Bridge.is(value, System.Array.type(System.Byte)));
            }
        }
    });

    Bridge.define("Bridge.ClientTest.Batch2.BridgeIssues.Bridge1499", {
        testObjectStringCoalesceWorks: function () {
            var $t, $t1, $t2, $t3, $t4, $t5, $t6, $t7, $t8, $t9, $t10, $t11, $t12, $t13, $t14, $t15, $t16, $t17, $t18, $t19;
            var def = Bridge.box(1, System.Int32);
            var app = null;
            var o1 = "";
            var o2 = "test";
            var o3 = null;

            Bridge.Test.NUnit.Assert.areStrictEqual(1, Bridge.unbox(($t = app, $t !== null ? $t : def)));
            Bridge.Test.NUnit.Assert.areStrictEqual("", Bridge.unbox(($t1 = o1, $t1 !== null ? $t1 : o2)));
            Bridge.Test.NUnit.Assert.areStrictEqual("", Bridge.unbox(($t2 = o1, $t2 !== null ? $t2 : "test")));
            Bridge.Test.NUnit.Assert.areStrictEqual("test", Bridge.unbox(($t3 = o3, $t3 !== null ? $t3 : o2)));
            Bridge.Test.NUnit.Assert.areStrictEqual("test", Bridge.unbox(($t4 = o3, $t4 !== null ? $t4 : "test")));

            var s1 = "";
            var s2 = "test";
            var s3 = null;

            Bridge.Test.NUnit.Assert.areStrictEqual("", ($t5 = s1, $t5 !== null ? $t5 : s2));
            Bridge.Test.NUnit.Assert.areStrictEqual("", Bridge.unbox(($t6 = s1, $t6 !== null ? $t6 : o2)));
            Bridge.Test.NUnit.Assert.areStrictEqual("", ($t7 = s1, $t7 !== null ? $t7 : "test"));
            Bridge.Test.NUnit.Assert.areStrictEqual("", ($t8 = "", $t8 !== null ? $t8 : "test"));
            Bridge.Test.NUnit.Assert.areStrictEqual("test", ($t9 = s3, $t9 !== null ? $t9 : s2));
            Bridge.Test.NUnit.Assert.areStrictEqual("test", Bridge.unbox(($t10 = s3, $t10 !== null ? $t10 : o2)));
            Bridge.Test.NUnit.Assert.areStrictEqual("test", ($t11 = s3, $t11 !== null ? $t11 : "test"));
            Bridge.Test.NUnit.Assert.areStrictEqual("test", ($t12 = null, $t12 !== null ? $t12 : "test"));

            var i1 = 0;
            var i2 = 1;
            var i3 = null;

            Bridge.Test.NUnit.Assert.areStrictEqual(0, ($t13 = i1, $t13 !== null ? $t13 : i2));
            Bridge.Test.NUnit.Assert.areStrictEqual(0, Bridge.unbox(($t14 = i1, $t14 !== null ? Bridge.box($t14, System.Int32, $box_.System.Nullable$1.toString) : o2)));
            Bridge.Test.NUnit.Assert.areStrictEqual(0, ($t15 = i1, $t15 !== null ? $t15 : 1));
            Bridge.Test.NUnit.Assert.areStrictEqual(1, ($t16 = i3, $t16 !== null ? $t16 : i2));
            Bridge.Test.NUnit.Assert.areStrictEqual("test", Bridge.unbox(($t17 = i3, $t17 !== null ? Bridge.box($t17, System.Int32, $box_.System.Nullable$1.toString) : o2)));
            Bridge.Test.NUnit.Assert.areStrictEqual(1, ($t18 = i3, $t18 !== null ? $t18 : 1));
            Bridge.Test.NUnit.Assert.areStrictEqual(1, ($t19 = null, $t19 !== null ? $t19 : i2));
        }
    });

    Bridge.define("Bridge.ClientTest.Batch2.BridgeIssues.N1122", {
        statics: {
            testClippingInJavaScriptOverflowMode: function () {
                var x = System.Double.max;

                var y1 = Math.floor(x / 0.2);
                Bridge.Test.NUnit.Assert.areEqual$1(Number.POSITIVE_INFINITY, y1, "int");

                var y2 = Math.floor(x / 0.2);
                Bridge.Test.NUnit.Assert.areEqual$1(Number.POSITIVE_INFINITY, y2, "uint");

                var z1 = Math.floor(x / 0.2);
                Bridge.Test.NUnit.Assert.areEqual$1(Number.POSITIVE_INFINITY, z1, "long");

                var z2 = Math.floor(x / 0.2);
                Bridge.Test.NUnit.Assert.areEqual$1(Number.POSITIVE_INFINITY, z2, "ulong");
            },
            testIntegerDivisionInJavaScriptOverflowMode: function () {
                var x = 1.1;

                var y1 = 1 / x;
                Bridge.Test.NUnit.Assert.areEqual$1("0.9090909090909091", y1.toString(), "int");

                var y2 = 1 / x;
                Bridge.Test.NUnit.Assert.areEqual$1("0.9090909090909091", y2.toString(), "uint");

                var z1 = 1 / x;
                Bridge.Test.NUnit.Assert.areEqual$1("0.9090909090909091", z1.toString(), "long");

                var z2 = 1 / x;
                Bridge.Test.NUnit.Assert.areEqual$1("0.9090909090909091", z2.toString(), "ulong");
            }
        }
    });

    Bridge.define("Bridge.ClientTest.Batch2.BridgeIssues.N1204", {
        statics: {
            testStrictNullChecksOptionForNulls: function () {
                var temp = {  };
                var temp1 = temp;
                var temp2 = {  };
                var l = System.Int64(5);
                var ol = System.Int64(5);
                var oi = Bridge.box(5, System.Int32);
                var varNull = null;
                var varUndefined = temp[System.Array.index("this-prop-undefined", temp)];

                Bridge.Test.NUnit.Assert.false$1(varNull === varUndefined, "varNull == varUndefined");
                Bridge.Test.NUnit.Assert.true$1(varNull === null, "varNull == null");
                Bridge.Test.NUnit.Assert.false$1(varUndefined === null, "varUndefined == null");
                Bridge.Test.NUnit.Assert.true$1(undefined === varUndefined, "Script.Undefined == varUndefined");
                Bridge.Test.NUnit.Assert.true$1(temp === temp1, "temp == temp1");
                Bridge.Test.NUnit.Assert.false$1(temp === temp2, "temp == temp2");
                Bridge.Test.NUnit.Assert.true$1(l.equals(System.Int64(5)), "l == 5");
                Bridge.Test.NUnit.Assert.false$1(ol === oi, "ol == oi");

                Bridge.Test.NUnit.Assert.false$1(varUndefined === varNull, "varUndefined == varNull");
                Bridge.Test.NUnit.Assert.true$1(null === varNull, "null == varNull");
                Bridge.Test.NUnit.Assert.false$1(null === varUndefined, "null == varUndefined");
                Bridge.Test.NUnit.Assert.true$1(varUndefined === undefined, "varUndefined == Script.Undefined");
                Bridge.Test.NUnit.Assert.true$1(temp1 === temp, "temp1 == temp");
                Bridge.Test.NUnit.Assert.false$1(temp2 === temp, "temp2 == temp");
                Bridge.Test.NUnit.Assert.true$1(System.Int64(5).equals(l), "5 == l");
                Bridge.Test.NUnit.Assert.false$1(oi === ol, "oi == ol");
            }
        }
    });

    Bridge.define("Bridge.ClientTest.Batch2.BridgeIssues.N772", {
        statics: {
            testUseCase: function () {
                //These arrays depend on "useTypedArray" bridge.json option
                var byteArray = System.Array.init(new Uint8Array(1), System.Byte);
                var sbyteArray = System.Array.init(new Int8Array(2), System.SByte);
                var shortArray = System.Array.init(new Int16Array(3), System.Int16);
                var ushortArray = System.Array.init(new Uint16Array(4), System.UInt16);
                var intArray = System.Array.init(new Int32Array(5), System.Int32);
                var uintArray = System.Array.init(new Uint32Array(6), System.UInt32);
                var floatArray = System.Array.init(new Float32Array(7), System.Single);
                var doubleArray = System.Array.init(new Float64Array(8), System.Double);

                //These arrays do not depend on "useTypedArray" bridge.json option
                var stringArray = System.Array.init(9, null, System.String);
                var decimalArray = System.Array.init(10, System.Decimal(0.0), System.Decimal);

                byteArray[System.Array.index(0, byteArray)] = 1;
                sbyteArray[System.Array.index(0, sbyteArray)] = 2;
                shortArray[System.Array.index(0, shortArray)] = 3;
                ushortArray[System.Array.index(0, ushortArray)] = 4;
                intArray[System.Array.index(0, intArray)] = 5;
                uintArray[System.Array.index(0, uintArray)] = 6;
                floatArray[System.Array.index(0, floatArray)] = 7;
                doubleArray[System.Array.index(0, doubleArray)] = 8;

                stringArray[System.Array.index(0, stringArray)] = "9";
                decimalArray[System.Array.index(0, decimalArray)] = System.Decimal(10.0);

                Bridge.Test.NUnit.Assert.areEqual$1(1, byteArray[System.Array.index(0, byteArray)], "get byteArray[0]");
                Bridge.Test.NUnit.Assert.areEqual$1(2, sbyteArray[System.Array.index(0, sbyteArray)], "get sbyteArray[0]");
                Bridge.Test.NUnit.Assert.areEqual$1(3, shortArray[System.Array.index(0, shortArray)], "get shortArray[0]");
                Bridge.Test.NUnit.Assert.areEqual$1(4, ushortArray[System.Array.index(0, ushortArray)], "get ushortArray[0]");
                Bridge.Test.NUnit.Assert.areEqual$1(5, intArray[System.Array.index(0, intArray)], "get intArray[0]");
                Bridge.Test.NUnit.Assert.areEqual$1(6, uintArray[System.Array.index(0, uintArray)], "get uintArray[0]");
                Bridge.Test.NUnit.Assert.areEqual$1(7, floatArray[System.Array.index(0, floatArray)], "get floatArray[0]");
                Bridge.Test.NUnit.Assert.areEqual$1(8, doubleArray[System.Array.index(0, doubleArray)], "get doubleArray[0]");

                Bridge.Test.NUnit.Assert.areEqual$1("9", stringArray[System.Array.index(0, stringArray)], "get stringArray[0]");
                Bridge.Test.NUnit.Assert.areEqual$1(System.Decimal(10.0), decimalArray[System.Array.index(0, decimalArray)], "get decimalArray[0]");
            }
        },
        typePropertiesAreCorrect: function () {
            var arr = System.Array.init([1, 2, 3], System.Int32);
            Bridge.Test.NUnit.Assert.true$1(Bridge.is(arr, Array), "is Array should be true");
            Bridge.Test.NUnit.Assert.true$1(Bridge.is(arr, System.Array.type(System.Int32)), "is int[] should be true");
            Bridge.Test.NUnit.Assert.true$1(Bridge.is(arr, System.Collections.ICollection), "is ICollection should be true");
            Bridge.Test.NUnit.Assert.true$1(Bridge.is(arr, System.Collections.IEnumerable), "is IEnumerable should be true");
            Bridge.Test.NUnit.Assert.true$1(Bridge.is(arr, System.ICloneable), "is ICloneable should be true");
            Bridge.Test.NUnit.Assert.true$1(Bridge.is(arr, System.Collections.Generic.ICollection$1(System.Int32)), "is ICollection<int> should be true");
            Bridge.Test.NUnit.Assert.true$1(Bridge.is(arr, System.Collections.Generic.IEnumerable$1(System.Int32)), "is IEnumerable<int> should be true");
            Bridge.Test.NUnit.Assert.true$1(Bridge.is(arr, System.Collections.Generic.IList$1(System.Int32)), "is IList<int> should be true");
        },
        lengthWorks: function () {
            Bridge.Test.NUnit.Assert.areEqual(0, System.Array.init(new Int32Array(0), System.Int32).length);
            Bridge.Test.NUnit.Assert.areEqual(1, System.Array.init(["x"], System.String).length);
            Bridge.Test.NUnit.Assert.areEqual(2, System.Array.init(["x", "y"], System.String).length);
        },
        rankIsOne: function () {
            Bridge.Test.NUnit.Assert.areEqual(1, System.Array.getRank(System.Array.init(new Int32Array(0), System.Int32)));
        },
        getLengthWorks: function () {
            Bridge.Test.NUnit.Assert.areEqual(0, System.Array.getLength(System.Array.init(new Int32Array(0), System.Int32), 0));
            Bridge.Test.NUnit.Assert.areEqual(1, System.Array.getLength(System.Array.init(["x"], System.String), 0));
            Bridge.Test.NUnit.Assert.areEqual(2, System.Array.getLength(System.Array.init(["x", "y"], System.String), 0));
        },
        getLowerBound: function () {
            Bridge.Test.NUnit.Assert.areEqual(0, System.Array.getLower(System.Array.init(new Int32Array(0), System.Int32), 0));
            Bridge.Test.NUnit.Assert.areEqual(0, System.Array.getLower(System.Array.init(["x"], System.String), 0));
            Bridge.Test.NUnit.Assert.areEqual(0, System.Array.getLower(System.Array.init(["x", "y"], System.String), 0));
        },
        getUpperBoundWorks: function () {
            Bridge.Test.NUnit.Assert.areEqual(-1, (System.Array.getLength(System.Array.init(new Int32Array(0), System.Int32), 0) - 1));
            Bridge.Test.NUnit.Assert.areEqual(0, (System.Array.getLength(System.Array.init(["x"], System.String), 0) - 1));
            Bridge.Test.NUnit.Assert.areEqual(1, (System.Array.getLength(System.Array.init(["x", "y"], System.String), 0) - 1));
        },
        gettingValueByIndexWorks: function () {
            var $t, $t1;
            Bridge.Test.NUnit.Assert.areEqual("x", ($t = System.Array.init(["x", "y"], System.String))[System.Array.index(0, $t)]);
            Bridge.Test.NUnit.Assert.areEqual("y", ($t1 = System.Array.init(["x", "y"], System.String))[System.Array.index(1, $t1)]);
        },
        getValueWorks: function () {
            Bridge.Test.NUnit.Assert.areEqual("x", Bridge.unbox(System.Array.get(System.Array.init(["x", "y"], System.String), 0)));
            Bridge.Test.NUnit.Assert.areEqual("y", Bridge.unbox(System.Array.get(System.Array.init(["x", "y"], System.String), 1)));
        },
        settingValueByIndexWorks: function () {
            var arr = System.Array.init(2, null, System.String);
            arr[System.Array.index(0, arr)] = "x";
            arr[System.Array.index(1, arr)] = "y";
            Bridge.Test.NUnit.Assert.areEqual("x", arr[System.Array.index(0, arr)]);
            Bridge.Test.NUnit.Assert.areEqual("y", arr[System.Array.index(1, arr)]);
        },
        setValueWorks: function () {
            var arr = System.Array.init(2, null, System.String);
            System.Array.set(arr, "x", 0);
            System.Array.set(arr, "y", 1);
            Bridge.Test.NUnit.Assert.areEqual("x", arr[System.Array.index(0, arr)]);
            Bridge.Test.NUnit.Assert.areEqual("y", arr[System.Array.index(1, arr)]);
        },
        foreachWorks: function () {
            var $t;
            var result = "";
            $t = Bridge.getEnumerator(System.Array.init(["x", "y"], System.String));
            try {
                while ($t.moveNext()) {
                    var s = $t.Current;
                    result = System.String.concat(result, s);
                }
            }finally {
                if (Bridge.is($t, System.IDisposable)) {
                    $t.System$IDisposable$dispose();
                }
            }Bridge.Test.NUnit.Assert.areEqual("xy", result);
        },
        cloneWorks: function () {
            var arr = System.Array.init(["x", "y"], System.String);
            var arr2 = System.Array.clone(arr);
            Bridge.Test.NUnit.Assert.false(arr === arr2);
            Bridge.Test.NUnit.Assert.areEqual(Bridge.unbox(arr2), arr);
        },
        concatWorks: function () {
            var arr = System.Array.init(["a", "b"], System.String);
            Bridge.Test.NUnit.Assert.areDeepEqual(System.Array.init(["a", "b", "c"], System.String), arr.concat("c"));
            Bridge.Test.NUnit.Assert.areDeepEqual(System.Array.init(["a", "b", "c", "d"], System.String), arr.concat("c", "d"));
            Bridge.Test.NUnit.Assert.areDeepEqual(System.Array.init(["a", "b"], System.String), arr);
        },
        containsWorks: function () {
            var arr = System.Array.init(["x", "y"], System.String);
            Bridge.Test.NUnit.Assert.true(System.Array.contains(arr, "x", System.String));
            Bridge.Test.NUnit.Assert.false(System.Array.contains(arr, "z", System.String));
        },
        containsUsesEqualsMethod: function () {
            var arr = System.Array.init([new Bridge.ClientTest.Batch2.BridgeIssues.N772.C(1), new Bridge.ClientTest.Batch2.BridgeIssues.N772.C(2), new Bridge.ClientTest.Batch2.BridgeIssues.N772.C(3)], Bridge.ClientTest.Batch2.BridgeIssues.N772.C);
            Bridge.Test.NUnit.Assert.true(System.Array.contains(arr, new Bridge.ClientTest.Batch2.BridgeIssues.N772.C(2), Bridge.ClientTest.Batch2.BridgeIssues.N772.C));
            Bridge.Test.NUnit.Assert.false(System.Array.contains(arr, new Bridge.ClientTest.Batch2.BridgeIssues.N772.C(4), Bridge.ClientTest.Batch2.BridgeIssues.N772.C));
        },
        allWithArrayItemFilterCallbackWorks: function () {
            Bridge.Test.NUnit.Assert.true(System.Linq.Enumerable.from(System.Array.init([1, 2, 3], System.Int32)).all($asm.$.Bridge.ClientTest.Batch2.BridgeIssues.N772.f1));
            Bridge.Test.NUnit.Assert.false(System.Linq.Enumerable.from(System.Array.init([1, 2, 3], System.Int32)).all($asm.$.Bridge.ClientTest.Batch2.BridgeIssues.N772.f2));
        },
        sliceWithoutEndWorks: function () {
            Bridge.Test.NUnit.Assert.areDeepEqual(System.Array.init(["c", "d"], System.String), System.Array.init(["a", "b", "c", "d"], System.String).slice(2));
            Bridge.Test.NUnit.Assert.areDeepEqual(System.Array.init(["b", "c"], System.String), System.Array.init(["a", "b", "c", "d"], System.String).slice(1, 3));
        },
        foreachWithArrayItemCallbackWorks: function () {
            var result = "";
            System.Array.init(["a", "b", "c"], System.String).forEach(function (s) {
                    result = System.String.concat(result, s);
                });
            Bridge.Test.NUnit.Assert.areEqual("abc", result);
        },
        foreachWithArrayCallbackWorks: function () {
            var result = "";
            Bridge.Linq.Enumerable.from(System.Array.init(["a", "b", "c"], System.String)).forEach(function (s, i) {
                    result = System.String.concat(result, (System.String.concat(s, i)));
                });
            Bridge.Test.NUnit.Assert.areEqual("a0b1c2", result);
        },
        indexOfWithoutStartIndexWorks: function () {
            Bridge.Test.NUnit.Assert.areEqual(1, System.Array.init(["a", "b", "c", "b"], System.String).indexOf("b"));
        },
        indexOfWithoutStartIndexUsesEqualsMethod: function () {
            var arr = System.Array.init([new Bridge.ClientTest.Batch2.BridgeIssues.N772.C(1), new Bridge.ClientTest.Batch2.BridgeIssues.N772.C(2), new Bridge.ClientTest.Batch2.BridgeIssues.N772.C(3)], Bridge.ClientTest.Batch2.BridgeIssues.N772.C);
            Bridge.Test.NUnit.Assert.areEqual(1, Bridge.Linq.Enumerable.from(arr).indexOf(new Bridge.ClientTest.Batch2.BridgeIssues.N772.C(2)));
            Bridge.Test.NUnit.Assert.areEqual(-1, Bridge.Linq.Enumerable.from(arr).indexOf(new Bridge.ClientTest.Batch2.BridgeIssues.N772.C(4)));
        },
        indexOfWithStartIndexWorks: function () {
            Bridge.Test.NUnit.Assert.areEqual(3, System.Array.init(["a", "b", "c", "b"], System.String).indexOf("b", 2));
        },
        joinWithoutDelimiterWorks: function () {
            Bridge.Test.NUnit.Assert.areEqual("a,b,c,b", System.Array.init(["a", "b", "c", "b"], System.String).join(","));

            Bridge.Test.NUnit.Assert.areEqual("a|b|c|b", System.Array.init(["a", "b", "c", "b"], System.String).join("|"));
        },
        reverseWorks: function () {
            var arr = System.Array.init([1, 3, 4, 1, 3, 2], System.Int32);
            arr.reverse();
            Bridge.Test.NUnit.Assert.areEqual(System.Array.init([2, 3, 1, 4, 3, 1], System.Int32), arr);
        },
        anyWithArrayItemFilterCallbackWorks: function () {
            Bridge.Test.NUnit.Assert.true(System.Linq.Enumerable.from(System.Array.init([1, 2, 3, 4], System.Int32)).any($asm.$.Bridge.ClientTest.Batch2.BridgeIssues.N772.f3));
            Bridge.Test.NUnit.Assert.false(System.Linq.Enumerable.from(System.Array.init([1, 2, 3, 4], System.Int32)).any($asm.$.Bridge.ClientTest.Batch2.BridgeIssues.N772.f4));
        },
        binarySearch1Works: function () {
            var arr = System.Array.init([1, 2, 3, 3, 4, 5], System.Int32);

            Bridge.Test.NUnit.Assert.areEqual(2, System.Array.binarySearch(arr, 0, arr.length, 3));
            Bridge.Test.NUnit.Assert.true(System.Array.binarySearch(arr, 0, arr.length, 6) < 0);
        },
        binarySearch2Works: function () {
            var arr = System.Array.init([1, 2, 3, 3, 4, 5], System.Int32);

            Bridge.Test.NUnit.Assert.areEqual(3, System.Array.binarySearch(arr, 3, 2, 3));
            Bridge.Test.NUnit.Assert.true(System.Array.binarySearch(arr, 2, 2, 4) < 0);
        },
        binarySearch3Works: function () {
            var arr = System.Array.init([1, 2, 3, 3, 4, 5], System.Int32);

            Bridge.Test.NUnit.Assert.areEqual(2, System.Array.binarySearch(arr, 0, arr.length, 3, new Bridge.ClientTest.Batch2.BridgeIssues.N772.TestReverseComparer()));
            Bridge.Test.NUnit.Assert.areEqual(-1, System.Array.binarySearch(arr, 0, arr.length, 6, new Bridge.ClientTest.Batch2.BridgeIssues.N772.TestReverseComparer()));
        },
        binarySearch4Works: function () {
            var arr = System.Array.init([1, 2, 3, 3, 4, 5], System.Int32);

            Bridge.Test.NUnit.Assert.areEqual(3, System.Array.binarySearch(arr, 3, 2, 3, new Bridge.ClientTest.Batch2.BridgeIssues.N772.TestReverseComparer()));
            Bridge.Test.NUnit.Assert.true(System.Array.binarySearch(arr, 3, 2, 4, new Bridge.ClientTest.Batch2.BridgeIssues.N772.TestReverseComparer()) < 0);
        },
        binarySearchExceptionsWorks: function () {
            var arr1 = null;
            var arr2 = System.Array.init([1, 2, 3, 3, 4, 5], System.Int32);

            Bridge.Test.NUnit.Assert.throws(function () {
                System.Array.binarySearch(arr1, 0, arr1.length, 1);
            });
            Bridge.Test.NUnit.Assert.throws(function () {
                System.Array.binarySearch(arr2, -1, 1, 1);
            });
            Bridge.Test.NUnit.Assert.throws(function () {
                System.Array.binarySearch(arr2, 1, 6, 1);
            });
        },
        sortWithDefaultCompareWorks: function () {
            var arr = System.Array.init([1, 6, 6, 4, 2], System.Int32);
            arr.sort();
            Bridge.Test.NUnit.Assert.areEqual(System.Array.init([1, 2, 4, 6, 6], System.Int32), arr);
        },
        sort1Works: function () {
            var arr = System.Array.init([1, 6, 6, 4, 2], System.Int32);
            System.Array.sort(arr);
            Bridge.Test.NUnit.Assert.areEqual(System.Array.init([1, 2, 4, 6, 6], System.Int32), arr);
        },
        sort2Works: function () {
            var arr = System.Array.init([1, 6, 6, 4, 2], System.Int32);
            System.Array.sort(arr, 2, 3);
            Bridge.Test.NUnit.Assert.areEqual(System.Array.init([1, 6, 2, 4, 6], System.Int32), arr);
        },
        sort3Works: function () {
            var arr = System.Array.init([1, 2, 6, 3, 6, 7], System.Int32);
            System.Array.sort(arr, 2, 3, new Bridge.ClientTest.Batch2.BridgeIssues.N772.TestReverseComparer());
            Bridge.Test.NUnit.Assert.areEqual(System.Array.init([1, 2, 6, 6, 3, 7], System.Int32), arr);
        },
        sort4Works: function () {
            var arr = System.Array.init([1, 6, 6, 4, 2], System.Int32);
            System.Array.sort(arr, new Bridge.ClientTest.Batch2.BridgeIssues.N772.TestReverseComparer());
            Bridge.Test.NUnit.Assert.areEqual(System.Array.init([6, 6, 4, 2, 1], System.Int32), arr);
        },
        sortExceptionsWorks: function () {
            var arr1 = null;

            Bridge.Test.NUnit.Assert.throws(function () {
                System.Array.sort(arr1);
            });
        },
        foreachWhenCastToIListWorks: function () {
            var $t;
            var list = System.Array.init(["x", "y"], System.String);
            var result = "";
            $t = Bridge.getEnumerator(list, System.String);
            try {
                while ($t.moveNext()) {
                    var s = $t.Current;
                    result = System.String.concat(result, s);
                }
            }finally {
                if (Bridge.is($t, System.IDisposable)) {
                    $t.System$IDisposable$dispose();
                }
            }Bridge.Test.NUnit.Assert.areEqual("xy", result);
        },
        iCollectionCountWorks: function () {
            var l = System.Array.init(["x", "y", "z"], System.String);
            Bridge.Test.NUnit.Assert.areEqual(3, System.Array.getCount(l, System.String));
        },
        iCollectionAddWorks: function () {
            var l = System.Array.init(["x", "y", "z"], System.String);
            Bridge.Test.NUnit.Assert.throws$6(System.NotSupportedException, function () {
                System.Array.add(l, "a", System.String);
            });
        },
        iCollectionClearWorks: function () {
            var l = System.Array.init(["x", "y", "z"], System.String);
            Bridge.Test.NUnit.Assert.throws$6(System.NotSupportedException, function () {
                System.Array.clear(l, System.String);
            });
        },
        iCollectionContainsWorks: function () {
            var l = System.Array.init(["x", "y", "z"], System.String);
            Bridge.Test.NUnit.Assert.true(System.Array.contains(l, "y", System.String));
            Bridge.Test.NUnit.Assert.false(System.Array.contains(l, "a", System.String));
        },
        iCollectionContainsUsesEqualsMethod: function () {
            var l = System.Array.init([new Bridge.ClientTest.Batch2.BridgeIssues.N772.C(1), new Bridge.ClientTest.Batch2.BridgeIssues.N772.C(2), new Bridge.ClientTest.Batch2.BridgeIssues.N772.C(3)], Bridge.ClientTest.Batch2.BridgeIssues.N772.C);
            Bridge.Test.NUnit.Assert.true(System.Array.contains(l, new Bridge.ClientTest.Batch2.BridgeIssues.N772.C(2), Bridge.ClientTest.Batch2.BridgeIssues.N772.C));
            Bridge.Test.NUnit.Assert.false(System.Array.contains(l, new Bridge.ClientTest.Batch2.BridgeIssues.N772.C(4), Bridge.ClientTest.Batch2.BridgeIssues.N772.C));
        },
        iCollectionRemoveWorks: function () {
            var l = System.Array.init(["x", "y", "z"], System.String);
            Bridge.Test.NUnit.Assert.throws$6(System.NotSupportedException, function () {
                System.Array.remove(l, "y", System.String);
            });
        },
        iListIndexingWorks: function () {
            var l = System.Array.init(["x", "y", "z"], System.String);
            Bridge.Test.NUnit.Assert.areEqual("y", System.Array.getItem(l, 1, System.String));
            System.Array.setItem(l, 1, "a", System.String);
            Bridge.Test.NUnit.Assert.areEqual(System.Array.init(["x", "a", "z"], System.String), System.Linq.Enumerable.from(l).toArray());
        },
        iListIndexOfWorks: function () {
            var l = System.Array.init(["x", "y", "z"], System.String);
            Bridge.Test.NUnit.Assert.areEqual(1, System.Array.indexOf(l, "y", 0, null, System.String));
            Bridge.Test.NUnit.Assert.areEqual(-1, System.Array.indexOf(l, "a", 0, null, System.String));
        },
        iListIndexOfUsesEqualsMethod: function () {
            var arr = System.Array.init([new Bridge.ClientTest.Batch2.BridgeIssues.N772.C(1), new Bridge.ClientTest.Batch2.BridgeIssues.N772.C(2), new Bridge.ClientTest.Batch2.BridgeIssues.N772.C(3)], Bridge.ClientTest.Batch2.BridgeIssues.N772.C);
            Bridge.Test.NUnit.Assert.areEqual(1, Bridge.Linq.Enumerable.from(arr).indexOf(new Bridge.ClientTest.Batch2.BridgeIssues.N772.C(2)));
            Bridge.Test.NUnit.Assert.areEqual(-1, Bridge.Linq.Enumerable.from(arr).indexOf(new Bridge.ClientTest.Batch2.BridgeIssues.N772.C(4)));
        },
        iListInsertWorks: function () {
            var l = System.Array.init(["x", "y", "z"], System.String);
            Bridge.Test.NUnit.Assert.throws$6(System.NotSupportedException, function () {
                System.Array.insert(l, 1, "a", System.String);
            });
        },
        iListRemoveAtWorks: function () {
            var l = System.Array.init(["x", "y", "z"], System.String);
            Bridge.Test.NUnit.Assert.throws$6(System.NotSupportedException, function () {
                System.Array.removeAt(l, 1, System.String);
            });
        }
    });

    Bridge.ns("Bridge.ClientTest.Batch2.BridgeIssues.N772", $asm.$);

    Bridge.apply($asm.$.Bridge.ClientTest.Batch2.BridgeIssues.N772, {
        f1: function (x) {
            return x > 0;
        },
        f2: function (x) {
            return x > 1;
        },
        f3: function (i) {
            return i > 1;
        },
        f4: function (i) {
            return i > 5;
        }
    });

    Bridge.define("Bridge.ClientTest.Batch2.BridgeIssues.N772.C", {
        i: 0,
        ctor: function (i) {
            this.$initialize();
            this.i = i;
        },
        equals: function (o) {
            return Bridge.is(o, Bridge.ClientTest.Batch2.BridgeIssues.N772.C) && this.i === Bridge.cast(o, Bridge.ClientTest.Batch2.BridgeIssues.N772.C).i;
        },
        getHashCode: function () {
            return this.i;
        }
    });

    Bridge.define("Bridge.ClientTest.Batch2.BridgeIssues.N772.TestReverseComparer", {
        inherits: [System.Collections.Generic.IComparer$1(System.Int32)],
        config: {
            alias: [
            "compare", "System$Collections$Generic$IComparer$1$System$Int32$compare"
            ]
        },
        compare: function (x, y) {
            return x === y ? 0 : (x > y ? -1 : 1);
        }
    });

    Bridge.define("Bridge.ClientTest.Batch2.CheckedUncheckedTests", {
        statics: {
            assertEqual: function (expected, actual, message) {
                if (message === void 0) { message = null; }
                Bridge.Test.NUnit.Assert.areEqual$1(expected.toString(), actual.toString(), message);
            },
            bypass: function (o) {
                return o;
            }
        }
    });

    Bridge.define("Bridge.ClientTest.Batch2.CheckedUncheckedTests.CheckedInsideUncheckedTests", {
        statics: {
            testInt32: function () {
                var max = 2147483647;

                var max1 = max;
                var max2 = max;
                var max3 = max;
                var max4 = max;

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = Bridge.Int.check(max + 1, System.Int32);
                }, "Through identifier +");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = Bridge.identity(max2, (max2 = Bridge.Int.check(max2 + 1, System.Int32)));
                }, "Through identifier post++");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = ((max3 = Bridge.Int.check(max3 + 1, System.Int32)));
                }, "Through identifier ++pre");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = Bridge.Int.check(2 * max, System.Int32);
                }, "Through identifier *");

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.Int.check(max + 1, System.Int32), System.Int32));
                }, "Through parameter +");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.identity(max3, (max3 = Bridge.Int.check(max3 + 1, System.Int32))), System.Int32));
                }, "Through parameter post++");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((max4 = Bridge.Int.check(max4 + 1, System.Int32))), System.Int32));
                }, "Through parameter ++pre");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.Int.check(2 * max, System.Int32), System.Int32));
                }, "Through parameter *");

                var min = -2147483648;

                var min1 = min;
                var min2 = min;
                var min3 = min;
                var min4 = min;

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = Bridge.Int.check(min - 1, System.Int32);
                }, "Through identifier -");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = Bridge.identity(min1, (min1 = Bridge.Int.check(min1 - 1, System.Int32)));
                }, "Through identifier post--");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = ((min2 = Bridge.Int.check(min2 - 1, System.Int32)));
                }, "Through identifier pre--");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = Bridge.Int.check(-min, System.Int32);
                }, "Through identifier unary -");

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.Int.check(min - 1, System.Int32), System.Int32));
                }, "Through parameter -");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.identity(min3, (min3 = Bridge.Int.check(min3 - 1, System.Int32))), System.Int32));
                }, "Through parameter post--");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((min4 = Bridge.Int.check(min4 - 1, System.Int32))), System.Int32));
                }, "Through parameter --pre");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.Int.check(-min, System.Int32), System.Int32));
                }, "Through parameter unary -");
            },
            testUInt32: function () {
                var max = 4294967295;

                var max1 = max;
                var max2 = max;
                var max3 = max;
                var max4 = max;

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = Bridge.Int.check(max + 1, System.UInt32);
                }, "Through identifier +");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = Bridge.identity(max1, (max1 = Bridge.Int.check(max1 + 1, System.UInt32)));
                }, "Through identifier post++");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = ((max2 = Bridge.Int.check(max2 + 1, System.UInt32)));
                }, "Through identifier ++pre");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = Bridge.Int.check(2 * max, System.UInt32);
                }, "Through identifier *");

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.Int.check(max + 1, System.UInt32), System.UInt32));
                }, "Through parameter +");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.identity(max3, (max3 = Bridge.Int.check(max3 + 1, System.UInt32))), System.UInt32));
                }, "Through parameter post++");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((max4 = Bridge.Int.check(max4 + 1, System.UInt32))), System.UInt32));
                }, "Through parameter ++pre");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.Int.check(2 * max, System.UInt32), System.UInt32));
                }, "Through parameter *");

                var min = 0;

                var min1 = min;
                var min2 = min;
                var min3 = min;
                var min4 = min;

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = Bridge.Int.check(min - 1, System.UInt32);
                }, "Through identifier -");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = Bridge.identity(min1, (min1 = Bridge.Int.check(min1 - 1, System.UInt32)));
                }, "Through identifier post--");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = ((min2 = Bridge.Int.check(min2 - 1, System.UInt32)));
                }, "Through identifier pre--");

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.Int.check(min - 1, System.UInt32), System.UInt32));
                }, "Through parameter -");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.identity(min3, (min3 = Bridge.Int.check(min3 - 1, System.UInt32))), System.UInt32));
                }, "Through parameter post--");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((min4 = Bridge.Int.check(min4 - 1, System.UInt32))), System.UInt32));
                }, "Through parameter --pre");
            },
            testLong: function () {
                var max = System.Int64.MaxValue;

                var max1 = max;
                var max2 = max;
                var max3 = max;
                var max4 = max;

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = max.add(System.Int64(1), 1);
                }, "Through identifier +");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var $t;
                    var r = ($t = max1, max1 = max1.inc(1), $t);
                }, "Through identifier post++");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = (max2 = max2.inc(1));
                }, "Through identifier ++pre");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = System.Int64(2).mul(max, 1);
                }, "Through identifier *");

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(max.add(System.Int64(1), 1));
                }, "Through parameter +");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var $t;
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(($t = max3, max3 = max3.inc(1), $t));
                }, "Through parameter post++");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass((max4 = max4.inc(1)));
                }, "Through parameter ++pre");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(System.Int64(2).mul(max, 1));
                }, "Through parameter *");

                var min = System.Int64.MinValue;

                var min1 = min;
                var min2 = min;
                var min3 = min;
                var min4 = min;

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = min.sub(System.Int64(1), 1);
                }, "Through identifier -");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var $t;
                    var r = ($t = min1, min1 = min1.dec(1), $t);
                }, "Through identifier post--");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = (min2 = min2.dec(1));
                }, "Through identifier pre--");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = min.neg(1);
                }, "Through identifier unary -");

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(min.sub(System.Int64(1), 1));
                }, "Through parameter -");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var $t;
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(($t = min3, min3 = min3.dec(1), $t));
                }, "Through parameter post--");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass((min4 = min4.dec(1)));
                }, "Through parameter --pre");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(min.neg(1));
                }, "Through parameter unary -");
            },
            testULong: function () {
                var max = System.UInt64.MaxValue;

                var max1 = max;
                var max2 = max;
                var max3 = max;
                var max4 = max;

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = max.add(System.UInt64(1), 1);
                }, "Through identifier +");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var $t;
                    var r = ($t = max1, max1 = max1.inc(1), $t);
                }, "Through identifier post++");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = (max2 = max2.inc(1));
                }, "Through identifier ++pre");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = System.UInt64(2).mul(max, 1);
                }, "Through identifier *");

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(max.add(System.UInt64(1), 1));
                }, "Through parameter +");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var $t;
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(($t = max3, max3 = max3.inc(1), $t));
                }, "Through parameter post++");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass((max4 = max4.inc(1)));
                }, "Through parameter ++pre");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(System.UInt64(2).mul(max, 1));
                }, "Through parameter *");

                var min = System.UInt64.MinValue;

                var min1 = min;
                var min2 = min;
                var min3 = min;
                var min4 = min;

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = min.sub(System.UInt64(1), 1);
                }, "Through identifier -");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var $t;
                    var r = ($t = min1, min1 = min1.dec(1), $t);
                }, "Through identifier post--");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = (min2 = min2.dec(1));
                }, "Through identifier pre--");

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(min.sub(System.UInt64(1), 1));
                }, "Through parameter -");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var $t;
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(($t = min3, min3 = min3.dec(1), $t));
                }, "Through parameter post--");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass((min4 = min4.dec(1)));
                }, "Through parameter --pre");
            }
        }
    });

    Bridge.define("Bridge.ClientTest.Batch2.CheckedUncheckedTests.CheckedTests", {
        statics: {
            testInt32: function () {
                var max = 2147483647;

                var max1 = max;
                var max2 = max;
                var max3 = max;
                var max4 = max;

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = Bridge.Int.check(max + 1, System.Int32);
                }, "Through identifier +");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = Bridge.identity(max2, (max2 = Bridge.Int.check(max2 + 1, System.Int32)));
                }, "Through identifier post++");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = ((max3 = Bridge.Int.check(max3 + 1, System.Int32)));
                }, "Through identifier ++pre");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = Bridge.Int.check(2 * max, System.Int32);
                }, "Through identifier *");

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.Int.check(max + 1, System.Int32), System.Int32));
                }, "Through parameter +");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.identity(max3, (max3 = Bridge.Int.check(max3 + 1, System.Int32))), System.Int32));
                }, "Through parameter post++");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((max4 = Bridge.Int.check(max4 + 1, System.Int32))), System.Int32));
                }, "Through parameter ++pre");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.Int.check(2 * max, System.Int32), System.Int32));
                }, "Through parameter *");

                var min = -2147483648;

                var min1 = min;
                var min2 = min;
                var min3 = min;
                var min4 = min;

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = Bridge.Int.check(min - 1, System.Int32);
                }, "Through identifier -");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = Bridge.identity(min1, (min1 = Bridge.Int.check(min1 - 1, System.Int32)));
                }, "Through identifier post--");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = ((min2 = Bridge.Int.check(min2 - 1, System.Int32)));
                }, "Through identifier pre--");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = Bridge.Int.check(-min, System.Int32);
                }, "Through identifier unary -");

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.Int.check(min - 1, System.Int32), System.Int32));
                }, "Through parameter -");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.identity(min3, (min3 = Bridge.Int.check(min3 - 1, System.Int32))), System.Int32));
                }, "Through parameter post--");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((min4 = Bridge.Int.check(min4 - 1, System.Int32))), System.Int32));
                }, "Through parameter --pre");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.Int.check(-min, System.Int32), System.Int32));
                }, "Through parameter unary -");
            },
            testUInt32: function () {
                var max = 4294967295;

                var max1 = max;
                var max2 = max;
                var max3 = max;
                var max4 = max;

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = Bridge.Int.check(max + 1, System.UInt32);
                }, "Through identifier +");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = Bridge.identity(max1, (max1 = Bridge.Int.check(max1 + 1, System.UInt32)));
                }, "Through identifier post++");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = ((max2 = Bridge.Int.check(max2 + 1, System.UInt32)));
                }, "Through identifier ++pre");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = Bridge.Int.check(2 * max, System.UInt32);
                }, "Through identifier *");

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.Int.check(max + 1, System.UInt32), System.UInt32));
                }, "Through parameter +");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.identity(max3, (max3 = Bridge.Int.check(max3 + 1, System.UInt32))), System.UInt32));
                }, "Through parameter post++");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((max4 = Bridge.Int.check(max4 + 1, System.UInt32))), System.UInt32));
                }, "Through parameter ++pre");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.Int.check(2 * max, System.UInt32), System.UInt32));
                }, "Through parameter *");

                var min = 0;

                var min1 = min;
                var min2 = min;
                var min3 = min;
                var min4 = min;

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = Bridge.Int.check(min - 1, System.UInt32);
                }, "Through identifier -");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = Bridge.identity(min1, (min1 = Bridge.Int.check(min1 - 1, System.UInt32)));
                }, "Through identifier post--");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = ((min2 = Bridge.Int.check(min2 - 1, System.UInt32)));
                }, "Through identifier pre--");

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.Int.check(min - 1, System.UInt32), System.UInt32));
                }, "Through parameter -");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.identity(min3, (min3 = Bridge.Int.check(min3 - 1, System.UInt32))), System.UInt32));
                }, "Through parameter post--");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((min4 = Bridge.Int.check(min4 - 1, System.UInt32))), System.UInt32));
                }, "Through parameter --pre");
            },
            testLong: function () {
                var max = System.Int64.MaxValue;

                var max1 = max;
                var max2 = max;
                var max3 = max;
                var max4 = max;

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = max.add(System.Int64(1), 1);
                }, "Through identifier +");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var $t;
                    var r = ($t = max1, max1 = max1.inc(1), $t);
                }, "Through identifier post++");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = (max2 = max2.inc(1));
                }, "Through identifier ++pre");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = System.Int64(2).mul(max, 1);
                }, "Through identifier *");

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(max.add(System.Int64(1), 1));
                }, "Through parameter +");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var $t;
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(($t = max3, max3 = max3.inc(1), $t));
                }, "Through parameter post++");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass((max4 = max4.inc(1)));
                }, "Through parameter ++pre");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(System.Int64(2).mul(max, 1));
                }, "Through parameter *");

                var min = System.Int64.MinValue;

                var min1 = min;
                var min2 = min;
                var min3 = min;
                var min4 = min;

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = min.sub(System.Int64(1), 1);
                }, "Through identifier -");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var $t;
                    var r = ($t = min1, min1 = min1.dec(1), $t);
                }, "Through identifier post--");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = (min2 = min2.dec(1));
                }, "Through identifier pre--");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = min.neg(1);
                }, "Through identifier unary -");

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(min.sub(System.Int64(1), 1));
                }, "Through parameter -");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var $t;
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(($t = min3, min3 = min3.dec(1), $t));
                }, "Through parameter post--");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass((min4 = min4.dec(1)));
                }, "Through parameter --pre");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(min.neg(1));
                }, "Through parameter unary -");
            },
            testULong: function () {
                var max = System.UInt64.MaxValue;

                var max1 = max;
                var max2 = max;
                var max3 = max;
                var max4 = max;

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = max.add(System.UInt64(1), 1);
                }, "Through identifier +");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var $t;
                    var r = ($t = max1, max1 = max1.inc(1), $t);
                }, "Through identifier post++");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = (max2 = max2.inc(1));
                }, "Through identifier ++pre");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = System.UInt64(2).mul(max, 1);
                }, "Through identifier *");

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(max.add(System.UInt64(1), 1));
                }, "Through parameter +");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var $t;
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(($t = max3, max3 = max3.inc(1), $t));
                }, "Through parameter post++");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass((max4 = max4.inc(1)));
                }, "Through parameter ++pre");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(System.UInt64(2).mul(max, 1));
                }, "Through parameter *");

                var min = System.UInt64.MinValue;

                var min1 = min;
                var min2 = min;
                var min3 = min;
                var min4 = min;

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = min.sub(System.UInt64(1), 1);
                }, "Through identifier -");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var $t;
                    var r = ($t = min1, min1 = min1.dec(1), $t);
                }, "Through identifier post--");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var r = (min2 = min2.dec(1));
                }, "Through identifier pre--");

                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(min.sub(System.UInt64(1), 1));
                }, "Through parameter -");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    var $t;
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(($t = min3, min3 = min3.dec(1), $t));
                }, "Through parameter post--");
                Bridge.Test.NUnit.Assert.throws$7(System.OverflowException, function () {
                    Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass((min4 = min4.dec(1)));
                }, "Through parameter --pre");
            }
        }
    });

    Bridge.define("Bridge.ClientTest.Batch2.CheckedUncheckedTests.UncheckedInsideCheckedTests", {
        statics: {
            testInt32: function () {
                var max = 2147483647;

                var max1 = max;
                var max2 = max;
                var max3 = max;
                var max4 = max;

                var rMax1 = (max + 1) | 0;
                var rMax2 = Bridge.identity(max1, (max1 = (max1 + 1) | 0));
                var rMax3 = ((max2 = (max2 + 1) | 0));
                var rMax4 = (2 * max) | 0;
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2147483648", Bridge.box(rMax1, System.Int32), "Through identifier +");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("2147483647", Bridge.box(rMax2, System.Int32), "Through identifier post++");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2147483648", Bridge.box(rMax3, System.Int32), "Through identifier ++pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2", Bridge.box(rMax4, System.Int32), "Through identifier *");

                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2147483648", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((max + 1) | 0), System.Int32)), "Through parameter +");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("2147483647", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.identity(max3, (max3 = (max3 + 1) | 0)), System.Int32)), "Through parameter post++");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2147483648", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((max4 = (max4 + 1) | 0)), System.Int32)), "Through parameter ++pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((2 * max) | 0), System.Int32)), "Through parameter *");

                var min = -2147483648;

                var min1 = min;
                var min2 = min;
                var min3 = min;
                var min4 = min;

                var rMin1 = (min - 1) | 0;
                var rMin2 = Bridge.identity(min1, (min1 = (min1 - 1) | 0));
                var rMin3 = ((min2 = (min2 - 1) | 0));
                var rMin4 = (-min) | 0;
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("2147483647", Bridge.box(rMin1, System.Int32), "Through identifier -");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2147483648", Bridge.box(rMin2, System.Int32), "Through identifier post--");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("2147483647", Bridge.box(rMin3, System.Int32), "Through identifier --pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2147483648", Bridge.box(rMin4, System.Int32), "Through identifier unary -");

                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("2147483647", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((min - 1) | 0), System.Int32)), "Through parameter -");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2147483648", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.identity(min3, (min3 = (min3 - 1) | 0)), System.Int32)), "Through parameter post--");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("2147483647", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((min4 = (min4 - 1) | 0)), System.Int32)), "Through parameter --pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2147483648", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((-min) | 0), System.Int32)), "Through parameter unary -");
            },
            testUInt32: function () {
                var max = 4294967295;

                var max1 = max;
                var max2 = max;
                var max3 = max;
                var max4 = max;

                var rMax1 = (max + 1) >>> 0;
                var rMax2 = Bridge.identity(max1, (max1 = (max1 + 1) >>> 0));
                var rMax3 = ((max2 = (max2 + 1) >>> 0));
                var rMax4 = (2 * max) >>> 0;
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", Bridge.box(rMax1, System.UInt32), "Through identifier +");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("4294967295", Bridge.box(rMax2, System.UInt32), "Through identifier post++");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", Bridge.box(rMax3, System.UInt32), "Through identifier ++pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("4294967294", Bridge.box(rMax4, System.UInt32), "Through identifier *");

                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((max + 1) >>> 0), System.UInt32)), "Through parameter +");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("4294967295", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.identity(max3, (max3 = (max3 + 1) >>> 0)), System.UInt32)), "Through parameter post++");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((max4 = (max4 + 1) >>> 0)), System.UInt32)), "Through parameter ++pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("4294967294", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((2 * max) >>> 0), System.UInt32)), "Through parameter *");

                var min = 0;

                var min1 = min;
                var min2 = min;
                var min3 = min;
                var min4 = min;

                var rMin1 = (min - 1) >>> 0;
                var rMin2 = Bridge.identity(min1, (min1 = (min1 - 1) >>> 0));
                var rMin3 = ((min2 = (min2 - 1) >>> 0));
                var rMin4 = System.Int64(min).neg();
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("4294967295", Bridge.box(rMin1, System.UInt32), "Through identifier -");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", Bridge.box(rMin2, System.UInt32), "Through identifier post--");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("4294967295", Bridge.box(rMin3, System.UInt32), "Through identifier --pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", rMin4, "Through identifier unary -");

                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("4294967295", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((min - 1) >>> 0), System.UInt32)), "Through parameter -");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.identity(min3, (min3 = (min3 - 1) >>> 0)), System.UInt32)), "Through parameter post--");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("4294967295", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((min4 = (min4 - 1) >>> 0)), System.UInt32)), "Through parameter --pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(System.Int64(min).neg()), "Through parameter unary -");
            },
            testLong: function () {
                var $t;
                var max = System.Int64.MaxValue;

                var max1 = max;
                var max2 = max;
                var max3 = max;
                var max4 = max;

                var rMax1 = max.add(System.Int64(1));
                var rMax2 = ($t = max1, max1 = max1.inc(), $t);
                var rMax3 = (max2 = max2.inc());
                var rMax4 = System.Int64(2).mul(max);
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-9223372036854775808", rMax1, "Through identifier +");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("9223372036854775807", rMax2, "Through identifier post++");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-9223372036854775808", rMax3, "Through identifier ++pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2", rMax4, "Through identifier *");

                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-9223372036854775808", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(max.add(System.Int64(1))), "Through parameter +");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("9223372036854775807", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(($t = max3, max3 = max3.inc(), $t)), "Through parameter post++");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-9223372036854775808", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass((max4 = max4.inc())), "Through parameter ++pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(System.Int64(2).mul(max)), "Through parameter *");

                var min = System.Int64.MinValue;

                var min1 = min;
                var min2 = min;
                var min3 = min;
                var min4 = min;

                var rMin1 = min.sub(System.Int64(1));
                var rMin2 = ($t = min1, min1 = min1.dec(), $t);
                var rMin3 = (min2 = min2.dec());
                var rMin4 = min.neg();
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("9223372036854775807", rMin1, "Through identifier -");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-9223372036854775808", rMin2, "Through identifier post--");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("9223372036854775807", rMin3, "Through identifier --pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-9223372036854775808", rMin4, "Through identifier unary -");

                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("9223372036854775807", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(min.sub(System.Int64(1))), "Through parameter -");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-9223372036854775808", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(($t = min3, min3 = min3.dec(), $t)), "Through parameter post--");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("9223372036854775807", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass((min4 = min4.dec())), "Through parameter --pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-9223372036854775808", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(min.neg()), "Through parameter unary -");
            },
            testULong: function () {
                var $t;
                var max = System.UInt64.MaxValue;

                var max1 = max;
                var max2 = max;
                var max3 = max;
                var max4 = max;

                var rMax1 = max.add(System.UInt64(1));
                var rMax2 = ($t = max1, max1 = max1.inc(), $t);
                var rMax3 = (max2 = max2.inc());
                var rMax4 = System.UInt64(2).mul(max);
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", rMax1, "Through identifier +");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("18446744073709551615", rMax2, "Through identifier post++");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", rMax3, "Through identifier ++pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("18446744073709551614", rMax4, "Through identifier *");

                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(max.add(System.UInt64(1))), "Through parameter +");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("18446744073709551615", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(($t = max3, max3 = max3.inc(), $t)), "Through parameter post++");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass((max4 = max4.inc())), "Through parameter ++pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("18446744073709551614", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(System.UInt64(2).mul(max)), "Through parameter *");

                var min = System.UInt64.MinValue;

                var min1 = min;
                var min2 = min;
                var min3 = min;
                var min4 = min;

                var rMin1 = min.sub(System.UInt64(1));
                var rMin2 = ($t = min1, min1 = min1.dec(), $t);
                var rMin3 = (min2 = min2.dec());
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("18446744073709551615", rMin1, "Through identifier -");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", rMin2, "Through identifier post--");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("18446744073709551615", rMin3, "Through identifier --pre");

                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("18446744073709551615", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(min.sub(System.UInt64(1))), "Through parameter -");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(($t = min3, min3 = min3.dec(), $t)), "Through parameter post--");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("18446744073709551615", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass((min4 = min4.dec())), "Through parameter --pre");
            }
        }
    });

    Bridge.define("Bridge.ClientTest.Batch2.CheckedUncheckedTests.UncheckedTests", {
        statics: {
            testInt32: function () {
                var max = 2147483647;

                var max1 = max;
                var max2 = max;
                var max3 = max;
                var max4 = max;

                var rMax1 = (max + 1) | 0;
                var rMax2 = Bridge.identity(max1, (max1 = (max1 + 1) | 0));
                var rMax3 = ((max2 = (max2 + 1) | 0));
                var rMax4 = (2 * max) | 0;
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2147483648", Bridge.box(rMax1, System.Int32), "Through identifier +");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("2147483647", Bridge.box(rMax2, System.Int32), "Through identifier post++");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2147483648", Bridge.box(rMax3, System.Int32), "Through identifier ++pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2", Bridge.box(rMax4, System.Int32), "Through identifier *");

                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2147483648", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((max + 1) | 0), System.Int32)), "Through parameter +");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("2147483647", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.identity(max3, (max3 = (max3 + 1) | 0)), System.Int32)), "Through parameter post++");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2147483648", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((max4 = (max4 + 1) | 0)), System.Int32)), "Through parameter ++pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((2 * max) | 0), System.Int32)), "Through parameter *");

                var min = -2147483648;

                var min1 = min;
                var min2 = min;
                var min3 = min;
                var min4 = min;

                var rMin1 = (min - 1) | 0;
                var rMin2 = Bridge.identity(min1, (min1 = (min1 - 1) | 0));
                var rMin3 = ((min2 = (min2 - 1) | 0));
                var rMin4 = (-min) | 0;
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("2147483647", Bridge.box(rMin1, System.Int32), "Through identifier -");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2147483648", Bridge.box(rMin2, System.Int32), "Through identifier post--");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("2147483647", Bridge.box(rMin3, System.Int32), "Through identifier --pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2147483648", Bridge.box(rMin4, System.Int32), "Through identifier unary -");

                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("2147483647", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((min - 1) | 0), System.Int32)), "Through parameter -");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2147483648", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.identity(min3, (min3 = (min3 - 1) | 0)), System.Int32)), "Through parameter post--");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("2147483647", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((min4 = (min4 - 1) | 0)), System.Int32)), "Through parameter --pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2147483648", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((-min) | 0), System.Int32)), "Through parameter unary -");
            },
            testUInt32: function () {
                var max = 4294967295;

                var max1 = max;
                var max2 = max;
                var max3 = max;
                var max4 = max;

                var rMax1 = (max + 1) >>> 0;
                var rMax2 = Bridge.identity(max1, (max1 = (max1 + 1) >>> 0));
                var rMax3 = ((max2 = (max2 + 1) >>> 0));
                var rMax4 = (2 * max) >>> 0;
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", Bridge.box(rMax1, System.UInt32), "Through identifier +");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("4294967295", Bridge.box(rMax2, System.UInt32), "Through identifier post++");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", Bridge.box(rMax3, System.UInt32), "Through identifier ++pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("4294967294", Bridge.box(rMax4, System.UInt32), "Through identifier *");

                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((max + 1) >>> 0), System.UInt32)), "Through parameter +");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("4294967295", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.identity(max3, (max3 = (max3 + 1) >>> 0)), System.UInt32)), "Through parameter post++");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((max4 = (max4 + 1) >>> 0)), System.UInt32)), "Through parameter ++pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("4294967294", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((2 * max) >>> 0), System.UInt32)), "Through parameter *");

                var min = 0;

                var min1 = min;
                var min2 = min;
                var min3 = min;
                var min4 = min;

                var rMin1 = (min - 1) >>> 0;
                var rMin2 = Bridge.identity(min1, (min1 = (min1 - 1) >>> 0));
                var rMin3 = ((min2 = (min2 - 1) >>> 0));
                var rMin4 = System.Int64(min).neg();
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("4294967295", Bridge.box(rMin1, System.UInt32), "Through identifier -");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", Bridge.box(rMin2, System.UInt32), "Through identifier post--");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("4294967295", Bridge.box(rMin3, System.UInt32), "Through identifier --pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", rMin4, "Through identifier unary -");

                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("4294967295", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((min - 1) >>> 0), System.UInt32)), "Through parameter -");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.identity(min3, (min3 = (min3 - 1) >>> 0)), System.UInt32)), "Through parameter post--");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("4294967295", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((min4 = (min4 - 1) >>> 0)), System.UInt32)), "Through parameter --pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(System.Int64(min).neg()), "Through parameter unary -");
            },
            testLong: function () {
                var $t;
                var max = System.Int64.MaxValue;

                var max1 = max;
                var max2 = max;
                var max3 = max;
                var max4 = max;

                var rMax1 = max.add(System.Int64(1));
                var rMax2 = ($t = max1, max1 = max1.inc(), $t);
                var rMax3 = (max2 = max2.inc());
                var rMax4 = System.Int64(2).mul(max);
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-9223372036854775808", rMax1, "Through identifier +");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("9223372036854775807", rMax2, "Through identifier post++");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-9223372036854775808", rMax3, "Through identifier ++pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2", rMax4, "Through identifier *");

                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-9223372036854775808", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(max.add(System.Int64(1))), "Through parameter +");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("9223372036854775807", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(($t = max3, max3 = max3.inc(), $t)), "Through parameter post++");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-9223372036854775808", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass((max4 = max4.inc())), "Through parameter ++pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(System.Int64(2).mul(max)), "Through parameter *");

                var min = System.Int64.MinValue;

                var min1 = min;
                var min2 = min;
                var min3 = min;
                var min4 = min;

                var rMin1 = min.sub(System.Int64(1));
                var rMin2 = ($t = min1, min1 = min1.dec(), $t);
                var rMin3 = (min2 = min2.dec());
                var rMin4 = min.neg();
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("9223372036854775807", rMin1, "Through identifier -");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-9223372036854775808", rMin2, "Through identifier post--");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("9223372036854775807", rMin3, "Through identifier --pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-9223372036854775808", rMin4, "Through identifier unary -");

                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("9223372036854775807", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(min.sub(System.Int64(1))), "Through parameter -");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-9223372036854775808", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(($t = min3, min3 = min3.dec(), $t)), "Through parameter post--");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("9223372036854775807", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass((min4 = min4.dec())), "Through parameter --pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-9223372036854775808", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(min.neg()), "Through parameter unary -");
            },
            testULong: function () {
                var $t;
                var max = System.UInt64.MaxValue;

                var max1 = max;
                var max2 = max;
                var max3 = max;
                var max4 = max;

                var rMax1 = max.add(System.UInt64(1));
                var rMax2 = ($t = max1, max1 = max1.inc(), $t);
                var rMax3 = (max2 = max2.inc());
                var rMax4 = System.UInt64(2).mul(max);
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", rMax1, "Through identifier +");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("18446744073709551615", rMax2, "Through identifier post++");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", rMax3, "Through identifier ++pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("18446744073709551614", rMax4, "Through identifier *");

                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(max.add(System.UInt64(1))), "Through parameter +");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("18446744073709551615", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(($t = max3, max3 = max3.inc(), $t)), "Through parameter post++");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass((max4 = max4.inc())), "Through parameter ++pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("18446744073709551614", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(System.UInt64(2).mul(max)), "Through parameter *");

                var min = System.UInt64.MinValue;

                var min1 = min;
                var min2 = min;
                var min3 = min;
                var min4 = min;

                var rMin1 = min.sub(System.UInt64(1));
                var rMin2 = ($t = min1, min1 = min1.dec(), $t);
                var rMin3 = (min2 = min2.dec());
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("18446744073709551615", rMin1, "Through identifier -");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", rMin2, "Through identifier post--");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("18446744073709551615", rMin3, "Through identifier --pre");

                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("18446744073709551615", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(min.sub(System.UInt64(1))), "Through parameter -");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(($t = min3, min3 = min3.dec(), $t)), "Through parameter post--");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("18446744073709551615", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass((min4 = min4.dec())), "Through parameter --pre");
            }
        }
    });

    Bridge.define("Bridge.ClientTest.Batch2.CheckedUncheckedTests.WithNoUncheckedKeywordTests", {
        statics: {
            testInt32: function () {
                var max = 2147483647;

                var max1 = max;
                var max2 = max;
                var max3 = max;
                var max4 = max;

                var rMax1 = max + 1;
                var rMax2 = Bridge.identity(max1, (max1 = max1 + 1));
                var rMax3 = ((max2 = max2 + 1));
                var rMax4 = 2 * max;
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("2147483648", Bridge.box(rMax1, System.Int32), "Through identifier +");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("2147483647", Bridge.box(rMax2, System.Int32), "Through identifier post++");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("2147483648", Bridge.box(rMax3, System.Int32), "Through identifier ++pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("4294967294", Bridge.box(rMax4, System.Int32), "Through identifier *");

                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("2147483648", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(max + 1, System.Int32)), "Through parameter +");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("2147483647", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.identity(max3, (max3 = max3 + 1)), System.Int32)), "Through parameter post++");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("2147483648", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((max4 = max4 + 1)), System.Int32)), "Through parameter ++pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("4294967294", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(2 * max, System.Int32)), "Through parameter *");

                var min = -2147483648;

                var min1 = min;
                var min2 = min;
                var min3 = min;
                var min4 = min;

                var rMin1 = min - 1;
                var rMin2 = Bridge.identity(min1, (min1 = min1 - 1));
                var rMin3 = ((min2 = min2 - 1));
                var rMin4 = -min;
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2147483649", Bridge.box(rMin1, System.Int32), "Through identifier -");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2147483648", Bridge.box(rMin2, System.Int32), "Through identifier post--");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2147483649", Bridge.box(rMin3, System.Int32), "Through identifier --pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("2147483648", Bridge.box(rMin4, System.Int32), "Through identifier unary -");

                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2147483649", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(min - 1, System.Int32)), "Through parameter -");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2147483648", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.identity(min3, (min3 = min3 - 1)), System.Int32)), "Through parameter post--");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2147483649", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((min4 = min4 - 1)), System.Int32)), "Through parameter --pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("2147483648", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(-min, System.Int32)), "Through parameter unary -");
            },
            testUInt32: function () {
                var max = 4294967295;

                var max1 = max;
                var max2 = max;
                var max3 = max;
                var max4 = max;

                var rMax1 = max + 1;
                var rMax2 = Bridge.identity(max1, (max1 = max1 + 1));
                var rMax3 = ((max2 = max2 + 1));
                var rMax4 = 2 * max;
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("4294967296", Bridge.box(rMax1, System.UInt32), "Through identifier +");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("4294967295", Bridge.box(rMax2, System.UInt32), "Through identifier post++");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("4294967296", Bridge.box(rMax3, System.UInt32), "Through identifier ++pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("8589934590", Bridge.box(rMax4, System.UInt32), "Through identifier *");

                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("4294967296", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(max + 1, System.UInt32)), "Through parameter +");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("4294967295", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.identity(max3, (max3 = max3 + 1)), System.UInt32)), "Through parameter post++");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("4294967296", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((max4 = max4 + 1)), System.UInt32)), "Through parameter ++pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("8589934590", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(2 * max, System.UInt32)), "Through parameter *");

                var min = 0;

                var min1 = min;
                var min2 = min;
                var min3 = min;
                var min4 = min;

                var rMin1 = min - 1;
                var rMin2 = Bridge.identity(min1, (min1 = min1 - 1));
                var rMin3 = ((min2 = min2 - 1));
                var rMin4 = System.Int64(min).neg();
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-1", Bridge.box(rMin1, System.UInt32), "Through identifier -");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", Bridge.box(rMin2, System.UInt32), "Through identifier post--");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-1", Bridge.box(rMin3, System.UInt32), "Through identifier --pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", rMin4, "Through identifier unary -");

                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-1", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(min - 1, System.UInt32)), "Through parameter -");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(Bridge.identity(min3, (min3 = min3 - 1)), System.UInt32)), "Through parameter post--");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-1", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(Bridge.box(((min4 = min4 - 1)), System.UInt32)), "Through parameter --pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(System.Int64(min).neg()), "Through parameter unary -");
            },
            testLong: function () {
                var $t;
                var max = System.Int64.MaxValue;

                var max1 = max;
                var max2 = max;
                var max3 = max;
                var max4 = max;

                var rMax1 = max.add(System.Int64(1));
                var rMax2 = ($t = max1, max1 = max1.inc(), $t);
                var rMax3 = (max2 = max2.inc());
                var rMax4 = System.Int64(2).mul(max);
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-9223372036854775808", rMax1, "Through identifier +");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("9223372036854775807", rMax2, "Through identifier post++");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-9223372036854775808", rMax3, "Through identifier ++pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2", rMax4, "Through identifier *");

                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-9223372036854775808", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(max.add(System.Int64(1))), "Through parameter +");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("9223372036854775807", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(($t = max3, max3 = max3.inc(), $t)), "Through parameter post++");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-9223372036854775808", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass((max4 = max4.inc())), "Through parameter ++pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-2", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(System.Int64(2).mul(max)), "Through parameter *");

                var min = System.Int64.MinValue;

                var min1 = min;
                var min2 = min;
                var min3 = min;
                var min4 = min;

                var rMin1 = min.sub(System.Int64(1));
                var rMin2 = ($t = min1, min1 = min1.dec(), $t);
                var rMin3 = (min2 = min2.dec());
                var rMin4 = min.neg();
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("9223372036854775807", rMin1, "Through identifier -");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-9223372036854775808", rMin2, "Through identifier post--");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("9223372036854775807", rMin3, "Through identifier --pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-9223372036854775808", rMin4, "Through identifier unary -");

                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("9223372036854775807", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(min.sub(System.Int64(1))), "Through parameter -");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-9223372036854775808", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(($t = min3, min3 = min3.dec(), $t)), "Through parameter post--");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("9223372036854775807", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass((min4 = min4.dec())), "Through parameter --pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("-9223372036854775808", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(min.neg()), "Through parameter unary -");
            },
            testULong: function () {
                var $t;
                var max = System.UInt64.MaxValue;

                var max1 = max;
                var max2 = max;
                var max3 = max;
                var max4 = max;

                var rMax1 = max.add(System.UInt64(1));
                var rMax2 = ($t = max1, max1 = max1.inc(), $t);
                var rMax3 = (max2 = max2.inc());
                var rMax4 = System.UInt64(2).mul(max);
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", rMax1, "Through identifier +");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("18446744073709551615", rMax2, "Through identifier post++");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", rMax3, "Through identifier ++pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("18446744073709551614", rMax4, "Through identifier *");

                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(max.add(System.UInt64(1))), "Through parameter +");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("18446744073709551615", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(($t = max3, max3 = max3.inc(), $t)), "Through parameter post++");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass((max4 = max4.inc())), "Through parameter ++pre");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("18446744073709551614", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(System.UInt64(2).mul(max)), "Through parameter *");

                var min = System.UInt64.MinValue;

                var min1 = min;
                var min2 = min;
                var min3 = min;
                var min4 = min;

                var rMin1 = min.sub(System.UInt64(1));
                var rMin2 = ($t = min1, min1 = min1.dec(), $t);
                var rMin3 = (min2 = min2.dec());
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("18446744073709551615", rMin1, "Through identifier -");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", rMin2, "Through identifier post--");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("18446744073709551615", rMin3, "Through identifier --pre");

                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("18446744073709551615", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(min.sub(System.UInt64(1))), "Through parameter -");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("0", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass(($t = min3, min3 = min3.dec(), $t)), "Through parameter post--");
                Bridge.ClientTest.Batch2.CheckedUncheckedTests.assertEqual("18446744073709551615", Bridge.ClientTest.Batch2.CheckedUncheckedTests.bypass((min4 = min4.dec())), "Through parameter --pre");
            }
        }
    });

    Bridge.define("Bridge.ClientTest.Batch2.Constants", {
        statics: {
            BATCH_NAME: "Batch2",
            MODULE_ISSUES: "Issues2",
            MODULE_CHECKED_UNCKECKED: "Checked/Unckecked"
        }
    });

    var $box_ = {};

    Bridge.ns("System.Nullable$1", $box_);

    Bridge.apply($box_.System.Nullable$1, {
        toString: function(obj) {return System.Nullable.toString(obj);}
    });
});

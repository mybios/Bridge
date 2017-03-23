Bridge.assembly("Bridge.Test.Bridge.ClientTest", function ($asm, globals) {
    

    Bridge.define("Bridge.Test.Runtime.TestFixture$1", function (T) { return {
        statics: {
            instanceFabric: null,
            fixtureFabric: Bridge.getDefaultValue(T),
            config: {
                properties: {
                    FixtureFabric: {
                        get: function () {
                            if (Bridge.Test.Runtime.TestFixture$1(T).fixtureFabric == null) {
                                Bridge.Test.Runtime.TestFixture$1(T).fixtureFabric = Bridge.createInstance(T);
                            }

                            return Bridge.Test.Runtime.TestFixture$1(T).fixtureFabric;
                        },
                        set: function (value) {
                            Bridge.Test.Runtime.TestFixture$1(T).fixtureFabric = value;
                        }
                    }
                }
            },
            instanceFabric$1: function (type) {
                if (Bridge.Test.Runtime.TestFixture$1(T).instanceFabric == null) {
                    Bridge.Test.Runtime.TestFixture$1(T).instanceFabric = Bridge.cast(Bridge.createInstance(type), Bridge.Test.Runtime.TestFixture$1(T));
                }

                return Bridge.Test.Runtime.TestFixture$1(T).instanceFabric;
            },
            beforeTest: function (needInstance, assert, type, expectedCount, testContext) {
                if (expectedCount === void 0) { expectedCount = null; }
                if (testContext === void 0) { testContext = null; }
                Bridge.Test.NUnit.Assert.assert = assert;

                if (System.Nullable.hasValue(expectedCount)) {
                    assert.expect(System.Nullable.getValue(expectedCount));
                }

                var instance = Bridge.Test.Runtime.TestFixture$1(T).instanceFabric$1(type);
                instance.Fixture = needInstance ? Bridge.Test.Runtime.TestFixture$1(T).FixtureFabric : Bridge.getDefaultValue(T);

                var fixtureContext = instance.getContext();

                if (testContext != null || fixtureContext != null) {
                    Bridge.Test.Runtime.ContextHelper.setContext(assert, Bridge.merge(new Bridge.Test.Runtime.Context(), {
                        fixtureCtx: fixtureContext,
                        testCtx: testContext
                    } ));
                }

                try {
                    instance.setUp();
                }
                catch ($e1) {
                    $e1 = System.Exception.create($e1);
                    assert.ok(false, "The test failed SetUp");

                    throw $e1;
                }

                return instance;
            }
        },
        config: {
            properties: {
                Fixture: Bridge.getDefaultValue(T)
            }
        },
        getContext: function () {
            return null;
        },
        setUp: function () {
        },
        tearDown: function () {
        }
    }; });

    Bridge.define("Bridge.Test.Runtime.Context", {
        fixtureCtx: null,
        testCtx: null,
        stack: null
    });

    Bridge.define("Bridge.Test.Runtime.ContextHelper", {
        statics: {
            contextName: "BridgeTestContext",
            setContext: function (assert, ctx) {
                if (assert == null) {
                    return;
                }

                assert[System.Array.index(Bridge.Test.Runtime.ContextHelper.contextName, assert)] = ctx;
            },
            getTestId: function (details) {
                return Bridge.as(details.testId, System.String);
            },
            getAssert: function () {
                var $t;
                var a = ($t = QUnit.config.current).assert;

                return a;
            },
            getContext$1: function (assert) {
                if (assert == null) {
                    return null;
                }

                return Bridge.as(assert[System.Array.index(Bridge.Test.Runtime.ContextHelper.contextName, assert)], Bridge.Test.Runtime.Context);
            },
            getContext: function () {
                return Bridge.Test.Runtime.ContextHelper.getContext$1(Bridge.Test.Runtime.ContextHelper.getAssert());
            },
            getTestOutput: function (testId) {
                if (testId == null) {
                    return null;
                }

                return document.getElementById(System.String.concat("qunit-test-output-", testId));
            },
            getQUnitSource: function (output) {
                if (output == null) {
                    return null;
                }

                var source = output.getElementsByClassName("qunit-source");

                if (source == null || source.length <= 0) {
                    return null;
                }

                return source[System.Array.index(0, source)];
            },
            adjustSourceElement: function (ctx, testItem) {
                var $t;
                if (testItem == null) {
                    return null;
                }

                var fc = ctx.fixtureCtx;
                var tc = ctx.testCtx;

                var project = null;
                var file = null;
                var method = null;
                var line = null;

                if (fc != null) {
                    project = fc.project;
                    file = fc.file;
                    method = fc.className;
                }

                if (tc != null) {
                    if (tc.file != null) {
                        file = tc.file;
                    }

                    if (tc.method != null) {
                        method = System.String.concat((($t = method, $t != null ? $t : "")), ".", tc.method);
                    }

                    line = tc.line;
                }

                if (project != null || file != null || method != null) {
                    var qunitSourceName = Bridge.Test.Runtime.ContextHelper.getQUnitSource(testItem);

                    if (qunitSourceName == null) {
                        return null;
                    }

                    var html = "";

                    if (project != null) {
                        html = System.String.concat(html, (System.String.concat(" <strong>Project: </strong>", project)));
                    }

                    if (method != null) {
                        html = System.String.concat(html, (System.String.concat(" at ", Bridge.Test.Runtime.ContextHelper.adjustTags(method))));
                    }

                    if (file != null) {
                        html = System.String.concat(html, " in ");

                        if (System.String.startsWith(file, "file:")) {
                            html = System.String.concat(html, (System.String.format("<a href = \"{0}\" target = \"_blank\">{0}</a>", file)));
                        } else {
                            html = System.String.concat(html, file);
                        }
                    }

                    if (line != null) {
                        html = System.String.concat(html, (System.String.concat(": line ", line)));
                    }

                    var assertList = null;

                    var els = testItem.getElementsByTagName("ol");
                    if (els != null && els.length > 0) {
                        assertList = els[System.Array.index(0, els)];
                    }

                    var testTitle = testItem.firstChild;

                    qunitSourceName.insertAdjacentHTML("afterbegin", System.String.concat(html, "<br/>"));
                    //testItem.InsertBefore(csSourceName, qunitSourceName);

                    if (assertList != null) {
                        testTitle.addEventListener("click", function () {
                            // A Qunit fix to make source element collapsed the same as assert list
                            Bridge.Test.Runtime.ContextHelper.toggleClass(assertList, "qunit-collapsed", [qunitSourceName]);
                        }, false);
                    }

                    return qunitSourceName;
                }

                return null;
            },
            getTestSource: function (output) {
                if (output == null) {
                    return null;
                }

                var source = output.getElementsByClassName("test-source");

                if (source == null || source.length <= 0) {
                    return null;
                }

                return source[System.Array.index(0, source)];
            },
            getTestSource$1: function (testId) {
                var output = Bridge.Test.Runtime.ContextHelper.getTestOutput(testId);

                return Bridge.Test.Runtime.ContextHelper.getTestSource(output);
            },
            updateTestSource: function (testSource, stack) {
                if (testSource != null) {
                    testSource.innerHTML = System.String.concat("<th>Source: </th><td><pre> ", stack, "  </pre></td>");
                }
            },
            adjustTags: function (s) {
                if (s == null) {
                    return null;
                }

                return System.String.replaceAll(System.String.replaceAll(s, "<", "&lt;"), ">", "&gt;");
            },
            hasClass: function (el, name) {
                return System.String.indexOf((System.String.concat(" ", el.className, " ")), System.String.concat(" ", name, " ")) >= 0;
            },
            addClass: function (el, name) {
                if (!Bridge.Test.Runtime.ContextHelper.hasClass(el, name)) {
                    el.className = System.String.concat(el.className, (System.String.concat((el.className != null ? " " : ""), name)));
                }
            },
            removeClass: function (el, name) {
                var set = System.String.concat(" ", el.className, " ");

                while (System.String.indexOf(set, System.String.concat(" ", name, " ")) >= 0) {
                    set = System.String.replaceAll(set, System.String.concat(" ", name, " "), " ");
                }

                el.className = set.trim();
            },
            toggleClass$1: function (el, name, force) {
                if (force === void 0) { force = false; }
                if (force || !Bridge.Test.Runtime.ContextHelper.hasClass(el, name)) {
                    Bridge.Test.Runtime.ContextHelper.addClass(el, name);
                } else {
                    Bridge.Test.Runtime.ContextHelper.removeClass(el, name);
                }
            },
            toggleClass: function (src, name, dest) {
                var $t;
                if (dest === void 0) { dest = []; }
                if (src == null) {
                    return;
                }

                var has = Bridge.Test.Runtime.ContextHelper.hasClass(src, name);

                $t = Bridge.getEnumerator(dest);
                try {
                    while ($t.moveNext()) {
                        var el = $t.Current;
                        if (has) {
                            Bridge.Test.Runtime.ContextHelper.addClass(el, name);
                        } else {
                            Bridge.Test.Runtime.ContextHelper.removeClass(el, name);
                        }

                    }
                }finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }},
            init: function () {
                // Check that required elements exist and created if required
                var ensure = $asm.$.Bridge.Test.Runtime.ContextHelper.f1;

                ensure("qunit-fixture");
                ensure("qunit");
            }
        }
    });

    Bridge.ns("Bridge.Test.Runtime.ContextHelper", $asm.$);

    Bridge.apply($asm.$.Bridge.Test.Runtime.ContextHelper, {
        f1: function (n) {
            var fx = document.getElementById(n);
            if (fx == null) {
                fx = document.createElement("div");
                fx.id = n;
                document.body.insertBefore(fx, document.body.firstChild);
            }
        }
    });

    Bridge.define("Bridge.Test.Runtime.FixtureContext", {
        project: null,
        className: null,
        file: null
    });

    Bridge.define("Bridge.Test.NUnit.Assert", {
        statics: {
            assert: null,
            stackOffset: 2,
            setStack: function (offset) {
                if (offset === void 0) { offset = 0; }
                var ctx = Bridge.Test.Runtime.ContextHelper.getContext$1(Bridge.Test.NUnit.Assert.assert);

                if (ctx == null) {
                    return;
                }

                ctx.stack = QUnit.stack(((Bridge.Test.NUnit.Assert.stackOffset + offset) | 0));
            },
            async: function () {
                return Bridge.Test.NUnit.Assert.assert.async();
            },
            areEqual: function (expected, actual) {
                Bridge.Test.NUnit.Assert.setStack();
                Bridge.Test.NUnit.Assert.assert.deepEqual(Bridge.unbox(actual), Bridge.unbox(expected));
            },
            areEqual$1: function (expected, actual, description) {
                Bridge.Test.NUnit.Assert.setStack();
                Bridge.Test.NUnit.Assert.assert.deepEqual(Bridge.unbox(actual), Bridge.unbox(expected), description);
            },
            areDeepEqual: function (expected, actual) {
                Bridge.Test.NUnit.Assert.setStack();
                Bridge.Test.NUnit.Assert.assert.deepEqual(Bridge.unbox(actual), Bridge.unbox(expected));
            },
            areDeepEqual$1: function (expected, actual, description) {
                Bridge.Test.NUnit.Assert.setStack();
                Bridge.Test.NUnit.Assert.assert.deepEqual(Bridge.unbox(actual), Bridge.unbox(expected), description);
            },
            areStrictEqual: function (expected, actual) {
                Bridge.Test.NUnit.Assert.setStack();
                Bridge.Test.NUnit.Assert.assert.strictEqual(Bridge.unbox(actual), Bridge.unbox(expected));
            },
            areStrictEqual$1: function (expected, actual, description) {
                Bridge.Test.NUnit.Assert.setStack();
                Bridge.Test.NUnit.Assert.assert.strictEqual(Bridge.unbox(actual), Bridge.unbox(expected), description);
            },
            areNotEqual: function (expected, actual) {
                Bridge.Test.NUnit.Assert.setStack();
                Bridge.Test.NUnit.Assert.assert.notDeepEqual(Bridge.unbox(actual), Bridge.unbox(expected));
            },
            areNotEqual$1: function (expected, actual, description) {
                Bridge.Test.NUnit.Assert.setStack();
                Bridge.Test.NUnit.Assert.assert.notDeepEqual(Bridge.unbox(actual), Bridge.unbox(expected), description);
            },
            areNotDeepEqual: function (expected, actual) {
                Bridge.Test.NUnit.Assert.setStack();
                Bridge.Test.NUnit.Assert.assert.notDeepEqual(Bridge.unbox(actual), Bridge.unbox(expected));
            },
            areNotDeepEqual$1: function (expected, actual, description) {
                Bridge.Test.NUnit.Assert.setStack();
                Bridge.Test.NUnit.Assert.assert.notDeepEqual(Bridge.unbox(actual), Bridge.unbox(expected), description);
            },
            areNotStrictEqual: function (expected, actual) {
                Bridge.Test.NUnit.Assert.setStack();
                Bridge.Test.NUnit.Assert.assert.notStrictEqual(Bridge.unbox(actual), Bridge.unbox(expected));
            },
            areNotStrictEqual$1: function (expected, actual, description) {
                Bridge.Test.NUnit.Assert.setStack();
                Bridge.Test.NUnit.Assert.assert.notStrictEqual(Bridge.unbox(actual), Bridge.unbox(expected), description);
            },
            true: function (condition) {
                Bridge.Test.NUnit.Assert.setStack();
                Bridge.Test.NUnit.Assert.assert.ok(condition);
            },
            true$1: function (condition, message) {
                Bridge.Test.NUnit.Assert.setStack();
                Bridge.Test.NUnit.Assert.assert.ok(condition, message);
            },
            false: function (condition) {
                Bridge.Test.NUnit.Assert.setStack();
                Bridge.Test.NUnit.Assert.assert.notOk(condition);
            },
            false$1: function (condition, message) {
                Bridge.Test.NUnit.Assert.setStack();
                Bridge.Test.NUnit.Assert.assert.notOk(condition, message);
            },
            fail: function () {
                Bridge.Test.NUnit.Assert.setStack();
                Bridge.Test.NUnit.Assert.assert.ok(false);
            },
            fail$1: function (message) {
                Bridge.Test.NUnit.Assert.setStack();
                Bridge.Test.NUnit.Assert.assert.notOk(true, message);
            },
            throws: function (block) {
                Bridge.Test.NUnit.Assert.setStack();
                Bridge.Test.NUnit.Assert.assert.throws(block, "");
            },
            throws$5: function (block, message) {
                Bridge.Test.NUnit.Assert.setStack();
                Bridge.Test.NUnit.Assert.assert.throws(block, message);
            },
            throws$6: function (T, block) {
                Bridge.Test.NUnit.Assert.throws$7(T, block, "", 1);
            },
            throws$7: function (T, block, message, stackOffset) {
                if (stackOffset === void 0) { stackOffset = 0; }
                var actual = null;
                var expected = Bridge.Reflection.getTypeFullName(T);

                try {
                    block();
                }
                catch (ex) {
                    ex = System.Exception.create(ex);
                    actual = Bridge.Reflection.getTypeFullName(Bridge.getType(ex));
                }

                Bridge.Test.NUnit.Assert.setStack(stackOffset);

                if (!Bridge.referenceEquals(actual, expected)) {
                    Bridge.Test.NUnit.Assert.assert.equal(actual, expected, message);
                } else {
                    Bridge.Test.NUnit.Assert.assert.ok(true, message);
                }
            },
            throws$3: function (block, expected) {
                Bridge.Test.NUnit.Assert.setStack();
                Bridge.Test.NUnit.Assert.assert.throws(block, Bridge.unbox(expected));
            },
            throws$4: function (block, expected, message) {
                Bridge.Test.NUnit.Assert.setStack();
                Bridge.Test.NUnit.Assert.assert.throws(block, Bridge.unbox(expected), message);
            },
            throws$1: function (block, expected) {
                Bridge.Test.NUnit.Assert.setStack();
                Bridge.Test.NUnit.Assert.assert.throws(block, expected);
            },
            throws$2: function (block, expected, message) {
                Bridge.Test.NUnit.Assert.setStack();
                Bridge.Test.NUnit.Assert.assert.throws(block, expected, message);
            },
            null: function (anObject) {
                Bridge.Test.NUnit.Assert.setStack();
                Bridge.Test.NUnit.Assert.assert.ok(anObject == null);
            },
            null$1: function (anObject, message) {
                Bridge.Test.NUnit.Assert.setStack();
                Bridge.Test.NUnit.Assert.assert.ok(anObject == null, message);
            },
            notNull: function (anObject) {
                Bridge.Test.NUnit.Assert.setStack();
                Bridge.Test.NUnit.Assert.assert.notOk(anObject == null);
            },
            notNull$1: function (anObject, message) {
                Bridge.Test.NUnit.Assert.setStack();
                Bridge.Test.NUnit.Assert.assert.notOk(anObject == null, message);
            }
        }
    });

    Bridge.define("Bridge.Test.Runtime.TestContext", {
        file: null,
        method: null,
        line: null
    });
});

QUnit.testDone(function (details) {
        // It will add a UI elements to show CS source for the Test (If CS source data found in the context)

        //if (details.Failed <= 0)
        //{
        //    return;
        //}

        var ctx = Bridge.Test.Runtime.ContextHelper.getContext();

        if (ctx == null || (ctx.testCtx == null && ctx.fixtureCtx == null)) {
            return;
        }

        var testId = Bridge.Test.Runtime.ContextHelper.getTestId(details);

        if (testId == null) {
            return;
        }

        var testItem = Bridge.Test.Runtime.ContextHelper.getTestOutput(testId);

        if (testItem != null) {
            Bridge.Test.Runtime.ContextHelper.adjustSourceElement(ctx, testItem);
        }
    });
QUnit.log(function (details) {
        // It will update a UI elements to show test source (JS) for the assertion (If the JS source (Stack) data found in the context)

        var ctx = Bridge.Test.Runtime.ContextHelper.getContext();

        if (ctx == null || ctx.stack == null) {
            return;
        }

        var testId = Bridge.Test.Runtime.ContextHelper.getTestId(details);

        var source = Bridge.Test.Runtime.ContextHelper.getTestSource$1(testId);

        Bridge.Test.Runtime.ContextHelper.updateTestSource(source, ctx.stack);
    });

/*
 * @version   : 1.0.0 - Aspect Bridge.NET
 * @author    : Object.NET, Inc. http://www.bridge.net/
 * @date      : 2016-06-17
 * @copyright : Copyright (c) 2008-2016, Object.NET, Inc. (http://www.object.net/). All rights reserved.
 * @license   : See license.txt and https://github.com/bridgedotnet/Bridge.NET/blob/master/LICENSE.
 */

﻿Bridge.define('Bridge.Aspect.AspectAttribute', {
    inherits: [System.Attribute]
});

Bridge.define('Bridge.Aspect.MulticastAspectAttribute', {
    inherits: [Bridge.Aspect.AspectAttribute]
});
﻿Bridge.define('Bridge.Aspect.AbstractMethodAspectAttribute', {
    inherits: [Bridge.Aspect.MulticastAspectAttribute],

    $$setAspect: Bridge.emptyFn,

    init: function (methodName, scope) {
        this.methodName = methodName;
        this.scope = scope;
        this.targetMethod = this.scope[this.methodName];

        if (!this.runTimeValidate(methodName, scope)) {
            return;
        }

        this.scope.$$aspects = this.scope.$$aspects || {};
        if (!this.scope.$$aspects[this.$$name]) {
            this.scope.$$aspects[this.$$name] = [];
        }
        this.scope.$$aspects[this.$$name].push(this);        

        this.$$setAspect();
    },

    remove: function () {
        var i,
            aspects = this.scope.$$aspects[this.$$name];

        this.scope[this.methodName] = this.targetMethod;

        for (i = aspects.length - 1; i >= 0; i--) {
            if (aspects[i] === this) {
                aspects.splice(i, 1);
                return;
            }
        }
    },

    runTimeValidate: function () {
        return true;
    },

    proceed: function(args) {
        return this.targetMethod.apply(this.scope, args || []);
    }
});

Bridge.define('Bridge.Aspect.MethodAspectAttribute', {
    inherits: [Bridge.Aspect.AbstractMethodAspectAttribute],

    onEntry: Bridge.emptyFn,
    onExit: Bridge.emptyFn,
    onSuccess: Bridge.emptyFn,
    onException: Bridge.emptyFn,

    proceedArgs: function() {
        this.returnValue = this.sender.proceed(this.arguments);
        return this.returnValue;
    },

    invokeArgs: function () {
        return this.sender.proceed(this.arguments);
    },

    $$setAspect: function () {
        var me = this,
            fn = function () {
                var methodArgs = {
                        sender: me,
                        arguments: arguments,
                        methodName: me.methodName,
                        scope: me.scope,
                        exception: null,
                        flow: 0,
                        tag: null,
                        proceed: me.proceedArgs,
                        invoke: me.invokeArgs
                    },                    
                    catchException;

                me.onEntry(methodArgs);

                if (methodArgs.flow == 3) {
                    return methodArgs.returnValue;
                }

                try {
                    methodArgs.proceed();

                    me.onSuccess(methodArgs);

                    if (methodArgs.flow == 3) {
                        return methodArgs.returnValue;
                    }
                }
                catch (e) {
                    methodArgs.exception = System.Exception.create(e);

                    catchException = me.$$exceptionTypes.length == 0;
                    if (me.$$exceptionTypes.length > 0) {
                        for (var i = 0; i < me.$$exceptionTypes.length; i++) {
                            if (Bridge.is(methodArgs.exception, me.$$exceptionTypes[i])) {
                                catchException = true;
                                break;
                            }
                        }
                    }

                    if (catchException) {
                        me.onException(methodArgs);
                    }                    

                    if (methodArgs.flow == 3) {
                        return methodArgs.returnValue;
                    }

                    if (methodArgs.flow == 2 || methodArgs.flow == 0) {
                        throw e;
                    }
                }
                finally {
                    me.onExit(methodArgs);
                }

                return methodArgs.returnValue;
            };

        this.$$exceptionTypes = this.getExceptionsTypes(this.methodName, this.scope) || [];
        this.scope[this.methodName] = fn;
    },    

    getExceptionsTypes: function () {
        return [];
    }    
});

Bridge.define('Bridge.Aspect.BufferedMethodAttribute', {
    inherits: [Bridge.Aspect.AbstractMethodAspectAttribute],

    constructor: function (buffer) {
        this.$initialize();
        this.buffer = buffer;
    },

    $$setAspect: function () {
        var me = this,
            timeoutId,
            fn = function () {
                var args = Array.prototype.slice.call(arguments, 0);

                if (timeoutId) {
                    clearTimeout(timeoutId);
                }

                timeoutId = setTimeout(function () {
                    me.targetMethod.apply(me.scope, args);
                }, me.buffer);
            };

        this.scope[this.methodName] = fn;
    }
});

Bridge.define('Bridge.Aspect.BarrierMethodAttribute', {
    inherits: [Bridge.Aspect.AbstractMethodAspectAttribute],

    constructor: function (count) {
        this.count = count;
    },

    $$setAspect: function () {
        var me = this,
            fn = function () {
                if (!--me.count) {
                    me.targetMethod.apply(me.scope, arguments);
                }
            };

        this.scope[this.methodName] = fn;
    }
});

Bridge.define('Bridge.Aspect.DelayedMethodAttribute', {
    inherits: [Bridge.Aspect.AbstractMethodAspectAttribute],

    constructor: function (delay) {
        this.delay = delay;
    },

    $$setAspect: function () {
        var me = this,
            fn = function () {
                var args = Array.prototype.slice.call(arguments);

                setTimeout(function () {
                    me.targetMethod.apply(me.scope, args);
                }, me.delay);
            };

        this.scope[this.methodName] = fn;
    }
});

Bridge.define('Bridge.Aspect.ThrottledMethodAttribute', {
    inherits: [Bridge.Aspect.AbstractMethodAspectAttribute],

    constructor: function (interval) {
        this.interval = interval;
    },

    $$setAspect: function () {
        var me = this,
            lastCallTime = 0,
            elapsed,
            lastArgs,
            timer,
            execute = function () {
                me.targetMethod.apply(me.scope, lastArgs);
                lastCallTime = +new Date();
                timer = null;
            };

        this.scope[this.methodName] =  function () {
            elapsed = +new Date() - lastCallTime;
            lastArgs = arguments;
            if (elapsed >= me.interval) {
                clearTimeout(timer);
                execute();
            }
            else if (!timer) {
                timer = setTimeout(execute, me.interval - elapsed);
            }
        };        
    }
});
﻿Bridge.define('Bridge.Aspect.PropertyAspectAttribute', {
    inherits: [Bridge.Aspect.MulticastAspectAttribute],

    onGetValue: Bridge.emptyFn,
    onSetValue: Bridge.emptyFn,
    onSuccess: Bridge.emptyFn,
    onException: Bridge.emptyFn,

    init: function (propertyName, scope, names) {
        this.propertyName = propertyName;
        this.scope = scope;

        this.getterName = "get" + this.propertyName;
        this.setterName = "set" + this.propertyName;

        if (names) {
            this.getterName = names.getter || this.getterName;
            this.setterName = names.setter || this.setterName;
        }

        this.getter = this.scope[this.getterName];
        this.setter = this.scope[this.setterName];

        if (!this.runTimeValidate(propertyName, scope)) {
            return;
        }

        this.scope.$$aspects = this.scope.$$aspects || {};
        if (!this.scope.$$aspects[this.$$name]) {
            this.scope.$$aspects[this.$$name] = [];
        }
        this.scope.$$aspects[this.$$name].push(this);
        this.$$exceptionTypes = this.getExceptionsTypes(propertyName, scope) || [];

        this.$$setAspect();
    },

    $$setAspect: function () {
        var fn = function (me, isGetter) {
                return function (value) {
                    var methodArgs = {
                            value: value,
                            propertyName: me.propertyName,
                            scope: me.scope,
                            exception: null,
                            flow: 0,
                            isGetter: isGetter
                        },                    
                        catchException;

                    if (isGetter) {
                        me.onGetValue(methodArgs);
                    }
                    else {
                        me.onSetValue(methodArgs);
                    }

                    if (methodArgs.flow == 3) {
                        return isGetter ? methodArgs.value : undefined;
                    }

                    try {
                        if (isGetter) {
                            methodArgs.value = me.getter.call(me.scope);
                        }
                        else {
                            me.setter.call(me.scope, methodArgs.value);
                        }

                        me.onSuccess(methodArgs);
                    }
                    catch (e) {
                        methodArgs.exception = System.Exception.create(e);

                        catchException = me.$$exceptionTypes.length == 0;
                        if (me.$$exceptionTypes.length > 0) {
                            for (var i = 0; i < me.$$exceptionTypes.length; i++) {
                                if (Bridge.is(methodArgs.exception, me.$$exceptionTypes[i])) {
                                    catchException = true;
                                    break;
                                }
                            }
                        }

                        if (catchException) {
                            me.onException(methodArgs);
                        }                    

                        if (methodArgs.flow == 3) {
                            return isGetter ? methodArgs.value : undefined;
                        }

                        if (methodArgs.flow == 2 || methodArgs.flow == 0) {
                            throw e;
                        }
                    }

                    return isGetter ? methodArgs.value : undefined;
                };
            };

        this.$constructorAccessors(fn);
    },

    $constructorAccessors: function (fn) {
        if (this.getter) {
            this.scope[this.getterName] = fn(this, true);
        }

        if (this.setter) {
            this.scope[this.setterName] = fn(this, false);
        }
    },

    remove: function () {
        var i,
            aspects = this.scope.$$aspects[this.$$name];

        this.scope[this.getterName] = this.getter;
        this.scope[this.setterName] = this.setter;
        
        for (i = aspects.length - 1; i >= 0; i--) {
            if (aspects[i] === this) {
                aspects.splice(i, 1);
                return;
            }
        }
    },

    getExceptionsTypes: function () {
        return [];
    },

    runTimeValidate: function () {
        return true;
    }
});
﻿Bridge.define('Bridge.Aspect.FieldAspectAttribute', {
    inherits: [Bridge.Aspect.MulticastAspectAttribute],

    onGetValue: Bridge.emptyFn,
    onSetValue: Bridge.emptyFn,

    init: function (fieldName, scope) {
        this.fieldName = fieldName;
        this.scope = scope;

        if (!this.runTimeValidate(fieldName, scope)) {
            return;
        }

        this.scope.$$aspects = this.scope.$$aspects || {};
        if (!this.scope.$$aspects[this.$$name]) {
            this.scope.$$aspects[this.$$name] = [];
        }
        this.scope.$$aspects[this.$$name].push(this);

        this.$$setAspect();
    },

    $$setAspect: function () {
        var me = this;
        me.fieldValue = this.scope[this.fieldName];

        Object.defineProperty(this.scope, this.fieldName, {
            get: function () {
                var fieldArgs = {
                    value: me.fieldValue,
                    fieldName: me.fieldName,
                    scope: me.scope,
                    isGetter: true
                };

                me.onGetValue(fieldArgs);

                if (fieldArgs.update === true) {
                    me.fieldValue = fieldArgs.value;
                }

                return fieldArgs.value;
            },
            set: function (newValue) {
                var fieldArgs = {
                    oldValue: me.fieldValue,
                    value: newValue,
                    fieldName: me.fieldName,
                    scope: me.scope,
                    isGetter: false
                };

                me.onSetValue(fieldArgs);

                if (fieldArgs.update === false) {
                    return;
                }

                me.fieldValue = fieldArgs.value;
            },
            enumerable: true,
            configurable: true
        });
    },

    remove: function () {
        var i,
            aspects = this.scope.$$aspects[this.$$name];

        delete this.scope[this.fieldName];
        this.scope[this.fieldName] = this.fieldValue;
        
        for (i = aspects.length - 1; i >= 0; i--) {
            if (aspects[i] === this) {
                aspects.splice(i, 1);
                return;
            }
        }
    },

    runTimeValidate: function () {
        return true;
    }
});
﻿Bridge.define('Bridge.Aspect.TypeAspectAttribute', {
    inherits: [Bridge.Aspect.MulticastAspectAttribute],

    onBeforeInstance: Bridge.emptyFn,
    onAfterInstance: Bridge.emptyFn,
    onException: Bridge.emptyFn,

    init: function (instance, args, body) {
        this.instance = instance;
        this.typeName = instance.$$name;
        this.arguments = args;
        this.body = body;

        if (!this.runTimeValidate(instance)) {
            return;
        }

        this.instance.$$aspects = this.instance.$$aspects || {};
        if (!this.instance.$$aspects[this.$$name]) {
            this.instance.$$aspects[this.$$name] = [];
        }
        this.instance.$$aspects[this.$$name].push(this);
        this.$$setAspect();

        return this;
    },

    $$setAspect: function () {
        var me = this;
        this.$$exceptionTypes = this.getExceptionsTypes(this.instance, this.typeName) || [];

        var args = {
            instance: me.instance,
            typeName: me.typeName,
            arguments: this.arguments,
            tag: null
        };

        me.onBeforeInstance(args);

        try {
            me.body.apply(me.instance, args.arguments);
        }
        catch (e) {
            args.exception = System.Exception.create(e);

            var catchException = me.$$exceptionTypes.length == 0;
            if (me.$$exceptionTypes.length > 0) {
                for (var i = 0; i < me.$$exceptionTypes.length; i++) {
                    if (Bridge.is(args.exception, me.$$exceptionTypes[i])) {
                        catchException = true;
                        break;
                    }
                }
            }

            if (catchException) {
                me.onException(args);
            }

            throw e;
        }
        finally {
            me.onAfterInstance(args);
        }
    },

    getExceptionsTypes: function () {
        return [];
    },

    runTimeValidate: function () {
        return true;
    }
});
﻿Bridge.define('Bridge.Aspect.NotifyPropertyChangedAttribute', {
    inherits: [Bridge.Aspect.MulticastAspectAttribute],

    statics: {
        globalSuspendCounter: 0,

        resumeEvents: function (instance) {
            if (Bridge.isDefined(instance, true)) {
                var a = instance.$$aspects;
                if (a && Bridge.isDefined(a.$$notifyPropertySuspendCounter)) {
                    a.$$notifyPropertySuspendCounter--;
                }
            }
            else {
                this.globalSuspendCounter--;
            }
        },

        suspendEvents: function (instance) {
            if (Bridge.isDefined(instance, true)) {
                var a = instance.$$aspects;
                if (a && Bridge.isDefined(a.$$notifyPropertySuspendCounter)) {
                    a.$$notifyPropertySuspendCounter++;
                }
            }
            else {
                this.globalSuspendCounter++;
            }
        },

        raiseEvents: function (instance) {
            if (instance && instance.$$aspects) {
                var i,
                    aspects = instance.$$aspects[this.$$name];

                for (i = 0; i < aspects.length; i++) {
                    aspects[i].raiseEvent();
                }
            }
        }
    },

    config: {
        fields: {
            raiseOnChange: true
        }
    },

    init: function (propertyName, scope, cfg) {
        this.propertyName = propertyName;
        this.scope = scope;

        this.getterName = "get" + this.propertyName;
        this.setterName = "set" + this.propertyName;

        this.getter = this.scope[this.getterName];
        this.setter = this.scope[this.setterName];

        if (!this.runTimeValidate(propertyName, scope)) {
            return;
        }

        if (cfg) {
            this.getterName = cfg.getter || this.getterName;
            this.setterName = cfg.setter || this.setterName;

            if (cfg.dependency) {
                for (var i = 0; i < cfg.dependency.length; i++) {
                    var d = cfg.dependency[i],
                        isField = System.String.startsWith(d, "field:"),
                        name = d.split(":")[1];

                    if (isField) {
                        this.createFieldDependency(name);
                    } else {
                        this.createPropDependency(name);
                    }
                }
            }
        }

        this.scope.$$aspects = this.scope.$$aspects || {};
        if (!this.scope.$$aspects[this.$$name]) {
            this.scope.$$aspects[this.$$name] = [];
        }
        this.scope.$$aspects[this.$$name].push(this);

        if (!Bridge.isDefined(this.scope.$$aspects.$$notifyPropertySuspendCounter)) {
            this.scope.$$aspects.$$notifyPropertySuspendCounter = 0;
        }

        this.$$setAspect();
    },

    createFieldDependency: function (name) {
        var field = this.scope[name],
            me = this;
        Object.defineProperty(this.scope, name, {
            get: function () {
                return field;
            },
            set: function (newValue) {
                var neq = !Bridge.equals(field, newValue);
                field = newValue;

                var args = {
                    value: null,
                    propertyName: me.propertyName,
                    scope: me.scope,
                    flow: 0,
                    raise: neq,
                    isDependency: true,
                    force: false
                };

                me.onSetValue(args);
            },
            enumerable: true,
            configurable: true
        });
    },

    createPropDependency: function (name) {
        var parts = name.split("+"),
            getterName = parts[0],
            setterName = parts[1],
            getter = this.scope[getterName],
            setter = this.scope[setterName],
            me = this;

        this.scope[setterName] = function (newValue) {
            var neq = !Bridge.equals(getter.call(me.scope), newValue);
            setter.call(me.scope, newValue);

            var args = {
                value: null,
                propertyName: me.propertyName,
                scope: me.scope,
                flow: 0,
                raise: neq,
                isDependency: true,
                force: false
            };

            me.onSetValue(args);
        };
    },

    $$setAspect: function () {        
        if (this.setter) {
            var me = this;
            this.scope[this.setterName] = function (value) {
                var args = {
                    value: value,
                    propertyName: me.propertyName,
                    scope: me.scope,
                    flow: 0,
                    force: false
                };

                if (me.raiseOnChange) {
                    args.lastValue = me.getter.call(me.scope);
                }

                me.setter.call(me.scope, args.value);
                me.onSetValue(args);                
            };
        }
    },

    beforeEvent: Bridge.emptyFn,

    onSetValue: function (args) {
        this.beforeEvent(args);

        if (args.flow === 3) {
            return;
        }

        if (args.flow !== 1) {
            if (Bridge.Aspect.NotifyPropertyChangedAttribute.globalSuspendCounter) {
                return;
            }
            
            if (this.scope.$$aspects.$$notifyPropertySuspendCounter) {
                return;
            }
        }

        var raise = true;
        if (this.raiseOnChange) {
            if (args.isDependency) {
                raise = args.raise;
            } else {
                raise = !Bridge.equals(args.value, args.lastValue);
            }
        }
        
        if (raise) {
            if (this.scope.onPropertyChanged) {
                this.scope.onPropertyChanged(args.propertyName, args.value, args.lastValue);
            }
            else if (this.scope.propertyChanged) {
                this.scope.propertyChanged(this.scope, { propertyName: args.propertyName, newValue: args.value, oldValue: args.lastValue });
            }
        }
    },

    raiseEvent: function () {
        var args = {
            propertyName: this.propertyName,
            scope: this.scope,
            flow: 0,
            force: true,
            value: null
        };
        
        this.beforeEvent(args);

        if (args.flow === 3) {
            return;
        }

        if (this.scope.onPropertyChanged) {
            this.scope.onPropertyChanged(args.propertyName, args.value, args.lastValue);
        }
        else if (this.scope.propertyChanged) {
            this.scope.propertyChanged(this.scope, { propertyName: args.propertyName, newValue: args.value, oldValue: args.lastValue });
        }
    },

    runTimeValidate: function () {
        return true;
    }
});
﻿Bridge.define('Bridge.Aspect.ParameterAspectAttribute', {
    inherits: [Bridge.Aspect.MulticastAspectAttribute],

    init: function (argName, argIndex, argType, methodName, scope) {
        this.parameterName = argName;
        this.parameterIndex = argIndex;
        this.parameterType = argType;
        this.methodName = methodName;
        this.scope = scope;
        this.targetMethod = this.scope[this.methodName];

        if (!this.runTimeValidate(argName, argIndex, argType, methodName, scope)) {
            return;
        }

        this.scope.$$aspects = this.scope.$$aspects || {};
        if (!this.scope.$$aspects[this.$$name]) {
            this.scope.$$aspects[this.$$name] = [];
        }
        this.scope.$$aspects[this.$$name].push(this);

        this.$$setAspect();
    },

    remove: function () {
        var i,
            aspects = this.scope.$$aspects[this.$$name];

        this.scope[this.methodName] = this.targetMethod;

        for (i = aspects.length - 1; i >= 0; i--) {
            if (aspects[i] === this) {
                aspects.splice(i, 1);
                return;
            }
        }
    },

    runTimeValidate: function () {
        return true;
    },

    parameterValidate: Bridge.emptyFn,

    $$setAspect: function () {
        var me = this,
            fn = function () {
                var args = Array.prototype.slice.call(arguments, 0),
                    valArg = {
                        parameterIndex: me.parameterIndex,
                        parameterType: me.parameterType,
                        parameterName: me.parameterName,
                        parameter: args[me.parameterIndex],
                        methodName: me.methodName,
                        scope: me.scope
                    };

                me.parameterValidate(valArg);
                args[me.parameter] = valArg.parameter;
                return me.targetMethod.apply(me.scope, args);
            };

        this.scope[this.methodName] = fn;
    }
});

Bridge.define('Bridge.Aspect.ParameterContractAspectAttribute', {
    inherits: [Bridge.Aspect.ParameterAspectAttribute],

    parameterValidate: function (arg) {
        if (this.validate(arg) === false) {
            throw this.createException(arg);
        }
    },

    createException: function (arg) {
        return new System.ArgumentException(this.getMessage(arg), arg.parameterName);
    },

    getMessage: function(arg) {
        return System.String.format(this.message, arg.parameterName, arg.parameter);
    },

    validate: Bridge.emptyFn,
    message: "Parameter '{0}' has invalid value: {1}"
});

Bridge.define('Bridge.Aspect.CreditCardAttribute', {
    inherits: [Bridge.Aspect.ParameterContractAspectAttribute],

    constructor: function (type) {
        this.$initialize();
        this.type = type;
    },

    validate: function (arg) {
        return Bridge.Validation.isNull(arg.parameter) || Bridge.Validation.creditCard(arg.parameter, this.type);
    }
});

Bridge.define('Bridge.Aspect.EmailAttribute', {
    inherits: [Bridge.Aspect.ParameterContractAspectAttribute],

    validate: function (arg) {
        return Bridge.Validation.isNull(arg.parameter) || Bridge.Validation.email(arg.parameter);
    }
});

Bridge.define('Bridge.Aspect.UrlAttribute', {
    inherits: [Bridge.Aspect.ParameterContractAspectAttribute],

    validate: function (arg) {
        return Bridge.Validation.isNull(arg.parameter) || Bridge.Validation.url(arg.parameter);
    }
});

Bridge.define('Bridge.Aspect.GreaterThanAttribute', {
    inherits: [Bridge.Aspect.ParameterContractAspectAttribute],

    constructor: function (min, strict) {
        this.$initialize();
        this.min = min;
        this.strict = strict;
    },

    createException: function (arg) {
        return new System.ArgumentOutOfRangeException(arg.parameterName, this.getMessage(arg), null, arg.parameter);
    },

    validate: function (arg) {
        var parameter = arg.parameter;
        if (parameter instanceof System.Int64 || parameter instanceof System.UInt64 || parameter instanceof System.Decimal) {
            return this.strict !== false ? parameter.gt(this.min) : parameter.gte(this.min);
        }
        return this.strict !== false ? parameter > this.min : parameter >= this.min;
    }
});

Bridge.define('Bridge.Aspect.LessThanAttribute', {
    inherits: [Bridge.Aspect.ParameterContractAspectAttribute],

    constructor: function (max, strict) {
        this.$initialize();
        this.max = max;
        this.strict = strict;
    },

    createException: function (arg) {
        return new System.ArgumentOutOfRangeException(arg.parameterName, this.getMessage(arg), null, arg.parameter);
    },

    validate: function (arg) {
        var parameter = arg.parameter;
        if (parameter instanceof System.Int64 || parameter instanceof System.UInt64 || parameter instanceof System.Decimal) {
            return this.strict !== false ? parameter.lt(this.max) : parameter.lte(this.max);
        }
        return this.strict !== false ? parameter < this.max : parameter <= this.max;
    }
});

Bridge.define('Bridge.Aspect.NotEmptyAttribute', {
    inherits: [Bridge.Aspect.ParameterContractAspectAttribute],

    createException: function (arg) {
        return new System.ArgumentNullException(arg.parameterName, this.getMessage(arg));
    },

    validate: function (arg) {
        return Bridge.Validation.isNotEmpty(arg.parameter);
    }
});

Bridge.define('Bridge.Aspect.NotNullAttribute', {
    inherits: [Bridge.Aspect.ParameterContractAspectAttribute],

    createException: function (arg) {
        return new System.ArgumentNullException(arg.parameterName, this.getMessage(arg));
    },

    validate: function (arg) {
        return Bridge.Validation.isNotNull(arg.parameter);
    }
});

Bridge.define('Bridge.Aspect.PositiveAttribute', {
    inherits: [Bridge.Aspect.ParameterContractAspectAttribute],

    createException: function (arg) {
        return new System.ArgumentOutOfRangeException(arg.parameterName, this.getMessage(arg), null, arg.parameter);
    },

    validate: function (arg) {
        var parameter = arg.parameter;
        if (parameter instanceof System.Int64 || parameter instanceof System.UInt64 || parameter instanceof System.Decimal) {
            return parameter.gte(0);
        }
        return parameter >= 0;
    }
});

Bridge.define('Bridge.Aspect.NegativeAttribute', {
    inherits: [Bridge.Aspect.ParameterContractAspectAttribute],

    createException: function (arg) {
        return new System.ArgumentOutOfRangeException(arg.parameterName, this.getMessage(arg), null, arg.parameter);
    },

    validate: function (arg) {
        var parameter = arg.parameter;
        if (parameter instanceof System.Int64 || parameter instanceof System.UInt64 || parameter instanceof System.Decimal) {
            return parameter.lt(0);
        }
        return parameter < 0;
    }
});

Bridge.define('Bridge.Aspect.RangeAttribute', {
    inherits: [Bridge.Aspect.ParameterContractAspectAttribute],

    constructor: function (min, max, strict) {
        this.$initialize();
        this.min = min;
        this.max = max;
        this.strict = strict;
    },

    createException: function (arg) {
        return new System.ArgumentOutOfRangeException(arg.parameterName, this.getMessage(arg), null, arg.parameter);
    },

    validate: function (arg) {
        var parameter = arg.parameter;
        if (parameter instanceof System.Int64 || parameter instanceof System.UInt64 || parameter instanceof System.Decimal) {
            if (this.strict === false) {
                return parameter.lte(this.max) && parameter.gte(this.min);
            }
            return parameter.lt(this.max) && parameter.gt(this.min);
        }

        if (this.strict === false) {
            return parameter <= this.max && parameter >= this.min;
        }
        return parameter < this.max && parameter > this.min;
    }
});

Bridge.define('Bridge.Aspect.RequiredAttribute', {
    inherits: [Bridge.Aspect.ParameterContractAspectAttribute],

    createException: function (arg) {
        return new System.ArgumentNullException(arg.parameterName, this.getMessage(arg), null);
    },

    validate: function (arg) {
        return Bridge.Validation.isNotEmptyOrWhitespace(arg.parameter);
    }
});

Bridge.define('Bridge.Aspect.LengthAttribute', {
    inherits: [Bridge.Aspect.ParameterContractAspectAttribute],

    constructor: function (max, min) {
        this.$initialize();
        this.max = max;
        this.min = min || 0;
    },

    validate: function (arg) {
        return Bridge.Validation.isNull(arg.parameter) || (arg.parameter.length >= this.min && arg.parameter.length <= this.max);
    }
});

Bridge.define('Bridge.Aspect.RegularExpressionAttribute', {
    inherits: [Bridge.Aspect.ParameterContractAspectAttribute],

    constructor: function (pattern, flags) {
        this.$initialize();
        this.regExp = new RegExp(pattern, flags);
    },

    validate: function (arg) {
        return Bridge.Validation.isNull(arg.parameter) || this.regExp.test(arg.parameter);
    }
});

Bridge.define('Bridge.Aspect.ValidatorAttribute', {
    inherits: [Bridge.Aspect.ParameterContractAspectAttribute],

    constructor: function (tp) {
        this.$initialize();
        this.tp = new tp();
    },

    validate: function (arg) {
        return this.tp.validate(arg);
    }
});

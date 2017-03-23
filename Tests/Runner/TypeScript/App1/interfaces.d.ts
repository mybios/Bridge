/// <reference path="./bridge.d.ts" />

declare module Interfaces {
    export interface Class2 extends Interfaces.Class1,Interfaces.Interface2 {
        method1(): void;
        method2(s: string): void;
        method3(): number;
        method4(i: Interfaces.Interface1): boolean;
    }
    export interface Class2Func extends Function {
        prototype: Class2;
        new (): Class2;
    }
    var Class2: Class2Func;

    export interface Class6 extends Interfaces.Interface6 {
        Property: number;
        MethodProperty: number;
        getProperty(): number;
        setProperty$1(s: string): void;
        setProperty(i: number): void;
    }
    export interface Class6Func extends Function {
        prototype: Class6;
        new (): Class6;
    }
    var Class6: Class6Func;

    export interface Class4 extends Interfaces.Interface4 {
        method6(b: {v: boolean}): void;
        method7(i: number, b: {v: boolean}): void;
        method8(s: {v: string}): void;
        method9(i: number, s: {v: string}): void;
        method10(i: number, b: {v: boolean}, s: {v: string}): void;
    }
    export interface Class4Func extends Function {
        prototype: Class4;
        new (): Class4;
    }
    var Class4: Class4Func;

    export interface Interface2 extends Interfaces.Interface1 {
        Interfaces$Interface2$method1(): void;
        method1(): void;
        Interfaces$Interface2$method2(i: string): void;
        method2(i: string): void;
        Interfaces$Interface2$method3(): number;
        method3(): number;
        Interfaces$Interface2$method4(i: Interfaces.Interface1): boolean;
        method4(i: Interfaces.Interface1): boolean;
    }

    export interface Class1 extends Interfaces.Interface1 {
        field: number;
        Property: number;
    }
    export interface Class1Func extends Function {
        prototype: Class1;
        new (): Class1;
    }
    var Class1: Class1Func;

    export interface Interface3 extends Interfaces.Interface2 {
        Interfaces$Interface3$method5(i: Interfaces.Interface3): Interfaces.Interface2;
        method5(i: Interfaces.Interface3): Interfaces.Interface2;
    }

    export interface Class3 extends Interfaces.Class2,Interfaces.Interface3 {
        method5(i: Interfaces.Interface3): Interfaces.Interface2;
    }
    export interface Class3Func extends Function {
        prototype: Class3;
        new (): Class3;
    }
    var Class3: Class3Func;

    export interface Interface1 {
        Interfaces$Interface1$Property: number;
        Property: number;
    }

    export interface Interface4 {
        Interfaces$Interface4$method6(b: {v: boolean}): void;
        method6(b: {v: boolean}): void;
        Interfaces$Interface4$method7(i: number, b: {v: boolean}): void;
        method7(i: number, b: {v: boolean}): void;
        Interfaces$Interface4$method8(s: {v: string}): void;
        method8(s: {v: string}): void;
        Interfaces$Interface4$method9(i: number, s: {v: string}): void;
        method9(i: number, s: {v: string}): void;
        Interfaces$Interface4$method10(i: number, b: {v: boolean}, s: {v: string}): void;
        method10(i: number, b: {v: boolean}, s: {v: string}): void;
    }

    export interface Interface6 {
        Interfaces$Interface6$Property: number;
        Property: number;
        Interfaces$Interface6$getProperty(): number;
        getProperty(): number;
        Interfaces$Interface6$setProperty$1(s: string): void;
        setProperty$1(s: string): void;
        Interfaces$Interface6$setProperty(i: number): void;
        setProperty(i: number): void;
    }

    export interface Interface61 {
        Interfaces$Interface61$Property: number;
        Property: number;
    }

    export interface Interface62 {
        Interfaces$Interface62$getProperty(): number;
        getProperty(): number;
        Interfaces$Interface62$setProperty$1(s: string): void;
        setProperty$1(s: string): void;
        Interfaces$Interface62$setProperty(i: number): void;
        setProperty(i: number): void;
    }

}

/**
 * @compiler Bridge.NET 16.0.0
 */
Bridge.assembly("TestProject", function ($asm, globals) {
    "use strict";

    Bridge.define("TestProject1.ExistsIfTest1Defined");

    Bridge.define("TestProject1.ExistsIfTest2Defined");

    Bridge.define("TestProject1.TestClassA", {
        config: {
            properties: {
                /**
                 * Some property
                 *
                 * @instance
                 * @public
                 * @memberof TestProject1.TestClassA
                 * @function Value1
                 * @type number
                 */
                Value1: 0
            }
        },
        /**
         * GetMyValue method
         *
         * @instance
         * @public
         * @this TestProject1.TestClassA
         * @memberof TestProject1.TestClassA
         * @param   {number}    i    Number of somethng
         * @return  {string}         A good string
         */
        GetMyValue: function (i) {
            return "";
        }
    });

    Bridge.define("TestProject2.TestClassB", {
        config: {
            properties: {
                Value1: 0
            }
        },
        getYourValue: function (MyParameter) {
            return 0;
        }
    });
});

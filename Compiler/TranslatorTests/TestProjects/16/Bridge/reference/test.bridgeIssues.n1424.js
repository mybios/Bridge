Bridge.assembly("TestProject", function ($asm, globals) {
    "use strict";

    Bridge.define("Test.BridgeIssues.N1424.A");

    Bridge.define("Test.BridgeIssues.N1424.Alpha", {
        config: {
            properties: {
                data: 0
            }
        }
    });

    Bridge.define("Test.BridgeIssues.N1424.B");
});

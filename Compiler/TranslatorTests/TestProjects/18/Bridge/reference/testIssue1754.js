    Bridge.define("TestIssue1754.Issue1754", {
        statics: {
            F_STATIC_S1: null,
            f_STaTIC_S2: null,
            f: null,
            config: {
                properties: {
                    P_STATIC_S1: null,
                    P_STaTIC_S2: null,
                    P: null
                }
            }
        },
        ctor: function () {
            this.$initialize();
            // Checking #1754 Do not change member name case if all alpha chars are UPPERCASE

            TestIssue1754.Issue1754.F_STATIC_S1 = "Name should be F_STATIC_S1";

            TestIssue1754.Issue1754.f_STaTIC_S2 = "Name should be f_STaTIC_S2";

            TestIssue1754.Issue1754.f = "Name should be f";

            TestIssue1754.Issue1754.P_STATIC_S1 = "Name should be P_STATIC_S1";

            TestIssue1754.Issue1754.P_STaTIC_S2 = "Name should be p_STaTIC_S2";

            TestIssue1754.Issue1754.P = "Name should be p";
        }
    });

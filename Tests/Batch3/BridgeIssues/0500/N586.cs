using Bridge.Test.NUnit;

namespace Bridge.ClientTest.Batch3.BridgeIssues
{
    internal class Bridge586A
    {
        [External]
        public int SomeData { get; set; }

        [External]
        public string DoSomething()
        {
            return string.Empty;
        }

        [External]
        public static decimal SomeDataStatic { get; set; }

        [External]
        public static bool DoSomethingStatic()
        {
            return true;
        }
    }

    [External]
    internal class Bridge586B
    {
        [External]
        public int SomeData { get; set; }

        [External]
        public string DoSomething()
        {
            return string.Empty;
        }

        [External]
        public static decimal SomeDataStatic { get; set; }

        [External]
        public static bool DoSomethingStatic()
        {
            return true;
        }
    }

    // Bridge[#586]
    [Category(Constants.MODULE_ISSUES)]
    [TestFixture(TestNameFormat = "#586 - {0}")]
    public class Bridge586
    {
        [Test(ExpectedCount = 4)]
        public static void TestUseCase()
        {
            Assert.Null(Bridge586A.SomeDataStatic, "a.SomeDataStatic is external");
            Assert.Throws(() => { Bridge586A.DoSomethingStatic(); }, "a.DoSomethingStatic() is external");

            Assert.Throws(() => { Bridge586B.SomeDataStatic = 4; }, "b.SomeDataStatic is external");
            Assert.Throws(() => { Bridge586B.DoSomethingStatic(); }, "b.DoSomethingStatic() is external");
        }
    }
}
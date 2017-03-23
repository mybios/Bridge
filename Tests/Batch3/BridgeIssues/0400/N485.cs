using Bridge.Html5;
using Bridge.Test.NUnit;

using System.Linq;

namespace Bridge.ClientTest.Batch3.BridgeIssues
{
    // Bridge[#485]
    [Category(Constants.MODULE_ISSUES)]
    [TestFixture(TestNameFormat = "#485 - {0}")]
    public class Bridge485
    {
        [Test(ExpectedCount = 1)]
        public static void TestUseCase()
        {
            var list = new[] { new { LastName = "", FirstName = "", } }.Skip(1).ToList();
            list.Add(new
            {
                LastName = "Ruth",
                FirstName = "Babe",
            });
            list.Add(new
            {
                LastName = "Johnson",
                FirstName = "Walter",
            });
            list.Add(new
            {
                LastName = "Cobb",
                FirstName = "Ty",
            });
            list.Add(new
            {
                LastName = "Schmidt",
                FirstName = "Mike",
            });

            var query = from p in list
                        where p.LastName.Length == 4
                        select new
                        {
                            p.LastName,
                            p.FirstName,
                        };

            var s = Bridge.Html5.JSON.Stringify(query.ToList());

            Assert.AreEqual("[{\"LastName\":\"Ruth\",\"FirstName\":\"Babe\"},{\"LastName\":\"Cobb\",\"FirstName\":\"Ty\"}]", s, "#485");
        }
    }
}
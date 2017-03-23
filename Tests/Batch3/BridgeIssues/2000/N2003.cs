﻿using System;
using Bridge.Test.NUnit;

namespace Bridge.ClientTest.Batch3.BridgeIssues
{
    [Category(Constants.MODULE_ISSUES)]
    [TestFixture(TestNameFormat = "#2003 - {0}")]
    public class Bridge2003
    {
        private class Helper
        {
            [Template("({this}.SomeProp = {this}.SomeProp + 1)")]
            public extern object SomeInline();

            public int SomeProp
            {
                get;
                set;
            }

            public void CreateAndCallLambda()
            {
                Func<object> cb = () => { return SomeInline(); };
                cb();
            }
        }

        [Test(ExpectedCount = 1)]
        public static void TestThisIsBindInTemplatedMemberMethods()
        {
            var sut = new Helper();
            sut.SomeProp = 5;
            sut.CreateAndCallLambda();
            Assert.AreEqual(6, sut.SomeProp);
        }
    }
}
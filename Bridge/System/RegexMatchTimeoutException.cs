﻿using Bridge;

namespace System
{
    //[External] the class should have External attribute as it uses transpiled js code Version.js
    public class RegexMatchTimeoutException : TimeoutException
    {
        public extern string Pattern
        {
            [Template("getPattern()")]
            get;
        }

        public extern string Input
        {
            [Template("getInput()")]
            get;
        }

        public extern TimeSpan MatchTimeout
        {
            [Template("getMatchTimeout()")]
            get;
        }

        public extern RegexMatchTimeoutException();

        public extern RegexMatchTimeoutException(string message);

        public extern RegexMatchTimeoutException(string message, Exception innerException);

        public extern RegexMatchTimeoutException(string regexInput, string regexPattern, TimeSpan matchTimeout);
    }
}
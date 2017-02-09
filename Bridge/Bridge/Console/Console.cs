using System;
using System.Collections.Generic;

namespace Bridge.Utils
{
    /// <summary>
    /// Outputs log messages into a formatted div element on the page
    /// </summary>
    [Namespace("Bridge")]
    public class Console
    {

        [External]
        [Enum(Emit.Value)]
        private enum MessageType
        {
            Info,
            Debug,
            Error
        }
        

        private static Console instance = null;

        private Console()
        {

        }

        public static Console Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new Console();
                }

                return instance;
            }
        }
        private static void LogBase(object value, MessageType messageType = MessageType.Info)
        {
            Script.Call("print", value);
        }

        public static void Error(string value)
        {
            LogBase(value, MessageType.Error);
        }

        public static void Debug(string value)
        {
            LogBase(value, MessageType.Debug);
        }

        public static void Log(object value)
        {
            LogBase(value);
        }
        
    }
}
using Bridge;

namespace System
{
    /// <summary>
    /// Represents the standard input, output, and error streams for console applications.
    /// </summary>
    [External]
    [Unbox(false)]
    [Name("console")]
    public sealed partial class Console
    {
        #region Read and ReadLine

        /// <returns>result is a string containing the text entered by the user, or the value null.</returns>
        [Template("prompt()")]
        public static extern string ReadLine();

        /// <summary>
        /// ReadLine uses the native JavaScript prompt() to display a dialog with an optional message prompting the user to input some text.
        /// </summary>
        /// <param name="text">text is a string of text to display to the user. This parameter is optional and can be omitted if there is nothing to show in the prompt window.</param>
        /// <returns>result is a string containing the text entered by the user, or the value null.</returns>
        [Template("prompt({text})")]
        public static extern string ReadLine(string text);

        /// <summary>
        /// ReadLine uses the native JavaScript prompt() to dialog with an optional message prompting the user to input some text.
        /// </summary>
        /// <param name="text">text is a string of text to display to the user. This parameter is optional and can be omitted if there is nothing to show in the prompt window.</param>
        /// <param name="value">value is a string containing the default value displayed in the text input field. It is an optional parameter. Note that in Internet Explorer 7 and 8, if you do not provide this parameter, the string "undefined" is the default value.</param>
        /// <returns>result is a string containing the text entered by the user, or the value null.</returns>
        [Template("prompt({text}, {value})")]
        public static extern string ReadLine(string text, string value);

        /// <summary>
        /// Read uses the native JavaScript prompt() to display a dialog with an optional message prompting the user to input some text.
        /// </summary>
        /// <returns>result is a string containing the text entered by the user, or the value null.</returns>
        [Template("prompt()")]
        public static extern string Read();

        #endregion Read and ReadLine

        #region Write

        /// <summary>
        /// Writes the text representation of the specified Boolean value to the standard output stream.
        /// </summary>
        /// <param name="value">The value to write.</param>
        [Template("Bridge.Console.log(System.Boolean.toString({value}))")]
        public static extern void Write(Boolean value);

        /// <summary>
        /// Writes the specified Unicode character value to the standard output stream.
        /// </summary>
        /// <param name="value">The value to write.</param>
        [Template("Bridge.Console.log(String.fromCharCode({value}))")]
        public static extern void Write(Char value);

        /// <summary>
        /// Writes the text representation of the specified Decimal value to the standard output stream.
        /// </summary>
        /// <param name="value">The value to write.</param>
        [Template("Bridge.Console.log({value}.toString('G'))")]
        public static extern void Write(Decimal value);

        /// <summary>
        /// Writes the text representation of the specified double-precision floating-point value to the standard output stream.
        /// </summary>
        /// <param name="value">The value to write.</param>
        [Template("Bridge.Console.log({value})")]
        public static extern void Write(Double value);

        /// <summary>
        /// Writes the text representation of the specified 32-bit signed integer value to the standard output stream.
        /// </summary>
        /// <param name="value">The value to write.</param>
        [Template("Bridge.Console.log({value})")]
        public static extern void Write(Int32 value);

        /// <summary>
        /// Writes the text representation of the specified 64-bit signed integer value to the standard output stream.
        /// </summary>
        /// <param name="value">The value to write.</param>
        [Template("Bridge.Console.log({value}.toString())")]
        public static extern void Write(Int64 value);

        /// <summary>
        /// Writes the text representation of the specified object to the standard output stream.
        /// </summary>
        /// <param name="value">The value to write.</param>
        [Template("Bridge.Console.log({value})")]
        public static extern void Write(Object value);

        /// <summary>
        /// Writes the text representation of the specified single-precision floating-point value to the standard output stream.
        /// </summary>
        /// <param name="value">The value to write.</param>
        [Template("Bridge.Console.log({value})")]
        public static extern void Write(Single value);

        /// <summary>
        /// Writes the specified string value to the standard output stream.
        /// </summary>
        /// <param name="value">The value to write.</param>
        [Template("Bridge.Console.log({value})")]
        public static extern void Write(String value);

        /// <summary>
        /// Writes the text representation of the specified object to the standard output stream using the specified format information.
        /// </summary>
        /// <param name="format">A composite format string.</param>
        /// <param name="arg0">The first object to write using format.</param>
        [Template("Bridge.Console.log(System.String.format({format}, {arg0}))")]
        public static extern void Write(String format, Object arg0);

        /// <summary>
        /// Writes the text representation of the specified objects to the standard output stream using the specified format information.
        /// </summary>
        /// <param name="format">A composite format string.</param>
        /// <param name="arg0">The first object to write using format.</param>
        /// <param name="arg1">The second object to write using format.</param>
        [Template("Bridge.Console.log(System.String.format({format}, {arg0}, {arg1}))")]
        public static extern void Write(String format, Object arg0, Object arg1);

        /// <summary>
        /// Writes the text representation of the specified objects to the standard output stream using the specified format information.
        /// </summary>
        /// <param name="format">A composite format string.</param>
        /// <param name="arg0">The first object to write using format.</param>
        /// <param name="arg1">The second object to write using format.</param>
        /// <param name="arg2">The third object to write using format.</param>
        [Template("Bridge.Console.log(System.String.format({format}, {arg0}, {arg1}, {arg2}))")]
        public static extern void Write(String format, Object arg0, Object arg1, Object arg2);

        /// <summary>
        /// Writes the text representation of the specified objects and variable-length parameter list to the standard output stream using the specified format information.
        /// </summary>
        /// <param name="format">A composite format string.</param>
        /// <param name="arg0">The first object to write using format.</param>
        /// <param name="arg1">The second object to write using format.</param>
        /// <param name="arg2">The third object to write using format.</param>
        /// <param name="arg3">The fourth object to write using format.</param>
        [Template("Bridge.Console.log(System.String.format({format}, {arg0}, {arg1}, {arg2}, {arg3}))")]
        public static extern void Write(String format, Object arg0, Object arg1, Object arg2, Object arg3);

        /// <summary>
        /// Writes the text representation of the specified array of objects to the standard output stream using the specified format information.
        /// </summary>
        /// <param name="format">A composite format string.</param>
        /// <param name="arg">An array of objects to write using format.</param>
        [Template("Bridge.Console.log(System.String.format({format}, {arg}))")]
        public static extern void Write(String format, params Object[] arg);

        /// <summary>
        /// Writes the text representation of the specified 32-bit unsigned integer value to the standard output stream.
        /// </summary>
        /// <param name="value">The value to write.</param>
        [Template("Bridge.Console.log({value})")]
        public static extern void Write(UInt32 value);

        /// <summary>
        /// Writes the text representation of the specified 64-bit unsigned integer value to the standard output stream.
        /// </summary>
        /// <param name="value">The value to write.</param>
        [Template("Bridge.Console.log({value}.toString())")]
        public static extern void Write(UInt64 value);

        /// <summary>
        /// Writes the specified array of Unicode characters to the standard output stream.
        /// </summary>
        /// <param name="buffer">An array of Unicode characters.</param>
        public static extern void Write(Char[] buffer);

        #endregion Write

        #region WriteLine

        /// <summary>
        /// Writes the current line terminator to the standard output stream.
        /// </summary>
        [Template("Bridge.Console.log()")]
        public static extern void WriteLine();

        /// <summary>
        /// Writes the text representation of the specified Boolean value, followed by the current line terminator, to the standard output stream.
        /// </summary>
        /// <param name="value">The value to write.</param>
        [Template("Bridge.Console.log(System.Boolean.toString({value}))")]
        public static extern void WriteLine(Boolean value);

        /// <summary>
        /// Writes the specified Unicode character, followed by the current line terminator, value to the standard output stream.
        /// </summary>
        /// <param name="value">The value to write.</param>
        [Template("Bridge.Console.log(String.fromCharCode({value}))")]
        public static extern void WriteLine(Char value);

        /// <summary>
        /// Writes the text representation of the specified Decimal value, followed by the current line terminator, to the standard output stream.
        /// </summary>
        /// <param name="value">The value to write.</param>
        [Template("Bridge.Console.log({value}.toString('G'))")]
        public static extern void WriteLine(Decimal value);

        /// <summary>
        /// Writes the text representation of the specified double-precision floating-point value, followed by the current line terminator, to the standard output stream.
        /// </summary>
        /// <param name="value">The value to write.</param>
        [Template("Bridge.Console.log(System.Double.format({value}))")]
        public static extern void WriteLine(double value);

        /// <summary>
        /// Writes the text representation of the specified 32-bit signed integer value, followed by the current line terminator, to the standard output stream.
        /// </summary>
        /// <param name="value">The value to write.</param>
        [Template("Bridge.Console.log({value})")]
        public static extern void WriteLine(Int32 value);

        /// <summary>
        /// Writes the text representation of the specified 64-bit signed integer value, followed by the current line terminator, to the standard output stream.
        /// </summary>
        /// <param name="value">The value to write.</param>
        [Template("Bridge.Console.log({value}.toString())")]
        public static extern void WriteLine(Int64 value);

        /// <summary>
        /// Writes the text representation of the specified object, followed by the current line terminator, to the standard output stream.
        /// </summary>
        /// <param name="value">The value to write.</param>
        [Template("Bridge.Console.log({value})")]
        public static extern void WriteLine(Object value);

        /// <summary>
        /// Writes the text representation of the specified single-precision floating-point value, followed by the current line terminator, to the standard output stream.
        /// </summary>
        /// <param name="value">The value to write.</param>
        [Template("Bridge.Console.log(System.Single.format({value}))")]
        public static extern void WriteLine(Single value);

        /// <summary>
        /// Writes the specified string value, followed by the current line terminator, to the standard output stream.
        /// </summary>
        /// <param name="value">The value to write.</param>
        [Template("Bridge.Console.log({value})")]
        public static extern void WriteLine(String value);

        /// <summary>
        /// Writes the text representation of the specified object, followed by the current line terminator, to the standard output stream using the specified format information.
        /// </summary>
        /// <param name="format">A composite format string.</param>
        /// <param name="arg0">The first object to write using format.</param>
        [Template("Bridge.Console.log(System.String.format({format}, {arg0}))")]
        public static extern void WriteLine(String format, object arg0);

        /// <summary>
        /// Writes the text representation of the specified objects, followed by the current line terminator, to the standard output stream using the specified format information.
        /// </summary>
        /// <param name="format">A composite format string.</param>
        /// <param name="arg0">The first object to write using format.</param>
        /// <param name="arg1">The second object to write using format.</param>
        [Template("Bridge.Console.log(System.String.format({format}, {arg0}, {arg1}))")]
        public static extern void WriteLine(String format, Object arg0, Object arg1);

        /// <summary>
        /// Writes the text representation of the specified objects, followed by the current line terminator, to the standard output stream using the specified format information.
        /// </summary>
        /// <param name="format">A composite format string.</param>
        /// <param name="arg0">The first object to write using format.</param>
        /// <param name="arg1">The second object to write using format.</param>
        /// <param name="arg2">The third object to write using format.</param>
        [Template("Bridge.Console.log(System.String.format({format}, {arg0}, {arg1}, {arg2}))")]
        public static extern void WriteLine(String format, Object arg0, Object arg1, Object arg2);

        /// <summary>
        /// Writes the text representation of the specified objects and variable-length parameter list, followed by the current line terminator, to the standard output stream using the specified format information.
        /// </summary>
        /// <param name="format">A composite format string.</param>
        /// <param name="arg0">The first object to write using format.</param>
        /// <param name="arg1">The second object to write using format.</param>
        /// <param name="arg2">The third object to write using format.</param>
        /// <param name="arg3">The fourth object to write using format.</param>
        [Template("Bridge.Console.log(System.String.format({format}, {arg0}, {arg1}, {arg2}, {arg3}))")]
        public static extern void WriteLine(String format, Object arg0, Object arg1, Object arg2, Object arg3);

        /// <summary>
        /// Writes the text representation of the specified array of objects, followed by the current line terminator, to the standard output stream using the specified format information.
        /// </summary>
        /// <param name="format">A composite format string.</param>
        /// <param name="arg">An array of objects to write using format.</param>
        [Template("Bridge.Console.log(System.String.format({format}, {arg}))")]
        public static extern void WriteLine(String format, params Object[] arg);

        /// <summary>
        /// Writes the text representation of the specified 32-bit unsigned integer value, followed by the current line terminator, to the standard output stream.
        /// </summary>
        /// <param name="value">The value to write.</param>
        [Template("Bridge.Console.log({value})")]
        public static extern void WriteLine(UInt32 value);

        /// <summary>
        /// Writes the text representation of the specified 64-bit unsigned integer value, followed by the current line terminator, to the standard output stream.
        /// </summary>
        /// <param name="value">The value to write.</param>
        [Template("Bridge.Console.log({value}.toString())")]
        public static extern void WriteLine(UInt64 value);

        /// <summary>
        /// Writes the specified array of Unicode characters, followed by the current line terminator, to the standard output stream.
        /// </summary>
        /// <param name="buffer">An array of Unicode characters.</param>
        public static extern void WriteLine(Char[] buffer);

        /// <summary>
        /// Writes the text representation of the specified enum value, followed by the current line terminator, to the standard output stream.
        /// </summary>
        /// <param name="value">The value to write.</param>
        [Template("Bridge.Console.log(System.Enum.toString({value:type}, {value}))")]
        [Unbox(true)]
        public static extern void WriteLine(Enum value);

        /// <summary>
        /// Writes the text representation of the specified nullable decimal, followed by the current line terminator, to the standard output stream.
        /// </summary>
        /// <param name="value">The value to write.</param>
        [Template("Bridge.Console.log({value} && {value}.toString('G'))")]
        public static extern void WriteLine(decimal? value);

        /// <summary>
        /// Writes the text representation of the specified nullable 64-bit signed integer, followed by the current line terminator, to the standard output stream.
        /// </summary>
        /// <param name="value">The value to write.</param>
        [Template("Bridge.Console.log({value} && {value}.toString())")]
        public static extern void WriteLine(long? value);

        /// <summary>
        /// Writes the text representation of the specified nullable 64-bit unsigned integer, followed by the current line terminator, to the standard output stream.
        /// </summary>
        /// <param name="value">The value to write.</param>
        [Template("Bridge.Console.log({value} && {value}.toString())")]
        public static extern void WriteLine(ulong? value);

        #endregion WriteLine

        #region Utils

        /// <summary>
        /// Clears the console buffer and corresponding console window of display information.
        /// </summary>
        public static extern void Clear();

        #endregion Utils

        #region Not Implemented

        ///// <summary>
        ///// Plays the sound of a beep through the console speaker.
        ///// </summary>
        //public static extern void Beep();

        ///// <summary>
        ///// Plays the sound of a beep of a specified frequency and duration through the console speaker.
        ///// </summary>
        //public static extern void Beep(Int32 frequency, Int32 duration);

        ///// <summary>
        ///// Obtains the next character or function key pressed by the user. The pressed key is displayed in the console window.
        ///// </summary>
        //public static extern void ReadKey();

        ///// <summary>
        ///// Obtains the next character or function key pressed by the user. The pressed key is optionally displayed in the console window.
        ///// </summary>
        //public static extern void ReadKey(Boolean intercept);

        ///// <summary>
        ///// Sets the foreground and background console colors to their defaults.
        ///// </summary>
        //public static extern void ResetColor();

        ///// <summary>
        ///// Sets the height and width of the screen buffer area to the specified values.
        ///// </summary>
        //public static extern void SetBufferSize(Int32 width, Int32 height);

        ///// <summary>
        ///// Sets the position of the cursor.
        ///// </summary>
        //public static extern void SetCursorPosition(Int32 left, Int32 top);

        ///// <summary>
        ///// Sets the Error property to the specified TextWriter object.
        ///// </summary>
        //public static extern void SetError(TextWriter newError);

        ///// <summary>
        ///// Sets the In property to the specified TextReader object.
        ///// </summary>
        //public static extern void SetIn(TextReader newIn);

        ///// <summary>
        ///// Sets the Out property to the specified TextWriter object.
        ///// </summary>
        //public static extern void SetOut(TextWriter newOut);

        ///// <summary>
        ///// Sets the position of the console window relative to the screen buffer.
        ///// </summary>
        //public static extern void SetWindowPosition(Int32 left, Int32 top);

        ///// <summary>
        ///// Sets the height and width of the console window to the specified values.
        ///// </summary>
        //public static extern void SetWindowSize(Int32 width, Int32 height);

        ///// <summary>
        ///// Copies a specified source area of the screen buffer to a specified destination area.
        ///// </summary>
        //public static extern void MoveBufferArea(Int32 sourceLeft, Int32 sourceTop, Int32 sourceWidth, Int32 sourceHeight, Int32 targetLeft, Int32 targetTop);

        ///// <summary>
        ///// Copies a specified source area of the screen buffer to a specified destination area.
        ///// </summary>
        //public static extern void MoveBufferArea(Int32 sourceLeft, Int32 sourceTop, Int32 sourceWidth, Int32 sourceHeight, Int32 targetLeft, Int32 targetTop, Char sourceChar, ConsoleColor sourceForeColor, ConsoleColor sourceBackColor);

        ///// <summary>
        ///// Acquires the standard error stream.
        ///// </summary>
        //public static extern void OpenStandardError();

        ///// <summary>
        ///// Acquires the standard error stream, which is set to a specified buffer size.
        ///// </summary>
        //public static extern void OpenStandardError(Int32 bufferSize);

        ///// <summary>
        ///// Acquires the standard input stream.
        ///// </summary>
        //public static extern void OpenStandardInput();

        ///// <summary>
        ///// Acquires the standard input stream, which is set to a specified buffer size.
        ///// </summary>
        ///// <param name="bufferSize">The internal stream buffer size.</param>
        //public static extern void OpenStandardInput(Int32 bufferSize);

        ///// <summary>
        ///// Acquires the standard output stream.
        ///// </summary>
        //public static extern void OpenStandardOutput();

        ///// <summary>
        ///// Acquires the standard output stream, which is set to a specified buffer size.
        ///// </summary>
        ///// <param name="bufferSize">The internal stream buffer size.</param>
        //public static extern void OpenStandardOutput(Int32 bufferSize);

        ///// <summary>
        ///// Writes the specified subarray of Unicode characters to the standard output stream.
        ///// </summary>
        ///// <param name="buffer">An array of Unicode characters.</param>
        ///// <param name="index">The starting position in buffer.</param>
        ///// <param name="count">The number of characters to write. </param>
        //public static extern void Write(Char[] buffer, Int32 index, Int32 count);

        ///// <summary>
        ///// Writes the specified subarray of Unicode characters, followed by the current line terminator, to the standard output stream.
        ///// </summary>
        ///// <param name="buffer">An array of Unicode characters.</param>
        ///// <param name="index">The starting position in buffer.</param>
        ///// <param name="count">The number of characters to write. </param>
        //public static extern void WriteLine(Char[] buffer, Int32 index, Int32 count);

        #endregion Not Implemented
    }
}
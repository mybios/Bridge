﻿using Bridge.Contract;
using ICSharpCode.NRefactory.CSharp;
using ICSharpCode.NRefactory.TypeSystem;
using Object.Net.Utilities;

namespace Bridge.Translator
{
    public class YieldBlock : AbstractEmitterBlock
    {
        public YieldBlock(IEmitter emitter, YieldBreakStatement yieldBreakStatement)
            : base(emitter, yieldBreakStatement)
        {
            this.Emitter = emitter;
            this.YieldBreakStatement = yieldBreakStatement;
        }

        public YieldBlock(IEmitter emitter, YieldReturnStatement yieldReturnStatement)
            : base(emitter, yieldReturnStatement)
        {
            this.Emitter = emitter;
            this.YieldReturnStatement = yieldReturnStatement;
        }

        public YieldBreakStatement YieldBreakStatement
        {
            get;
            set;
        }

        public YieldReturnStatement YieldReturnStatement
        {
            get;
            set;
        }

        protected override void DoEmit()
        {
            if (this.YieldReturnStatement != null)
            {
                this.Write("$yield.push");
                this.WriteOpenParentheses();
                this.YieldReturnStatement.Expression.AcceptVisitor(this.Emitter);
                this.WriteCloseParentheses();
                this.WriteSemiColon();
                this.WriteNewLine();
            }
            else
            {
                new BreakBlock(this.Emitter, this.YieldBreakStatement).Emit();
            }
        }

        public static bool HasYield(AstNode node)
        {
            var visitor = new YieldSearchVisitor();
            node.AcceptVisitor(visitor);
            return visitor.Found;
        }

        public static void EmitYield(AbstractEmitterBlock block, IType returnType)
        {
            block.Write("var $yield = []");

            block.WriteSemiColon();
            block.WriteNewLine();
        }

        public static void EmitYieldReturn(AbstractEmitterBlock block, IType returnType)
        {
            block.WriteReturn(true);

            if (returnType != null && returnType.Name == "IEnumerator")
            {
                block.Write("Bridge.Array.toEnumerator($yield)");
            }
            else
            {
                block.Write("Bridge.Array.toEnumerable($yield)");
            }

            block.WriteSemiColon();
            block.WriteNewLine();
        }
    }
}
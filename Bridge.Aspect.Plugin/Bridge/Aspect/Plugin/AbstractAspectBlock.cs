namespace Bridge.Aspect.Plugin
{
    using Bridge.Contract;
    using System;
    using System.Collections.Generic;
    using System.Runtime.CompilerServices;

    public abstract class AbstractAspectBlock
    {
        public AbstractAspectBlock(IEmitter emitter)
        {
            this.Emitter = emitter;
        }

        public abstract IEnumerable<string> GetAspects();

        public IEmitter Emitter { get; set; }
    }
}


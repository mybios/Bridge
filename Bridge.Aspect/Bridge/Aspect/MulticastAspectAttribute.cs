namespace Bridge.Aspect
{
    using Bridge;
    using System;

    [External, Name("Bridge.Aspect.MultiAspectAttribute")]
    public abstract class MulticastAspectAttribute : AspectAttribute
    {

        protected MulticastAspectAttribute()
        {
        }

        public bool Exclude
        {get;set;
        }

        public int Inheritance
        {get;set;
        }

        public int Priority{get;set;}

        public bool Replace { get; set; }

        public string TargetMembers { get; set; }

        public int TargetMembersAttributes { get; set; }

        public string TargetParameters { get; set; }

        public int TargetParametersAttributes { get; set; }

        public string TargetTypes { get; set; }

        public int TargetTypesAttributes { get; set; }
    }
}


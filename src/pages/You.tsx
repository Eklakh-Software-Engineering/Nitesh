import { motion } from "framer-motion";
import { Heart, Sparkles, Star, Zap } from "lucide-react";

const traits = [
  {
    icon: Heart,
    title: "The Unwavering One",
    description: "Your loyalty isn't just a trait—it's a legacy. You don't abandon ship when the waters get rough; you become the anchor that keeps everything steady.",
    color: "from-primary to-amber-400",
  },
  {
    icon: Sparkles,
    title: "The Soul Keeper",
    description: "You carry emotions like sacred artifacts. Every feeling, every moment—you hold them close, protect them, and never let them fade into the background.",
    color: "from-accent to-cyan-400",
  },
  {
    icon: Star,
    title: "The Real One",
    description: "No masks. No pretense. What you see is exactly who he is. In a world full of facades, you remain refreshingly, unapologetically real.",
    color: "from-primary to-orange-400",
  },
  {
    icon: Zap,
    title: "The Chaos Architect",
    description: "Your adventures don't follow plans—they create legends. From Hetauda without an RC to every spontaneous bike ride, you turn recklessness into unforgettable stories.",
    color: "from-accent to-blue-400",
  },
];

const qualities = [
  "A listener who actually hears",
  "A friend who shows up, no questions asked",
  "The one who remembers the small things",
  "A brother forged by choice, not blood",
  "Someone who makes ordinary moments feel cinematic",
  "The keeper of inside jokes and silent understandings",
];

const You = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-block mb-6"
          >
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary via-accent to-primary rounded-full flex items-center justify-center shadow-[0_0_40px_hsl(var(--primary)/0.4)] relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-20 animate-pulse" />
              <span className="text-6xl font-bold text-background relative z-10">N</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
          >
            This Is You, Nitesh
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Not just a friend. Not just a brother. A constellation of rare qualities that most people spend their whole lives searching for.
          </motion.p>
        </motion.div>

        {/* Core Traits Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {traits.map((trait, index) => (
            <motion.div
              key={trait.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
              className="group"
            >
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)] hover:border-primary/50">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${trait.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <trait.icon className="w-7 h-7 text-background" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">
                  {trait.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {trait.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Qualities List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border rounded-3xl p-8 md:p-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            The Qualities That Define You
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {qualities.map((quality, index) => (
              <motion.div
                key={quality}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 + index * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-background/30 hover:bg-background/50 transition-colors duration-300"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent" />
                <span className="text-foreground/90">{quality}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg md:text-xl text-muted-foreground italic max-w-3xl mx-auto leading-relaxed">
            "In a world of temporary connections, you're proof that some bonds are meant to last forever. This archive exists because you exist—and that makes all the difference."
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
            <Heart className="w-5 h-5 text-primary animate-pulse" />
            <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default You;

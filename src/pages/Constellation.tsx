import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Memory {
  id: string;
  title: string;
  question: string;
  answer: string;
  x: number;
  y: number;
  color: string;
}

const memories: Memory[] = [
  {
    id: "1",
    title: "Unwavering",
    question: "If you had to describe our friendship in one word, what would it be?",
    answer: "Unwavering.",
    x: 15,
    y: 25,
    color: "primary",
  },
  {
    id: "2",
    title: "The Beginning",
    question: "What's the first day or moment you actually remember us becoming friends?",
    answer: "When me and Aryan were talking on the first day and we joined in.",
    x: 35,
    y: 18,
    color: "accent",
  },
  {
    id: "3",
    title: "Hetauda Adventure",
    question: "What was the stupidest thing we ever did that somehow worked out?",
    answer: "Maybe going to Hetauda without RC and License.",
    x: 55,
    y: 28,
    color: "primary",
  },
  {
    id: "4",
    title: "Deeper Trust",
    question: "When was the first time you realized we actually trust each other?",
    answer: "Trust ta pahile se hi rhe but in these 2.5 years it gets deeper.",
    x: 72,
    y: 22,
    color: "accent",
  },
  {
    id: "5",
    title: "Solo Rides",
    question: "What's the most random moment that always reminds you of me?",
    answer: "Whenever I ride bike alone.",
    x: 25,
    y: 45,
    color: "primary",
  },
  {
    id: "6",
    title: "Different Colleges",
    question: "What's the one time we argued but learned something real from it?",
    answer: "When we chose different colleges which made our bond become deeper.",
    x: 48,
    y: 52,
    color: "accent",
  },
  {
    id: "7",
    title: "All The Rides",
    question: "Which small moments actually felt like big ones later?",
    answer: "All bike rides of us.",
    x: 68,
    y: 48,
    color: "primary",
  },
  {
    id: "8",
    title: "Confirmed Forever",
    question: "Was there a moment where you thought, 'Yeah, this guy will always be around'?",
    answer: "Hope hamesa rhe but in these 2.5 years confirmed ho gaya.",
    x: 85,
    y: 40,
    color: "accent",
  },
  {
    id: "9",
    title: "Pain Of Not Being Chosen",
    question: "What's something you think we both learned the hard way?",
    answer: "The pain of not being chosen by the loving ones.",
    x: 18,
    y: 65,
    color: "primary",
  },
  {
    id: "10",
    title: "Always Real",
    question: "When did we stop pretending and start being real?",
    answer: "I never pretended aur in your case kabhi nahi.",
    x: 40,
    y: 72,
    color: "accent",
  },
  {
    id: "11",
    title: "Loyalty & Emotions",
    question: "What do you think makes our friendship different from others?",
    answer: "Loyalty, emotions towards each other. Even we don't talk for a long time it won't affect our bond.",
    x: 62,
    y: 68,
    color: "primary",
  },
  {
    id: "12",
    title: "Supporting The Wrong",
    question: "What's one thing you'd thank me for, even if it sounds dumb?",
    answer: "Thank you for supporting in my wrong decisions even in going back to toxic relationship.",
    x: 82,
    y: 62,
    color: "accent",
  },
  {
    id: "13",
    title: "Trust Yourself",
    question: "What's one thing I should never forget about myself, according to you?",
    answer: "You can do anything in your life, trust yourself.",
    x: 30,
    y: 85,
    color: "primary",
  },
  {
    id: "14",
    title: "True Meaning",
    question: "If you had to describe this friendship to someone 10 years younger, how would you explain it?",
    answer: "Once upon a time there was a boy who had no idea of friendship cause all of them tried to betray him just pretending to be friend and after long time he met someone who made him realize the true meaning of it and what we can do for friendship.",
    x: 52,
    y: 88,
    color: "accent",
  },
  {
    id: "15",
    title: "Our Future",
    question: "Where do you see us five years from now?",
    answer: "Playing with each other's children.",
    x: 75,
    y: 82,
    color: "primary",
  },
  {
    id: "16",
    title: "Retirement Dream",
    question: "If we could add one future memory node, what should it be called?",
    answer: "Spending our retirement life together far from the crowd, a perfect peaceful place growing our vegetables by own, a little farm of many animals.",
    x: 90,
    y: 75,
    color: "accent",
  },
];

const Constellation = () => {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 relative overflow-hidden">
      {/* Constellation canvas */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        {/* Draw connections between nodes */}
        {memories.map((memory, i) => {
          if (i === memories.length - 1) return null;
          const next = memories[i + 1];
          return (
            <line
              key={`line-${memory.id}`}
              x1={`${memory.x}%`}
              y1={`${memory.y}%`}
              x2={`${next.x}%`}
              y2={`${next.y}%`}
              stroke="hsl(var(--border))"
              strokeWidth="1"
              opacity="0.3"
              strokeDasharray="5,5"
            />
          );
        })}
      </svg>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            The Archive of Us
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Every dot is a memory. Every line connects our moments. Click to revisit.
          </p>
        </motion.div>

        {/* Memory nodes */}
        <div className="relative" style={{ minHeight: "60vh" }}>
          {memories.map((memory, index) => (
            <motion.button
              key={memory.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              onClick={() => setSelectedMemory(memory)}
              className="absolute group"
              style={{
                left: `${memory.x}%`,
                top: `${memory.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="relative">
                {/* Glow effect */}
                <div
                  className={`absolute inset-0 rounded-full blur-xl transition-all duration-300 ${
                    memory.color === "primary"
                      ? "bg-primary/30 group-hover:bg-primary/50"
                      : "bg-accent/30 group-hover:bg-accent/50"
                  }`}
                  style={{ transform: "scale(2)" }}
                />
                
                {/* Node */}
                <div
                  className={`relative w-16 h-16 rounded-full border-2 transition-all duration-300 ${
                    memory.color === "primary"
                      ? "bg-primary/20 border-primary group-hover:bg-primary/40"
                      : "bg-accent/20 border-accent group-hover:bg-accent/40"
                  } group-hover:scale-110`}
                >
                  <div
                    className={`absolute inset-0 rounded-full animate-constellation-pulse ${
                      memory.color === "primary" ? "bg-primary/50" : "bg-accent/50"
                    }`}
                  />
                </div>

                {/* Title on hover */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  <span className="text-sm font-medium text-foreground">{memory.title}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Memory detail modal */}
      <Dialog open={!!selectedMemory} onOpenChange={() => setSelectedMemory(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary mb-4">
              {selectedMemory?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground italic mb-2">
                {selectedMemory?.question}
              </p>
              <p className="text-foreground leading-relaxed text-lg">
                {selectedMemory?.answer}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Constellation;

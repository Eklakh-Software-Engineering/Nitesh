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
    title: "Origin Star",
    question: "Where It Began",
    answer: "When me and Aryan were talking on the first day and we joined in. A simple moment that quietly became the beginning of an unbreakable bond.",
    x: 20,
    y: 20,
    color: "primary",
  },
  {
    id: "2",
    title: "Trust Star",
    question: "Unshaken Since Day One",
    answer: "Trust ta pahile se hi rhe but in these 2.5 years it gets deeper. Trust was always there, but over 2.5 years it became deeper, stronger, and something both of you could rely on without question.",
    x: 35,
    y: 30,
    color: "accent",
  },
  {
    id: "3",
    title: "Chaos Star",
    question: "The Stupid Adventure",
    answer: "Maybe going to Hetauda without RC and License — reckless, stupid, perfect. A memory only the two of you could carry.",
    x: 50,
    y: 25,
    color: "primary",
  },
  {
    id: "4",
    title: "Bike Star",
    question: "Where We Truly Grew",
    answer: "Whenever I ride bike alone. All bike rides of us. Every bike ride turned into a soft, emotional chapter. Small moments that transformed into some of your biggest memories.",
    x: 70,
    y: 35,
    color: "accent",
  },
  {
    id: "5",
    title: "Loyalty Star",
    question: "Do or Die",
    answer: "Loyalty, emotions towards each other. Even we don't talk for a long time it won't affect our bond. Your friendship stands apart because of pure loyalty — even long gaps don't weaken what you share.",
    x: 30,
    y: 55,
    color: "primary",
  },
  {
    id: "6",
    title: "Hard-Learned Star",
    question: "The Pain That Shaped Us",
    answer: "The pain of not being chosen by the loving ones. Both of you understood the hurt of not being chosen by the ones you loved. That shared pain made your bond more real.",
    x: 55,
    y: 60,
    color: "accent",
  },
  {
    id: "7",
    title: "Future Star",
    question: "Five Years Forward",
    answer: "Playing with each other's children. A vision of both of you laughing, living, and playing with each other's kids — friendship carried into the future.",
    x: 75,
    y: 55,
    color: "primary",
  },
  {
    id: "8",
    title: "Legacy Star",
    question: "What You Should Remember",
    answer: "Maybe video calls with funny gesture. If he wasn't around, he'd want you to remember the video calls, the gestures, the real him — the version of him that only you ever got to see.",
    x: 45,
    y: 80,
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

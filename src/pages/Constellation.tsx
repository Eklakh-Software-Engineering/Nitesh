import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Memory {
  id: string;
  title: string;
  description: string;
  x: number;
  y: number;
  color: string;
}

const memories: Memory[] = [
  {
    id: "1",
    title: "The Beginning",
    description: "Where it all started — two strangers who became brothers through shared dreams and late-night conversations.",
    x: 20,
    y: 30,
    color: "primary",
  },
  {
    id: "2",
    title: "First Hackathon",
    description: "48 hours of chaos, energy drinks, and code. We didn't win, but we built something that mattered.",
    x: 45,
    y: 20,
    color: "accent",
  },
  {
    id: "3",
    title: "The Almost Gave Up",
    description: "That night when everything felt impossible. We sat in silence, then decided to try one more time.",
    x: 70,
    y: 35,
    color: "primary",
  },
  {
    id: "4",
    title: "Victory Moment",
    description: "When hard work paid off and we celebrated like kids. The joy in your eyes was unforgettable.",
    x: 30,
    y: 60,
    color: "accent",
  },
  {
    id: "5",
    title: "Random 3AM Call",
    description: "You called just to say you figured out that bug. We talked about life, code, and everything in between.",
    x: 60,
    y: 70,
    color: "primary",
  },
  {
    id: "6",
    title: "The Promise",
    description: "We promised to build something meaningful together. This site is proof we keep our promises.",
    x: 80,
    y: 55,
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
            <DialogTitle className="text-2xl font-bold text-primary">
              {selectedMemory?.title}
            </DialogTitle>
          </DialogHeader>
          <p className="text-foreground leading-relaxed">{selectedMemory?.description}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Constellation;

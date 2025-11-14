import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Lesson {
  id: string;
  text: string;
  author: string;
}

const defaultLessons: Lesson[] = [
  {
    id: "1",
    text: "Trust Doesn't Need Time — It Needs the Right Person",
    author: "You both trusted each other from the beginning, and time only deepened it. The right people make trust feel natural, not difficult.",
  },
  {
    id: "2",
    text: "Loyalty Is Quiet but Powerful",
    author: "Even when life took you to different colleges, the bond didn't break — it became stronger. Distance doesn't hurt real friendship.",
  },
  {
    id: "3",
    text: "Some Pain Makes You Stronger Together",
    author: "Both of you felt the ache of not being chosen by the person you loved. That shared wound taught empathy, maturity, and emotional depth.",
  },
  {
    id: "4",
    text: "Stupid Decisions Become Core Memories",
    author: "The Hetauda trip without RC or license wasn't smart — but it taught you that the craziest moments often become the most unforgettable ones.",
  },
  {
    id: "5",
    text: "Real Friendship Has No Pretending",
    author: "I never pretended aur in your case kabhi nahi. Neither of you ever had to act, hide, or pretend. This showed you both what genuine comfort looks like.",
  },
  {
    id: "6",
    text: "Being There Matters More Than Being Right",
    author: "Thank you for supporting in my wrong decisions even in going back to toxic relationship. Sometimes presence is more important than advice.",
  },
  {
    id: "7",
    text: "Small Moments Become the Big Ones",
    author: "Bike rides, late talks, chowmein shops, random walks — you both learned that the smallest hours can become the deepest memories.",
  },
  {
    id: "8",
    text: "People Can Change Your Definition of Friendship",
    author: "Once upon a time there was a boy who had no idea of friendship cause all of them tried to betray him just pretending to be friend and after long time he met someone who made him realize the true meaning of it and what we can do for friendship.",
  },
];

const Lessons = () => {
  const [lessons, setLessons] = useState<Lesson[]>(() => {
    const saved = localStorage.getItem("lessons");
    return saved ? JSON.parse(saved) : defaultLessons;
  });
  const [flipped, setFlipped] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newLesson, setNewLesson] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  const toggleFlip = (id: string) => {
    setFlipped((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const addLesson = () => {
    if (!newLesson.trim() || !newAuthor.trim()) {
      toast.error("Please fill in both fields");
      return;
    }

    const lesson: Lesson = {
      id: Date.now().toString(),
      text: newLesson,
      author: newAuthor,
    };

    const updated = [...lessons, lesson];
    setLessons(updated);
    localStorage.setItem("lessons", JSON.stringify(updated));
    
    setNewLesson("");
    setNewAuthor("");
    setIsAdding(false);
    toast.success("Lesson added to the archive");
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Lessons We Learned
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Things we learned without realizing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => toggleFlip(lesson.id)}
              className="cursor-pointer perspective-1000"
              style={{ perspective: "1000px" }}
            >
              <div
                className={`relative transition-all duration-500 transform-style-3d ${
                  flipped.includes(lesson.id) ? "rotate-y-180" : ""
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 backface-hidden bg-card border border-border rounded-xl p-6 flex items-center justify-center min-h-[200px] hover:border-primary/50 hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] transition-all duration-300"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <p className="text-xl font-medium text-center text-muted-foreground">
                    Click to reveal
                  </p>
                </div>

                {/* Back */}
                <div
                  className="backface-hidden bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 rounded-xl p-6 flex flex-col justify-between min-h-[200px] shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <p className="text-lg text-foreground leading-relaxed mb-4">
                    "{lesson.text}"
                  </p>
                  <p className="text-sm text-accent font-medium text-right">
                    — {lesson.author}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add new lesson */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          {!isAdding ? (
            <Button
              onClick={() => setIsAdding(true)}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Your Lesson
            </Button>
          ) : (
            <div className="w-full max-w-md bg-card border border-border rounded-xl p-6 space-y-4">
              <Input
                placeholder="Your lesson..."
                value={newLesson}
                onChange={(e) => setNewLesson(e.target.value)}
                className="bg-background border-border"
              />
              <Input
                placeholder="Your name..."
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                className="bg-background border-border"
              />
              <div className="flex gap-2">
                <Button onClick={addLesson} className="flex-1 bg-primary hover:bg-primary/90">
                  Save
                </Button>
                <Button
                  onClick={() => {
                    setIsAdding(false);
                    setNewLesson("");
                    setNewAuthor("");
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Lessons;

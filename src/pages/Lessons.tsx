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
    text: "Sometimes the best code is the code you delete.",
    author: "Arnima",
  },
  {
    id: "2",
    text: "Friendship isn't about being there when it's convenient. It's about being there when it's not.",
    author: "Nitesh",
  },
  {
    id: "3",
    text: "The bugs we couldn't fix taught us more than the features that worked.",
    author: "Arnima",
  },
  {
    id: "4",
    text: "Success is temporary. Character is permanent.",
    author: "Nitesh",
  },
  {
    id: "5",
    text: "We didn't realize we were making memories. We just knew we were having fun.",
    author: "Arnima",
  },
  {
    id: "6",
    text: "The best ideas come at 3 AM, but so does our worst code.",
    author: "Nitesh",
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
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-primary">Lessons</h1>
          <p className="text-lg text-muted-foreground">
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

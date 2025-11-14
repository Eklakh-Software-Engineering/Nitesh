import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { format } from "date-fns";

interface Entry {
  id: string;
  text: string;
  timestamp: number;
}

const Capsule = () => {
  const [entries, setEntries] = useState<Entry[]>(() => {
    const saved = localStorage.getItem("capsule-entries");
    return saved ? JSON.parse(saved) : [];
  });
  const [isAdding, setIsAdding] = useState(false);
  const [newEntry, setNewEntry] = useState("");

  const addEntry = () => {
    if (!newEntry.trim()) {
      toast.error("Please write something first");
      return;
    }

    const entry: Entry = {
      id: Date.now().toString(),
      text: newEntry,
      timestamp: Date.now(),
    };

    const updated = [entry, ...entries];
    setEntries(updated);
    localStorage.setItem("capsule-entries", JSON.stringify(updated));

    setNewEntry("");
    setIsAdding(false);
    toast.success("Memory saved to capsule");
  };

  const deleteEntry = (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    localStorage.setItem("capsule-entries", JSON.stringify(updated));
    toast.success("Entry removed");
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Memory Capsule
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            A Box of Us — A Time Machine, Not a Storage Box
          </p>
          <p className="text-sm text-muted-foreground italic">
            Every item inside represents a moment you can travel back to someday.
          </p>
        </motion.div>

        {/* Add new entry */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          {!isAdding ? (
            <Button
              onClick={() => setIsAdding(true)}
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Memory
            </Button>
          ) : (
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <Textarea
                placeholder="Write your memory here..."
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                className="min-h-[150px] bg-background border-border resize-none"
                autoFocus
              />
              <div className="flex gap-2">
                <Button
                  onClick={addEntry}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Save Memory
                </Button>
                <Button
                  onClick={() => {
                    setIsAdding(false);
                    setNewEntry("");
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

        {/* Entries list */}
        <div className="space-y-4">
          <AnimatePresence>
            {entries.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-muted-foreground text-lg mb-4">
                  The capsule is empty. Start adding your memories.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  These entries will grow with time, becoming a living archive of your friendship.
                </p>
              </motion.div>
            ) : (
              entries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-[0_0_20px_hsl(var(--primary)/0.1)] transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-sm text-accent mb-2">
                        {format(entry.timestamp, "MMMM dd, yyyy 'at' h:mm a")}
                      </p>
                      <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                        {entry.text}
                      </p>
                    </div>
                    <Button
                      onClick={() => deleteEntry(entry.id)}
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {entries.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground italic">
              {entries.length} {entries.length === 1 ? "memory" : "memories"} preserved in the
              archive
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Capsule;

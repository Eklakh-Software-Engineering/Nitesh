import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Moment {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}

const moments: Moment[] = [
  {
    id: "1",
    title: "Hackathon Night",
    description: "When chaos looked like happiness and coffee was our fuel.",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
    date: "March 2023",
  },
  {
    id: "2",
    title: "Victory Celebration",
    description: "The moment we realized we actually did it.",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    date: "June 2023",
  },
  {
    id: "3",
    title: "Late Night Coding",
    description: "3 AM debugging sessions that turned into life conversations.",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    date: "September 2023",
  },
  {
    id: "4",
    title: "Coffee Break Philosophy",
    description: "Where we solved the world's problems over terrible coffee.",
    imageUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop",
    date: "November 2023",
  },
  {
    id: "5",
    title: "The Road Trip",
    description: "Bad music, good company, unforgettable memories.",
    imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
    date: "January 2024",
  },
  {
    id: "6",
    title: "Project Launch",
    description: "When dreams became reality and hard work paid off.",
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop",
    date: "March 2024",
  },
];

const Moments = () => {
  const [selectedMoment, setSelectedMoment] = useState<Moment | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-primary">Moments</h1>
          <p className="text-lg text-muted-foreground">
            Where chaos looked like happiness.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moments.map((moment, index) => (
            <motion.div
              key={moment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => setSelectedMoment(moment)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={moment.imageUrl}
                    alt={moment.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1 text-foreground group-hover:text-primary transition-colors">
                    {moment.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{moment.date}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {moment.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedMoment && (
          <Dialog open={true} onOpenChange={() => setSelectedMoment(null)}>
            <DialogContent className="max-w-4xl bg-card/95 backdrop-blur-xl border-border">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <img
                    src={selectedMoment.imageUrl}
                    alt={selectedMoment.title}
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="mt-6">
                  <h2 className="text-3xl font-bold mb-2 text-primary">
                    {selectedMoment.title}
                  </h2>
                  <p className="text-sm text-accent mb-4">{selectedMoment.date}</p>
                  <p className="text-foreground leading-relaxed">
                    {selectedMoment.description}
                  </p>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Moments;

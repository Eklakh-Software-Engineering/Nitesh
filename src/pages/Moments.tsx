import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import bikeTravel from "@/assets/bike-travel-india.jpg";
import birgunj from "@/assets/birgunj-holi.jpg";
import chowmein from "@/assets/chowmein-class.jpg";
import farewell from "@/assets/college-farewell.jpg";
import picnic from "@/assets/college-picnic.jpg";
import pokhra1 from "@/assets/ghariwarwa-pokhra-1.jpg";
import pokhra2 from "@/assets/ghariwarwa-pokhra-2.jpg";
import hetauda from "@/assets/hetauda-adventure.jpg";
import biryani from "@/assets/mugal-biryani.jpg";
import birthday from "@/assets/birthday-party.jpg";

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
    title: "Bike Travel to India",
    description: "When we hit the road with helmets and dreams, capturing the freedom we felt on two wheels.",
    imageUrl: bikeTravel,
    date: "2023",
  },
  {
    id: "2",
    title: "Birgunj Holi Celebration",
    description: "Colors everywhere, laughter louder than music. A celebration of friendship and chaos.",
    imageUrl: birgunj,
    date: "2024",
  },
  {
    id: "3",
    title: "Chowmein During Class",
    description: "The legendary canteen escape. When chowmein mattered more than attendance.",
    imageUrl: chowmein,
    date: "2023",
  },
  {
    id: "4",
    title: "College Farewell",
    description: "Dressed up, cameras out, pretending we weren't about to miss this phase forever.",
    imageUrl: farewell,
    date: "2024",
  },
  {
    id: "5",
    title: "College Picnic",
    description: "Cold morning, warm company. Just us against the world.",
    imageUrl: picnic,
    date: "2023",
  },
  {
    id: "6",
    title: "Ghariwarwa Pokhra Roaming",
    description: "Bikes parked, helmets on, exploring like we had all the time in the world.",
    imageUrl: pokhra1,
    date: "2024",
  },
  {
    id: "7",
    title: "Ghariwarwa Pokhra Moments",
    description: "More than just a place — it became a memory we'd carry forever.",
    imageUrl: pokhra2,
    date: "2024",
  },
  {
    id: "8",
    title: "Hetauda Adventure",
    description: "The stupidest, most reckless trip — no RC, no license, just pure trust and brotherhood.",
    imageUrl: hetauda,
    date: "2023",
  },
  {
    id: "9",
    title: "Mugal Biryani House",
    description: "Good food, better company. Where we solved life's problems one plate at a time.",
    imageUrl: biryani,
    date: "2024",
  },
  {
    id: "10",
    title: "Birthday Party at Hotel",
    description: "Celebrating another year, celebrating us. Dressed sharp, hearts full.",
    imageUrl: birthday,
    date: "2024",
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
              <div className="relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)] h-full flex flex-col">
                <div className="flex-1 overflow-hidden bg-background/5 flex items-center justify-center min-h-[250px]">
                  <img
                    src={moment.imageUrl}
                    alt={moment.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
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
              <DialogTitle className="sr-only">{selectedMoment.title}</DialogTitle>
              <DialogDescription className="sr-only">{selectedMoment.description}</DialogDescription>
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

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Star, Camera, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  date: Date;
  year: number;
  category: "memory" | "moment";
  imageUrl?: string;
  icon?: typeof Star;
}

const timelineData: TimelineItem[] = [
  // Constellation Memories (Core Stars)
  {
    id: "origin",
    title: "Origin Star — Where It Began",
    description: "The first day you talked with Aryan, and you joined in — a simple moment that quietly became the beginning of an unbreakable bond.",
    date: new Date("2022-06-01"),
    year: 2022,
    category: "memory",
    icon: Star,
  },
  {
    id: "trust",
    title: "Trust Star — Unshaken Since Day One",
    description: "Trust was always there, but over 2.5 years it became deeper, stronger, and something both of you could rely on without question.",
    date: new Date("2022-08-15"),
    year: 2022,
    category: "memory",
    icon: Star,
  },
  // Moments with Photos
  {
    id: "college-picnic",
    title: "College Picnic",
    description: "Cold morning, warm company. Just us against the world.",
    date: new Date("2023-01-20"),
    year: 2023,
    category: "moment",
    imageUrl: picnic,
  },
  {
    id: "chowmein",
    title: "Chowmein During Class",
    description: "The legendary canteen escape. When chowmein mattered more than attendance.",
    date: new Date("2023-03-10"),
    year: 2023,
    category: "moment",
    imageUrl: chowmein,
  },
  {
    id: "chaos",
    title: "Chaos Star — The Stupid Adventure",
    description: "The wild trip to Hetauda without RC or license — reckless, stupid, perfect. A memory only the two of you could carry.",
    date: new Date("2023-04-15"),
    year: 2023,
    category: "memory",
    icon: Star,
  },
  {
    id: "hetauda",
    title: "Hetauda Adventure",
    description: "The stupidest, most reckless trip — no RC, no license, just pure trust and brotherhood.",
    date: new Date("2023-04-15"),
    year: 2023,
    category: "moment",
    imageUrl: hetauda,
  },
  {
    id: "bike-travel",
    title: "Bike Travel to India",
    description: "When we hit the road with helmets and dreams, capturing the freedom we felt on two wheels.",
    date: new Date("2023-07-05"),
    year: 2023,
    category: "moment",
    imageUrl: bikeTravel,
  },
  {
    id: "bike",
    title: "Bike Star — Where We Truly Grew",
    description: "Every bike ride turned into a soft, emotional chapter. Small moments that transformed into some of your biggest memories.",
    date: new Date("2023-09-01"),
    year: 2023,
    category: "memory",
    icon: Star,
  },
  {
    id: "hard-learned",
    title: "Hard-Learned Star — The Pain That Shaped Us",
    description: "Both of you understood the hurt of not being chosen by the ones you loved. That shared pain made your bond more real.",
    date: new Date("2023-11-20"),
    year: 2023,
    category: "memory",
    icon: Star,
  },
  {
    id: "birgunj",
    title: "Birgunj Holi Celebration",
    description: "Colors everywhere, laughter louder than music. A celebration of friendship and chaos.",
    date: new Date("2024-03-25"),
    year: 2024,
    category: "moment",
    imageUrl: birgunj,
  },
  {
    id: "loyalty",
    title: "Loyalty Star — Do or Die",
    description: "Your friendship stands apart because of pure loyalty — even long gaps don't weaken what you share.",
    date: new Date("2024-05-10"),
    year: 2024,
    category: "memory",
    icon: Star,
  },
  {
    id: "farewell",
    title: "College Farewell",
    description: "Dressed up, cameras out, pretending we weren't about to miss this phase forever.",
    date: new Date("2024-06-15"),
    year: 2024,
    category: "moment",
    imageUrl: farewell,
  },
  {
    id: "pokhra1",
    title: "Ghariwarwa Pokhra Roaming",
    description: "Bikes parked, helmets on, exploring like we had all the time in the world.",
    date: new Date("2024-08-10"),
    year: 2024,
    category: "moment",
    imageUrl: pokhra1,
  },
  {
    id: "pokhra2",
    title: "Ghariwarwa Pokhra Moments",
    description: "More than just a place — it became a memory we'd carry forever.",
    date: new Date("2024-08-11"),
    year: 2024,
    category: "moment",
    imageUrl: pokhra2,
  },
  {
    id: "biryani",
    title: "Mugal Biryani House",
    description: "Good food, better company. Where we solved life's problems one plate at a time.",
    date: new Date("2024-09-20"),
    year: 2024,
    category: "moment",
    imageUrl: biryani,
  },
  {
    id: "birthday",
    title: "Birthday Party at Hotel",
    description: "Celebrating another year, celebrating us. Dressed sharp, hearts full.",
    date: new Date("2024-10-12"),
    year: 2024,
    category: "moment",
    imageUrl: birthday,
  },
  {
    id: "future",
    title: "Future Star — Five Years Forward",
    description: "A vision of both of you laughing, living, and playing with each other's kids — friendship carried into the future.",
    date: new Date("2024-11-01"),
    year: 2024,
    category: "memory",
    icon: Star,
  },
  {
    id: "legacy",
    title: "Legacy Star — What You Should Remember",
    description: "If he wasn't around, he'd want you to remember the video calls, the gestures, the real him — the version of him that only you ever got to see.",
    date: new Date("2024-11-14"),
    year: 2024,
    category: "memory",
    icon: Star,
  },
];

const Timeline = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "memory" | "moment">("all");
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);

  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(timelineData.map((item) => item.year)));
    return uniqueYears.sort((a, b) => a - b);
  }, []);

  const filteredData = useMemo(() => {
    return timelineData
      .filter((item) => {
        const matchesSearch =
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesYear = selectedYear === "all" || item.year === selectedYear;
        const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
        return matchesSearch && matchesYear && matchesCategory;
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [searchQuery, selectedYear, selectedCategory]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedYear("all");
    setSelectedCategory("all");
  };

  const hasActiveFilters = searchQuery || selectedYear !== "all" || selectedCategory !== "all";

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            The Journey of Us
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Every moment that built this brotherhood
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 space-y-4"
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search memories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 items-center">
            <Filter className="w-4 h-4 text-muted-foreground" />
            
            {/* Year Filters */}
            <Button
              variant={selectedYear === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedYear("all")}
            >
              All Years
            </Button>
            {years.map((year) => (
              <Button
                key={year}
                variant={selectedYear === year ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </Button>
            ))}

            <div className="w-px h-6 bg-border mx-2" />

            {/* Category Filters */}
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              <Calendar className="w-4 h-4 mr-1" />
              All
            </Button>
            <Button
              variant={selectedCategory === "memory" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("memory")}
            >
              <Star className="w-4 h-4 mr-1" />
              Core Stars
            </Button>
            <Button
              variant={selectedCategory === "moment" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("moment")}
            >
              <Camera className="w-4 h-4 mr-1" />
              Moments
            </Button>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="ml-auto text-destructive"
              >
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-4 mb-12"
        >
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-primary mb-1">
              {filteredData.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Memories</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-accent mb-1">
              {filteredData.filter((item) => item.category === "memory").length}
            </div>
            <div className="text-sm text-muted-foreground">Core Stars</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-primary mb-1">
              {filteredData.filter((item) => item.category === "moment").length}
            </div>
            <div className="text-sm text-muted-foreground">Moments</div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-accent/50 to-primary/50 -translate-x-1/2" />

          <div className="space-y-12">
            <AnimatePresence>
              {filteredData.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <p className="text-muted-foreground text-lg">
                    No memories found. Try adjusting your filters.
                  </p>
                </motion.div>
              ) : (
                filteredData.map((item, index) => {
                  const isLeft = index % 2 === 0;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className={`relative flex items-center ${
                        isLeft ? "justify-start" : "justify-end"
                      }`}
                    >
                      {/* Timeline Node */}
                      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-[0_0_20px_hsl(var(--primary)/0.5)] animate-glow-pulse" />

                      {/* Content Card */}
                      <div
                        className={`w-[calc(50%-2rem)] ${isLeft ? "pr-8" : "pl-8"}`}
                      >
                        <motion.div
                          onClick={() => setSelectedItem(item)}
                          whileHover={{ scale: 1.02 }}
                          className="bg-card border border-border rounded-xl p-6 cursor-pointer hover:border-primary/50 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)] transition-all duration-300"
                        >
                          <div className="flex items-start gap-4">
                            {item.imageUrl ? (
                              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-background/5">
                                <img
                                  src={item.imageUrl}
                                  alt={item.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : item.icon ? (
                              <div className="w-20 h-20 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <item.icon className="w-10 h-10 text-primary" />
                              </div>
                            ) : null}

                            <div className="flex-1 min-w-0">
                              <Badge
                                variant={item.category === "memory" ? "default" : "outline"}
                                className="mb-2"
                              >
                                {item.category === "memory" ? (
                                  <>
                                    <Star className="w-3 h-3 mr-1" />
                                    Core Star
                                  </>
                                ) : (
                                  <>
                                    <Camera className="w-3 h-3 mr-1" />
                                    Moment
                                  </>
                                )}
                              </Badge>
                              <h3 className="text-xl font-semibold text-foreground mb-2">
                                {item.title}
                              </h3>
                              <p className="text-sm text-accent mb-2">
                                {item.date.toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </p>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Summary */}
        {filteredData.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="inline-block bg-card border border-primary/30 rounded-xl p-8 shadow-[0_0_30px_hsl(var(--primary)/0.2)]">
              <p className="text-lg text-foreground mb-2">
                <span className="font-bold text-primary">{filteredData.length}</span> memories
                across{" "}
                <span className="font-bold text-accent">{years.length}</span> years
              </p>
              <p className="text-sm text-muted-foreground italic">
                A friendship that keeps growing stronger
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <Dialog open={true} onOpenChange={() => setSelectedItem(null)}>
            <DialogContent className="max-w-4xl bg-card/95 backdrop-blur-xl border-border">
              <DialogTitle className="sr-only">{selectedItem.title}</DialogTitle>
              <DialogDescription className="sr-only">{selectedItem.description}</DialogDescription>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                {selectedItem.imageUrl && (
                  <div className="relative mb-6">
                    <img
                      src={selectedItem.imageUrl}
                      alt={selectedItem.title}
                      className="w-full rounded-lg"
                    />
                  </div>
                )}
                {selectedItem.icon && !selectedItem.imageUrl && (
                  <div className="w-full h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mb-6">
                    <selectedItem.icon className="w-32 h-32 text-primary" />
                  </div>
                )}
                <div>
                  <Badge
                    variant={selectedItem.category === "memory" ? "default" : "outline"}
                    className="mb-3"
                  >
                    {selectedItem.category === "memory" ? (
                      <>
                        <Star className="w-3 h-3 mr-1" />
                        Core Star
                      </>
                    ) : (
                      <>
                        <Camera className="w-3 h-3 mr-1" />
                        Moment
                      </>
                    )}
                  </Badge>
                  <h2 className="text-3xl font-bold mb-3 text-primary">
                    {selectedItem.title}
                  </h2>
                  <p className="text-sm text-accent mb-4">
                    {selectedItem.date.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-foreground leading-relaxed text-lg">
                    {selectedItem.description}
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

export default Timeline;

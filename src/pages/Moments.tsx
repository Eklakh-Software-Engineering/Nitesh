import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Edit, Trash2, X, Upload } from "lucide-react";

// Original local images
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
  description: string | null;
  image_url: string;
  moment_date: string;
  is_default?: boolean;
}

// Default moments with local images
const defaultMoments: Moment[] = [
  { id: "default-1", title: "Bike Travel to India", description: "When we hit the road with helmets and dreams, capturing the freedom we felt on two wheels.", image_url: bikeTravel, moment_date: "2023", is_default: true },
  { id: "default-2", title: "Birgunj Holi Celebration", description: "Colors everywhere, laughter louder than music. A celebration of friendship and chaos.", image_url: birgunj, moment_date: "2024", is_default: true },
  { id: "default-3", title: "Chowmein During Class", description: "The legendary canteen escape. When chowmein mattered more than attendance.", image_url: chowmein, moment_date: "2023", is_default: true },
  { id: "default-4", title: "College Farewell", description: "Dressed up, cameras out, pretending we weren't about to miss this phase forever.", image_url: farewell, moment_date: "2024", is_default: true },
  { id: "default-5", title: "College Picnic", description: "Cold morning, warm company. Just us against the world.", image_url: picnic, moment_date: "2023", is_default: true },
  { id: "default-6", title: "Ghariwarwa Pokhra Roaming", description: "Bikes parked, helmets on, exploring like we had all the time in the world.", image_url: pokhra1, moment_date: "2024", is_default: true },
  { id: "default-7", title: "Ghariwarwa Pokhra Moments", description: "More than just a place — it became a memory we'd carry forever.", image_url: pokhra2, moment_date: "2024", is_default: true },
  { id: "default-8", title: "Hetauda Adventure", description: "The stupidest, most reckless trip — no RC, no license, just pure trust and brotherhood.", image_url: hetauda, moment_date: "2023", is_default: true },
  { id: "default-9", title: "Mugal Biryani House", description: "Good food, better company. Where we solved life's problems one plate at a time.", image_url: biryani, moment_date: "2024", is_default: true },
  { id: "default-10", title: "Birthday Party at Hotel", description: "Celebrating another year, celebrating us. Dressed sharp, hearts full.", image_url: birthday, moment_date: "2024", is_default: true },
];

const Moments = () => {
  const [dbMoments, setDbMoments] = useState<Moment[]>([]);
  const [selectedMoment, setSelectedMoment] = useState<Moment | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMoment, setEditingMoment] = useState<Moment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [momentDate, setMomentDate] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Combine default moments with database moments
  const allMoments = [...defaultMoments, ...dbMoments];

  useEffect(() => {
    fetchMoments();
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  };

  const fetchMoments = async () => {
    const { data, error } = await supabase
      .from("moments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to load moments:", error);
    } else {
      setDbMoments(data || []);
    }
    setIsLoading(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
      .from("moments")
      .upload(filePath, file);

    if (error) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }

    const { data } = supabase.storage
      .from("moments")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setMomentDate("");
    setImageFile(null);
    setImagePreview(null);
    setEditingMoment(null);
  };

  const openAddForm = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const openEditForm = (moment: Moment, e: React.MouseEvent) => {
    e.stopPropagation();
    if (moment.is_default) {
      toast({
        title: "Cannot edit",
        description: "Default moments cannot be edited",
        variant: "destructive",
      });
      return;
    }
    setEditingMoment(moment);
    setTitle(moment.title);
    setDescription(moment.description || "");
    setMomentDate(moment.moment_date);
    setImagePreview(moment.image_url);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let imageUrl = editingMoment?.image_url || "";

    if (imageFile) {
      const uploadedUrl = await uploadImage(imageFile);
      if (!uploadedUrl) {
        setIsSubmitting(false);
        return;
      }
      imageUrl = uploadedUrl;
    }

    if (!imageUrl) {
      toast({
        title: "Image required",
        description: "Please select an image",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    if (editingMoment) {
      const { error } = await supabase
        .from("moments")
        .update({
          title,
          description,
          moment_date: momentDate,
          image_url: imageUrl,
        })
        .eq("id", editingMoment.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update moment",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Moment updated",
        });
        fetchMoments();
        setIsFormOpen(false);
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from("moments")
        .insert({
          title,
          description,
          moment_date: momentDate,
          image_url: imageUrl,
        });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create moment",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Moment added",
        });
        fetchMoments();
        setIsFormOpen(false);
        resetForm();
      }
    }

    setIsSubmitting(false);
  };

  const handleDelete = async (moment: Moment, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (moment.is_default) {
      toast({
        title: "Cannot delete",
        description: "Default moments cannot be deleted",
        variant: "destructive",
      });
      return;
    }
    
    const { error } = await supabase
      .from("moments")
      .delete()
      .eq("id", moment.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete moment",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Deleted",
        description: "Moment removed",
      });
      fetchMoments();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

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
          <p className="text-lg text-muted-foreground mb-6">
            Where chaos looked like happiness.
          </p>
          {isAuthenticated && (
            <Button onClick={openAddForm} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Moment
            </Button>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allMoments.map((moment, index) => (
            <motion.div
              key={moment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => setSelectedMoment(moment)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)] h-full flex flex-col">
                {isAuthenticated && !moment.is_default && (
                  <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8"
                      onClick={(e) => openEditForm(moment, e)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="h-8 w-8"
                      onClick={(e) => handleDelete(moment, e)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <div className="flex-1 overflow-hidden bg-background/5 flex items-center justify-center min-h-[250px]">
                  <img
                    src={moment.image_url}
                    alt={moment.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1 text-foreground group-hover:text-primary transition-colors">
                    {moment.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{moment.moment_date}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {moment.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add/Edit Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-md bg-card/95 backdrop-blur-xl border-border">
          <DialogHeader>
            <DialogTitle>{editingMoment ? "Edit Moment" : "Add New Moment"}</DialogTitle>
            <DialogDescription>
              {editingMoment ? "Update this memory" : "Capture a new memory"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                required
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                value={momentDate}
                onChange={(e) => setMomentDate(e.target.value)}
                placeholder="e.g., 2024"
                required
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A short description..."
                rows={3}
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <div className="flex flex-col gap-2">
                {imagePreview && (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(editingMoment?.image_url || null);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {imagePreview ? "Change image" : "Upload image"}
                  </span>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsFormOpen(false);
                  resetForm();
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Saving..." : editingMoment ? "Update" : "Add"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

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
                    src={selectedMoment.image_url}
                    alt={selectedMoment.title}
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="mt-6">
                  <h2 className="text-3xl font-bold mb-2 text-primary">
                    {selectedMoment.title}
                  </h2>
                  <p className="text-sm text-accent mb-4">{selectedMoment.moment_date}</p>
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

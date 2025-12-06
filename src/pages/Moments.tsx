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

interface Moment {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  moment_date: string;
}

const Moments = () => {
  const [moments, setMoments] = useState<Moment[]>([]);
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
      toast({
        title: "Error",
        description: "Failed to load moments",
        variant: "destructive",
      });
    } else {
      setMoments(data || []);
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
      // Update existing moment
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
      // Create new moment
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

  const handleDelete = async (momentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    const { error } = await supabase
      .from("moments")
      .delete()
      .eq("id", momentId);

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

        {moments.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No moments yet. Add your first memory!</p>
          </div>
        ) : (
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
                  {isAuthenticated && (
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
                        onClick={(e) => handleDelete(moment.id, e)}
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
        )}
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

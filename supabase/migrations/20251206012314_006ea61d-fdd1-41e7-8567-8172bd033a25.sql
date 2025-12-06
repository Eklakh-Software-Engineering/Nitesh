-- Create moments table
CREATE TABLE public.moments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  moment_date TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.moments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read moments (public gallery)
CREATE POLICY "Anyone can view moments" 
ON public.moments 
FOR SELECT 
USING (true);

-- Allow authenticated users to insert moments
CREATE POLICY "Authenticated users can create moments" 
ON public.moments 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update moments
CREATE POLICY "Authenticated users can update moments" 
ON public.moments 
FOR UPDATE 
TO authenticated
USING (true);

-- Allow authenticated users to delete moments
CREATE POLICY "Authenticated users can delete moments" 
ON public.moments 
FOR DELETE 
TO authenticated
USING (true);

-- Create storage bucket for moment images
INSERT INTO storage.buckets (id, name, public) VALUES ('moments', 'moments', true);

-- Storage policies for moments bucket
CREATE POLICY "Anyone can view moment images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'moments');

CREATE POLICY "Authenticated users can upload moment images" 
ON storage.objects 
FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'moments');

CREATE POLICY "Authenticated users can update moment images" 
ON storage.objects 
FOR UPDATE 
TO authenticated
USING (bucket_id = 'moments');

CREATE POLICY "Authenticated users can delete moment images" 
ON storage.objects 
FOR DELETE 
TO authenticated
USING (bucket_id = 'moments');

-- Add realtime support
ALTER TABLE public.moments REPLICA IDENTITY FULL;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_moments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_moments_updated_at
BEFORE UPDATE ON public.moments
FOR EACH ROW
EXECUTE FUNCTION public.update_moments_updated_at();
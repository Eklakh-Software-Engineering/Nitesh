-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can update files" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete files" ON storage.objects;

-- Create owner-based update policy (users can only update their own files)
CREATE POLICY "Users can update their own files"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'moments' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create owner-based delete policy (users can only delete their own files)
CREATE POLICY "Users can delete their own files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'moments' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
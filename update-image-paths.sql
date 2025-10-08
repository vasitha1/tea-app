-- SQL Script to Update Product Image Paths for Vercel Deployment
-- Run this on your production PostgreSQL database

-- Show current image paths (for verification)
SELECT id, name, "imageUrl" as old_path
FROM product
WHERE "imageUrl" IS NOT NULL;

-- Update image paths: Remove /images/ prefix
UPDATE product 
SET "imageUrl" = REPLACE("imageUrl", '/images/', '/')
WHERE "imageUrl" LIKE '/images/%';

-- Verify the update
SELECT id, name, "imageUrl" as new_path
FROM product
WHERE "imageUrl" IS NOT NULL;

-- Optional: Show count of updated records
SELECT COUNT(*) as updated_count
FROM product
WHERE "imageUrl" LIKE '/%' AND "imageUrl" NOT LIKE '/images/%';


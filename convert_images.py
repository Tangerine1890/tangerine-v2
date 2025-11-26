import os
from PIL import Image
import pillow_avif

directory = '/Users/omarcherqaoui/.gemini/antigravity/brain/f87aaed2-1b71-4037-9c78-eca8d0204f56/'
files = [f for f in os.listdir(directory) if f.endswith('.avif')]

print(f"Found {len(files)} AVIF files")

for filename in files:
    try:
        path = os.path.join(directory, filename)
        img = Image.open(path)
        new_path = path.replace('.avif', '.png')
        img.save(new_path, 'PNG')
        print(f"Converted {filename} to PNG")
    except Exception as e:
        print(f"Failed to convert {filename}: {e}")

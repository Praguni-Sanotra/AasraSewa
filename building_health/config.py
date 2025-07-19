import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB Configuration
MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise ValueError("MONGO_URI environment variable must be set!")
DATABASE_NAME = os.getenv("DATABASE_NAME", "aasrasewa")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "properties")

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME")
CLOUDINARY_API_KEY = os.getenv("CLOUDINARY_API_KEY")
CLOUDINARY_API_SECRET = os.getenv("CLOUDINARY_API_SECRET")
if not all([CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET]):
    raise ValueError("Cloudinary environment variables must be set!")

# File Paths
YOLO_MODEL_PATH = os.path.join(os.getcwd(), "best.pt")
OUTPUT_DIR = "output_reports"
PROCESSED_DIR = os.path.join(OUTPUT_DIR, "processed")
PDF_DIR = os.path.join(OUTPUT_DIR, "pdfs") 
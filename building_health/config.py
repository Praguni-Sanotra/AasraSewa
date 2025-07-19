import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB Configuration
<<<<<<< HEAD
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
=======
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/aasrasewa")
DATABASE_NAME = "aasrasewa"
COLLECTION_NAME = "properties"

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME", "dfdfmx8mo")
CLOUDINARY_API_KEY = os.getenv("CLOUDINARY_API_KEY", "627233848483887")
CLOUDINARY_API_SECRET = os.getenv("CLOUDINARY_API_SECRET", "QJ9xBrqzhxqgpC3gtwAywNxOrCc")
>>>>>>> d39ecafc5e287c027907a6c3b60849c13bf46702

# File Paths
YOLO_MODEL_PATH = os.path.join(os.getcwd(), "best.pt")
OUTPUT_DIR = "output_reports"
PROCESSED_DIR = os.path.join(OUTPUT_DIR, "processed")
PDF_DIR = os.path.join(OUTPUT_DIR, "pdfs") 
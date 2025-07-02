import os
import logging
from ultralytics import YOLO
from PIL import Image
from fpdf import FPDF
from dotenv import load_dotenv
import openai
import urllib.request
import cloudinary.uploader
import cloudinary.api
import cloudinary

# Load environment variables
load_dotenv()

# Logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# OpenAI API Key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Cloudinary config (explicit)
cloudinary.config(
    cloud_name="dfdfmx8mo",
    api_key="627233848483887",
    api_secret="QJ9xBrqzhxqgpC3gtwAywNxOrCc",
    secure=True
)

# Paths
YOLO_MODEL_PATH = os.path.join(os.getcwd(), "best.pt")
OUTPUT_DIR = "output_reports"
PROCESSED_DIR = os.path.join(OUTPUT_DIR, "processed")
PDF_DIR = os.path.join(OUTPUT_DIR, "pdfs")

os.makedirs(PROCESSED_DIR, exist_ok=True)
os.makedirs(PDF_DIR, exist_ok=True)

def download_image(image_url, save_path):
    urllib.request.urlretrieve(image_url, save_path)
    logging.info(f"📥 Downloaded image to {save_path}")
    return save_path

def detect_cracks(image_path):
    model = YOLO(YOLO_MODEL_PATH)
    results = model(image_path)

    crack_count = 0
    confidences = []

    for box in results[0].boxes:
        if int(box.cls[0]) == 0:  # Assuming class 0 = crack
            crack_count += 1
            confidences.append(float(box.conf[0]))

    img_with_boxes = results[0].plot()
    processed_path = os.path.join(PROCESSED_DIR, os.path.basename(image_path))
    Image.fromarray(img_with_boxes).save(processed_path)

    logging.info(f"🔍 {os.path.basename(image_path)} → {crack_count} cracks detected")

    return processed_path, crack_count, confidences

def generate_analysis(image_scores, avg_score):
    analysis = "AI-Based Structural Crack Analysis:\n"
    analysis += f"\nOverall Average Score (out of 10): {avg_score:.1f}\n\n"
    for wall, score in image_scores.items():
        analysis += f"- {wall.title()} Wall: {score:.1f}/10\n"

    if avg_score < 4:
        severity = "High"
        recommendation = "Immediate structural inspection and repair is recommended."
    elif avg_score < 7:
        severity = "Medium"
        recommendation = "Monitor the structure and consider a professional inspection."
    else:
        severity = "Low"
        recommendation = "Structure is likely healthy. No immediate action needed."

    analysis += f"\nSeverity Level: {severity}\nRecommendation: {recommendation}"
    return analysis

def generate_pdf_report(image_data, property_id, analysis):
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()

    pdf.set_font("Arial", "B", 16)
    pdf.cell(0, 10, "Building Health Inspection Report", ln=True, align="C")

    img_count = 0
    for wall, img_path in image_data.items():
        if img_count > 0 and img_count % 2 == 0 and img_count // 2 < 4:
            pdf.add_page()
        pdf.set_font("Arial", "B", 12)
        pdf.cell(0, 10, f"{wall.title()} Wall", ln=True)
        pdf.image(img_path, w=120)
        img_count += 1

    pdf.set_font("Arial", "B", 14)
    pdf.cell(0, 10, "\nAI-Based Risk Analysis", ln=True)
    pdf.set_font("Arial", "", 12)

    safe_analysis = analysis.encode('latin-1', errors='ignore').decode('latin-1')
    pdf.multi_cell(0, 10, safe_analysis)

    pdf_path = os.path.join(PDF_DIR, f"{property_id}_health_report.pdf")
    pdf.output(pdf_path)
    logging.info(f"📄 PDF saved at {pdf_path}")
    return pdf_path

def upload_pdf_to_cloudinary(pdf_path):
    try:
        result = cloudinary.uploader.upload(pdf_path, resource_type="raw")
        cloud_url = result.get("secure_url")
        logging.info(f"☁️ Uploaded PDF to Cloudinary: {cloud_url}")
        return cloud_url
    except Exception as e:
        logging.error(f"❌ Cloudinary upload failed: {e}")
        return None

def generate_building_health_report(image_urls_dict, property_id):
    if not (4 <= len(image_urls_dict) <= 6):
        raise ValueError("Number of images must be between 4 and 6.")

    local_image_paths = {}
    image_scores = {}
    total_score = 0
    total_confidences = []

    for wall, url in image_urls_dict.items():
        img_local_path = os.path.join(PROCESSED_DIR, f"{property_id}_{wall}.jpg")
        download_image(url, img_local_path)

        processed_img_path, crack_count, confidences = detect_cracks(img_local_path)
        local_image_paths[wall] = processed_img_path

        score = 10 - crack_count * 1.5
        score = max(0, min(10, score))
        image_scores[wall] = score
        total_score += score
        total_confidences.extend(confidences)

    avg_score = total_score / len(image_scores)
    analysis = generate_analysis(image_scores, avg_score)

    pdf_path = generate_pdf_report(local_image_paths, property_id, analysis)
    cloud_url = upload_pdf_to_cloudinary(pdf_path)

    return cloud_url

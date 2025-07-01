# app.py

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from building_health_report import generate_building_health_report
import os
import logging

app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

@app.route("/", methods=["GET"])
def home():
    return "🏗️ Building Health Analysis Server Running"

@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        data = request.get_json()
        images = data.get("images")
        property_id = data.get("propertyId")

        if not images or not property_id:
            return jsonify({"message": "Missing image data or property ID"}), 400

        pdf_path = generate_building_health_report(images, property_id)
        filename = os.path.basename(pdf_path)

        return jsonify({
            "message": "Analysis complete.",
            "pdf_url": f"/pdf/{filename}"
        }), 200
    except Exception as e:
        logging.error(f"❌ Error in /analyze: {e}")
        return jsonify({"message": "Analysis failed"}), 500

@app.route("/pdf/<filename>", methods=["GET"])
def get_pdf(filename):
    pdf_dir = os.path.join(os.getcwd(), "output_reports", "pdfs")
    return send_from_directory(pdf_dir, filename)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)

from flask import Flask, request, jsonify
from flask_cors import CORS
from building_health_report import generate_building_health_report
import logging

app = Flask(__name__)
# CORS(app, origins=["https://aasrasewa-frontend-vsxu.onrender.com"], supports_credentials=True)
CORS(app, origins=["http://localhost:5173", "https://your-production-site.com"], supports_credentials=True)

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

        cloudinary_pdf_url = generate_building_health_report(images, property_id)

        if not cloudinary_pdf_url:
            return jsonify({"message": "Cloudinary upload failed. Check backend logs for details."}), 500

        return jsonify({
            "message": "Analysis complete.",
            "pdf_url": cloudinary_pdf_url
        }), 200
    except Exception as e:
        import traceback
        tb = traceback.format_exc()
        logging.error(f"❌ Error in /analyze: {e}\n{tb}")
        return jsonify({"message": f"Analysis failed: {str(e)}", "traceback": tb}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)

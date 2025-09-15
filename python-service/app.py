from flask import Flask, request, jsonify
from flask_cors import CORS
from pdf_parser import extract_text_from_base64
from gemini_analysis import analyze_resume_with_gemini
from models import build_response

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.get_json()
        print(">>> Incoming request data:", data)

        resume_base64 = data.get('resume')
        job_description = data.get('jobDescription') or data.get('jobRole')

        if not resume_base64 or not job_description:
            return jsonify({"suggestions": ["❌ Missing resume or job description."]}), 400

        resume_text = extract_text_from_base64(resume_base64)
        result = analyze_resume_with_gemini(resume_text, job_description)

        print(">>> Gemini result:", result)

        response = build_response(
            ats_score=result.get("atsScore", 0),
            match_percentage=result.get("matchPercentage", 0),
            suggestions=result.get("suggestions", ["❌ Gemini failed to provide suggestions"]),
            job_matches=result.get("jobMatches", [])
        )

        print(">>> Final response to Spring Boot:", response)
        return jsonify(response)

    except Exception as e:
        print(">>> Error:", str(e))
        return jsonify(build_response(0, 0, [f"❌ Error: {str(e)}"], [])), 500

# ✅ Main entry point (outside of any function)
if __name__ == "__main__":
    print("🚀 Starting Flask server on http://127.0.0.1:8000")
    app.run(debug=True, port=8000)

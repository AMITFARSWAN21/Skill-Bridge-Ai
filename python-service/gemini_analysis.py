import os
import requests
from dotenv import load_dotenv
import json
import re

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

def analyze_resume_with_gemini(resume_text, job_description):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"

    prompt = f"""
You are an advanced ATS (Applicant Tracking System) Resume Analyzer with expertise in job matching and providing actionable feedback. Your task is to thoroughly analyze the given resume against the provided job description.

Instructions:
1. Carefully compare the resume content with the job requirements.
2. Assess the overall ATS compatibility of the resume.
3. Calculate the match percentage based on skills, experience, and qualifications.
4. Provide specific, actionable suggestions for improving the resume.
5. Suggest relevant job matches based on the candidate's profile.

Return the analysis result strictly in the following JSON format:

{{
  "atsScore": <integer between 0-100>,
  "matchPercentage": <integer between 0-100>,
  "suggestions": [
    <string: Specific, actionable suggestion>,
    <string: Specific, actionable suggestion>,
    ...
  ],
  "jobMatches": [
    {{
      "title": <string: Job title>,
      "company": <string: Company name>,
      "location": <string: Job location or "Remote">
    }},
    ...
  ]
}}

Guidelines:
- ATS Score: Consider formatting, keywords, and overall structure. Higher scores for well-formatted, keyword-rich resumes.
- Match Percentage: Evaluate the alignment of skills, experience, and qualifications with the job description.
- Suggestions: Provide 3-5 specific, actionable tips to improve the resume or application. Focus on addressing gaps and enhancing relevance.
- Job Matches: Suggest 2-4 relevant job positions based on the candidate's skills and experience. Include a mix of exact and related roles.

Resume:
{resume_text}

Job Description:
{job_description}

Analyze thoroughly and provide a comprehensive, accurate, and helpful response.
"""

    headers = {
        "Content-Type": "application/json"
    }

    data = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
                    }
                ]
            }
        ]
    }

    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()

        content = response.json()

        # Extract response text
        text_response = content['candidates'][0]['content']['parts'][0]['text']
        print("Gemini Raw Response:\n", text_response)

        # Extract JSON block safely
        match = re.search(r"\{.*\}", text_response, re.DOTALL)
        if not match:
            raise ValueError("JSON not found in Gemini response")

        return json.loads(match.group())

    except Exception as e:
        print("Gemini error:", e)
        return {
            "atsScore": 0,
            "matchPercentage": 0,
            "suggestions": ["❌ Error: Unable to parse Gemini response"],
            "jobMatches": []
        }
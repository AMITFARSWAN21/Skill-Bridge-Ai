def build_response(ats_score, match_percentage, suggestions, job_matches):
    return {
        "atsScore": ats_score,
        "matchPercentage": match_percentage,
        "suggestions": suggestions,
        "jobMatches": job_matches
    }

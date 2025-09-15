import requests

def fetch_indeed_job_suggestions():
    url = "https://indeed-scraper-api.p.rapidapi.com/api/job"
    headers = {
        "Content-Type": "application/json",
        "x-rapidapi-host": "indeed-scraper-api.p.rapidapi.com",
        "x-rapidapi-key": "f30deda6f0msh1ca31a0cfbd25dap14af79jsn6a813f4798e6"
    }
    payload = {
        "scraper": {
            "maxRows": 15,
            "query": "Developer",
            "location": "San Francisco",
            "jobType": "fulltime",
            "radius": "50",
            "sort": "relevance",
            "fromDays": "7",
            "country": "us"
        }
    }

    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()

        job_data = response.json()
        job_list = job_data.get("returnvalue", {}).get("data", [])

        job_suggestions = []

        for job in job_list[:4]:  # Limit to 4 for Gemini
            title = job.get("title", "Unknown Title")
            company = job.get("companyName", "Unknown Company")
            location = job.get("location", {}).get("formattedAddressShort", "Remote")

            job_suggestions.append({
                "title": title,
                "company": company,
                "location": location
            })

        return job_suggestions

    except Exception as e:
        print("❌ Error fetching Indeed job suggestions:", e)
        return [
            {"title": "Software Engineer", "company": "CodeCraft", "location": "Remote"},
            {"title": "Java Backend Dev", "company": "TechBloom", "location": "Bangalore"}
        ]

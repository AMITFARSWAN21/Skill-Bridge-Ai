package com.authify.service;
import com.authify.io.RoadMapRequest;
import com.authify.io.RoadMapResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpStatusCodeException;

import java.util.*;

@Service
public class RoadMapService {

    @Value("${gemini.api.key}")
    private String GEMINI_API_KEY;

    private final String GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=";


    public RoadMapResponse generateRoadmapFromGemini(RoadMapRequest request) {
        String prompt = buildPrompt(request.getRole(), request.getExperience());

        // Construct request payload
        Map<String, Object> contentPart = Map.of("text", prompt);
        Map<String, Object> content = Map.of("parts", List.of(contentPart));
        Map<String, Object> payload = Map.of("contents", List.of(content));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> httpRequest = new HttpEntity<>(payload, headers);

        RestTemplate restTemplate = new RestTemplate();

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(
                    GEMINI_URL + GEMINI_API_KEY,
                    httpRequest,
                    Map.class
            );

            // Extract the generated roadmap text from the response
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.getBody().get("candidates");
            if (candidates != null && !candidates.isEmpty()) {
                Map<String, Object> contentMap = (Map<String, Object>) candidates.get(0).get("content");
                List<Map<String, Object>> parts = (List<Map<String, Object>>) contentMap.get("parts");
                String roadmapText = (String) parts.get(0).get("text");

                return new RoadMapResponse(roadmapText);
            } else {
                return new RoadMapResponse("❌ Gemini didn't return a valid roadmap. Try again.");
            }

        } catch (HttpStatusCodeException e) {
            return new RoadMapResponse("❌ Error from Gemini API: " + e.getResponseBodyAsString());
        } catch (Exception e) {
            return new RoadMapResponse("❌ Internal error while generating roadmap: " + e.getMessage());
        }
    }

    private String buildPrompt(String role, String experience) {
        return String.format("""
    🚀 Create a comprehensive career roadmap for someone wanting to become a %s with %s years of experience.
    
    📋 FORMATTING REQUIREMENTS:
    ✅ Use attractive emojis and visual separators
    ✅ Create scannable, well-structured content
    ✅ Include visual hierarchy with proper spacing
    ✅ Use consistent bullet point styles with relevant icons
    
    🎯 ROADMAP STRUCTURE:
    Create exactly 4 progressive learning phases with these components for each phase:
    
    ═══════════════════════════════════════════════════════════════
    ✨ ROADMAP FOR %s DEVELOPER (%s YEARS EXPERIENCE) ✨
    ═══════════════════════════════════════════════════════════════
    
    📊 PHASE [NUMBER]: [PHASE NAME]
    ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
    
    🎯 PHASE OBJECTIVES:
    ▸ Primary goal 1
    ▸ Primary goal 2  
    ▸ Primary goal 3
    
    🛠️ CORE SKILLS TO MASTER:
    🔹 Technical skill 1 (beginner/intermediate/advanced level)
    🔹 Technical skill 2 (beginner/intermediate/advanced level)
    🔹 Technical skill 3 (beginner/intermediate/advanced level)
    🔹 Soft skill 1
    🔹 Soft skill 2
    
    🗺️ VISUAL LEARNING PATH:
    ```
    [Create a simple ASCII mindmap showing the flow of skills]
    Example:
           Fundamentals
               │
        ┌──────┼──────┐
        │      │      │
    Skill A  Skill B  Skill C
        │      │      │
    Project 1 ──┴── Project 2
    ```
    
    ⏰ TIMELINE: [X weeks/months] 
    📈 DIFFICULTY LEVEL: [Beginner/Intermediate/Advanced]
    
    ═══════════════════════════════════════════════════════════════
    
    [Repeat structure for all 4 phases]
    
    🎤 INTERVIEW PREPARATION
    ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
    🔥 HIGH-PRIORITY TOPICS:
    ⚡ Topic 1 - [Why important + example question]
    ⚡ Topic 2 - [Why important + example question]
    ⚡ Topic 3 - [Why important + example question]
    ⚡ Topic 4 - [Why important + example question]
    ⚡ Topic 5 - [Why important + example question]
    
    💡 PRACTICAL CODING CHALLENGES:
    🧩 Challenge type 1 (Easy-Medium difficulty)
    🧩 Challenge type 2 (Medium difficulty)  
    🧩 Challenge type 3 (Medium-Hard difficulty)
    
    🎯 BEHAVIORAL QUESTIONS PREP:
    💬 "Tell me about a challenging project..."
    💬 "How do you handle tight deadlines..."
    💬 "Describe a time you learned a new technology..."
    
    🏆 CAREER ADVANCEMENT
    ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
    🏅 RECOMMENDED CERTIFICATIONS:
    🥇 [Certification Name] - [Provider] (Priority: High/Medium/Low)
       └─ Cost: [Amount] | Duration: [Time] | Value: [Why worth it]
    🥇 [Certification Name] - [Provider] (Priority: High/Medium/Low)
       └─ Cost: [Amount] | Duration: [Time] | Value: [Why worth it]
    
    📊 PORTFOLIO REQUIREMENTS:
    ✨ Must-have project types:
    🎨 Project 1 type - [Technologies to showcase]
    🎨 Project 2 type - [Technologies to showcase]  
    🎨 Project 3 type - [Technologies to showcase]
    
    🌟 PROFESSIONAL DEVELOPMENT:
    🤝 Networking: [Specific communities, events, platforms]
    📝 Content Creation: [Blog topics, platforms to use]
    🎯 Open Source: [Types of contributions to make]
    
    💎 KEY SUCCESS FACTORS
    ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
    🎯 MINDSET & HABITS:
    ✅ Critical success factor 1
    ✅ Critical success factor 2
    ✅ Critical success factor 3
    
    ⚠️ COMMON PITFALLS TO AVOID:
    ❌ Mistake 1 and how to avoid it
    ❌ Mistake 2 and how to avoid it
    ❌ Mistake 3 and how to avoid it
    
    🚀 NEXT STEPS:
    1️⃣ Immediate action (this week)
    2️⃣ Short-term goal (next month)  
    3️⃣ Long-term vision (6-12 months)
    
    ═══════════════════════════════════════════════════════════════
    💪 YOU'VE GOT THIS! START WITH PHASE 1 TODAY! 🎯
    ═══════════════════════════════════════════════════════════════
    
    ADDITIONAL FORMATTING NOTES:
    - Use consistent spacing between sections
    - Make headers stand out with decorative lines
    - Include difficulty indicators and time estimates
    - Add motivational elements and clear next steps
    - Ensure each bullet point has a relevant emoji/icon
    - Create visual hierarchy with indentation and symbols
    - Include practical examples and specific recommendations
    """, role, experience, role, experience);
    }
}

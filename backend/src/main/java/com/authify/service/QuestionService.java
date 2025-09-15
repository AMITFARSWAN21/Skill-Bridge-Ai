package com.authify.service;

import com.authify.io.Question;
import com.authify.io.TopicRequest;
import com.authify.io.TopicResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class QuestionService {

    @Value("${gemini.api.key}")
    private String GEMINI_API_KEY;

    private final String GEMINI_URL =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=";

    public TopicResponse generateQuestion(TopicRequest topicRequest) {
        String prompt = buildPrompt(topicRequest.getTopic(), topicRequest.getType());

        Map<String, Object> content = Map.of("parts", List.of(Map.of("text", prompt)));
        Map<String, Object> payload = Map.of("contents", List.of(content));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);

        RestTemplate restTemplate = new RestTemplate();

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(
                    GEMINI_URL + GEMINI_API_KEY,
                    request,
                    Map.class
            );

            List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.getBody().get("candidates");
            if (candidates != null && !candidates.isEmpty()) {
                Map<String, Object> contentMap = (Map<String, Object>) candidates.get(0).get("content");
                List<Map<String, Object>> parts = (List<Map<String, Object>>) contentMap.get("parts");
                String rawText = (String) parts.get(0).get("text");

                List<Question> parsedQuestions = "MCQ".equalsIgnoreCase(topicRequest.getType())
                        ? parseMCQs(rawText)
                        : parseSubjective(rawText);

                return new TopicResponse(parsedQuestions);
            } else {
                return new TopicResponse(Collections.emptyList());
            }

        } catch (Exception e) {
            e.printStackTrace();
            return new TopicResponse(Collections.emptyList());
        }
    }

    private String buildPrompt(String topic, String type) {
        if ("MCQ".equalsIgnoreCase(type)) {
            return "Generate exactly 5 MCQs on the topic \"" + topic + "\" in the following format:\n" +
                    "Q1. <Question text>\n" +
                    "A. <Option A>\n" +
                    "B. <Option B>\n" +
                    "C. <Option C>\n" +
                    "D. <Option D>\n" +
                    "✅ Answer: <A/B/C/D>";
        } else {
            return "Generate exactly 5 subjective-style interview questions on the topic \"" + topic + "\". Number them as 1., 2., etc.";
        }
    }

    private List<Question> parseMCQs(String rawText) {
        List<Question> questions = new ArrayList<>();

        // Split by question blocks starting with "Q1.", "Q2.", etc.
        String[] questionBlocks = rawText.split("(?=Q\\d+\\.)");

        for (String block : questionBlocks) {
            if (block.trim().isEmpty()) continue;

            String[] lines = block.trim().split("\\n");
            String questionText = "";
            List<String> options = new ArrayList<>();
            String correctAnswer = "";
            boolean isQuestionBlock = false;

            for (String line : lines) {
                line = line.trim();

                if (line.matches("^Q\\d+\\..*")) {
                    questionText = line.replaceFirst("Q\\d+\\.\\s*", "").trim();
                    isQuestionBlock = true;
                } else if (line.matches("^[A-Da-d]\\..*")) {
                    options.add(line);
                } else if ((line.contains("✅") || line.toLowerCase().contains("answer:")) && isQuestionBlock) {
                    // Extract the answer letter (A, B, C, or D)
                    String answerPart = line.replaceAll("(?i).*answer:\\s*([A-Da-d]).*", "$1");
                    if (!answerPart.equals(line)) { // If replacement happened
                        correctAnswer = answerPart.toUpperCase();
                    }
                }
            }

            if (!questionText.isEmpty() && !options.isEmpty() && !correctAnswer.isEmpty()) {
                questions.add(new Question(questionText, options, correctAnswer, "MCQ"));
            }
        }

        return questions;
    }

    private List<Question> parseSubjective(String rawText) {
        List<Question> questions = new ArrayList<>();
        String[] parts = rawText.split("(?i)(\\d+\\.)");

        for (String part : parts) {
            if (!part.trim().isEmpty()) {
                questions.add(new Question(part.trim(), null, null, "Subjective"));
            }
        }
        return questions;
    }
}

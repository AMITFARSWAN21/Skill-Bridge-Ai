package com.authify.service;

import com.authify.entity.JobMatch;
import com.authify.entity.ResumeAnalysis;
import com.authify.io.AiResponseResume;
import com.authify.io.ResumeRequest;
import com.authify.repository.ResumeAnalysisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResumeAnalysisService {

    private final RestTemplate restTemplate;
    private final ResumeAnalysisRepository resumeAnalysisRepository;

    @Autowired
    public ResumeAnalysisService(RestTemplate restTemplate, ResumeAnalysisRepository resumeAnalysisRepository) {
        this.restTemplate = restTemplate;
        this.resumeAnalysisRepository = resumeAnalysisRepository;
    }

    public AiResponseResume analyze(MultipartFile resume, String jobRole) throws IOException {
        // Convert to Base64
        String base64Resume = Base64.getEncoder().encodeToString(resume.getBytes());

        ResumeRequest requestDTO = new ResumeRequest(base64Resume, jobRole);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<ResumeRequest> entity = new HttpEntity<>(requestDTO, headers);

        try {
            ResponseEntity<AiResponseResume> response = restTemplate.postForEntity(
                    "http://localhost:8000/analyze",
                    entity,
                    AiResponseResume.class
            );

            AiResponseResume result = response.getBody();

            if (result == null) {
                throw new RuntimeException("Flask returned null response");
            }

            List<JobMatch> jobMatchList = result.getJobMatches().stream()
                    .map(map -> new JobMatch(map.get("title"), map.get("company")))
                    .collect(Collectors.toList());

            ResumeAnalysis analysis = ResumeAnalysis.builder()
                    .atsScore(result.getAtsScore())
                    .matchPercent(result.getMatchPercent())
                    .jobRole(jobRole)
                    .suggestions(result.getSuggestions() != null ? result.getSuggestions() : List.of())
                    .jobMatch(jobMatchList != null ? jobMatchList : List.of())
                    .build();

            resumeAnalysisRepository.save(analysis);

            return result;

        } catch (Exception e) {
            e.printStackTrace();
            return new AiResponseResume("❌ Internal error: " + e.getMessage());
        }
    }
}

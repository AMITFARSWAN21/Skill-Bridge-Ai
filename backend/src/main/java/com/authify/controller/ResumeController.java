package com.authify.controller;

import com.authify.entity.ResumeAnalysis;
import com.authify.io.AiResponseResume;
import com.authify.repository.ResumeAnalysisRepository;
import com.authify.service.ResumeAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1.0/resume")
public class ResumeController {

    @Autowired
    private ResumeAnalysisService resumeAnalysisService;

    @Autowired
    private ResumeAnalysisRepository resumeAnalysisRepository;

    @PostMapping("/analyze-resume")
    public ResponseEntity<AiResponseResume> analyzeResume(
            @RequestParam("resume")MultipartFile resume,
            @RequestParam("jobRole") String jobRole)
    {
        try {
            AiResponseResume responseResume=resumeAnalysisService.analyze(resume,jobRole);
            return ResponseEntity.ok(responseResume);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AiResponseResume("Error: " + e.getMessage()));
        }
    }

    @GetMapping("/all")
    public List<ResumeAnalysis> getAllAnalysis()
    {
        return resumeAnalysisRepository.findAll();
    }

}

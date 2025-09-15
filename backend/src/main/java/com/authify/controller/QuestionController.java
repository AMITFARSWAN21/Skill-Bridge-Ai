package com.authify.controller;

import com.authify.io.TopicRequest;
import com.authify.io.TopicResponse;
import com.authify.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1.0/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PostMapping("/generate")
    public TopicResponse generateQuestions(@RequestBody TopicRequest topicRequest)
    {
        return questionService.generateQuestion(topicRequest);
    }


}

package com.authify.io;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Question {
    private String questionText;
    private List<String> options;     // for MCQ
    private String correctAnswer;     // for MCQ
    private String type;              // "MCQ" or "Subjective"
}

package com.authify.io;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResumeRequest {
    private String resume;
    private String jobDescription;
}

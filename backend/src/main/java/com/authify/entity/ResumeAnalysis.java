package com.authify.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ResumeAnalysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int atsScore;

    @Column(name = "match_percentage")
    private int matchPercent;


    @ElementCollection
    private List<String> suggestions;

    @Column(name = "job_role")
    private String jobRole;

    @ElementCollection
    @CollectionTable(name = "job_match", joinColumns = @JoinColumn(name = "analysis_id"))
    private List<JobMatch> jobMatch;
}

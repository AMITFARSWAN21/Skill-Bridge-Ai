package com.authify.controller;

import com.authify.io.RoadMapRequest;
import com.authify.io.RoadMapResponse;
import com.authify.service.RoadMapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1.0/roadmap")
public class RoadMapController {

    @Autowired
    private RoadMapService roadMapService;

    @PostMapping("/generate")
    public RoadMapResponse getRoadMap(@RequestBody RoadMapRequest request) {
        return roadMapService.generateRoadmapFromGemini(request);
    }
}

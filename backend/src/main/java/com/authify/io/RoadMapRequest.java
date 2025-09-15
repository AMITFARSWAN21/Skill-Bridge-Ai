package com.authify.io;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class RoadMapRequest {
    private String role;
    private String experience;
}

package com.authify.io;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class TopicRequest {
    private String topic;
    private String type;
}

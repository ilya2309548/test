package com.example.forum_back.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CommentDto {
    private Long id;
    private Long postId;
    private String username;
    private String content;
    private LocalDateTime createdAt;
}

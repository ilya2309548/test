package com.example.forum_back.model;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "posts")
@Data
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;
    private String username; // Сохраняем имя пользователя из Keycloak

    private LocalDateTime createdAt = LocalDateTime.now();
}

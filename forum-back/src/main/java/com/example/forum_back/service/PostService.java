package com.example.forum_back.service;

import com.example.forum_back.dto.PostDto;
import com.example.forum_back.model.Post;
import com.example.forum_back.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;

    public List<PostDto> getAllPosts() {
        return postRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

        public List<PostDto> getPostsByUsername(String username) {
        return postRepository.findByUsername(username)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public PostDto createPost(PostDto postDto) {
        String username = getCurrentUsername();

        Post post = new Post();
        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        post.setUsername(username);
        post = postRepository.save(post);

        return convertToDto(post);
    }

    private PostDto convertToDto(Post post) {
        PostDto dto = new PostDto();
        dto.setId(post.getId());
        dto.setTitle(post.getTitle());
        dto.setContent(post.getContent());
        dto.setUsername(post.getUsername());
        dto.setCreatedAt(post.getCreatedAt());
        return dto;
    }

    private String getCurrentUsername() {
        Jwt jwt = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return jwt.getClaim("preferred_username"); // Извлекаем имя пользователя из токена
    }
}

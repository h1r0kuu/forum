package com.site.forum.dto;

import com.site.forum.entity.Forum;
import com.site.forum.entity.Post;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.time.LocalDateTime;

@Data
public class PostDto {
    private Long id;
    private String title;
    private Forum forum;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public PostDto convertToDto(Post post) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(post, PostDto.class);
    }

    public Post convertToEntity(PostDto postDto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(postDto, Post.class);
    }
}

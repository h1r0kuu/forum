package com.site.forum.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.site.forum.entity.Forum;
import com.site.forum.entity.Post;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class PostDto {
    private Long id;
    private String title;
    private ForumDto forum;
    private Set<CommentDto> comments;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public PostDto convertToDto(Post post) {
        ModelMapper modelMapper = new ModelMapper();
        CommentDto commentDto = new CommentDto();
        PostDto dto = modelMapper.map(post, PostDto.class);
        dto.setComments( post.getComments().stream()
                                           .map(commentDto::convertToDto)
                                           .collect(Collectors.toSet()));

        return dto;
    }

    public Post convertToEntity(PostDto postDto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(postDto, Post.class);
    }
}

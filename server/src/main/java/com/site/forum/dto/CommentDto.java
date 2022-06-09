package com.site.forum.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.site.forum.entity.Comment;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.time.LocalDateTime;

@Data
public class CommentDto {
    private Long id;
    private String text;
    private UserDto user;
//    private PostDto post;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public CommentDto convertToDto(Comment comment) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(comment, CommentDto.class);
    }

    public Comment convertToEntity(CommentDto commentDto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(commentDto, Comment.class);
    }
}

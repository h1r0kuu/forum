package com.site.forum.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.site.forum.entity.Comment;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.time.LocalDateTime;
import java.util.Objects;

@Data
public class CommentDto {
    private Long id;
    private String text;
    private UserDto user;
//    private PostDto post;
    private int likes;
    private int dislikes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public CommentDto convertToDto(Comment comment) {
        ModelMapper modelMapper = new ModelMapper();
        CommentDto dto = modelMapper.map(comment, CommentDto.class);
        dto.setLikes(Objects.nonNull(comment.getLikes()) ? comment.getLikes().size() : 0);
        dto.setDislikes(Objects.nonNull(comment.getLikes()) ? comment.getLikes().size() : 0);
        return dto;
    }

    public Comment convertToEntity(CommentDto commentDto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(commentDto, Comment.class);
    }
}

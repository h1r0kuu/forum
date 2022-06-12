package com.site.forum.dto;

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
    private int likesCount;
    private int dislikesCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public CommentDto convertToDto(Comment comment) {
        ModelMapper modelMapper = new ModelMapper();
        CommentDto dto = modelMapper.map(comment, CommentDto.class);
        dto.setLikesCount(Objects.nonNull(comment.getLikes()) ? comment.getLikes().size() : 0);
        dto.setDislikesCount(Objects.nonNull(comment.getLikes()) ? comment.getLikes().size() : 0);
        return dto;
    }

    public Comment convertToEntity(CommentDto commentDto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(commentDto, Comment.class);
    }
}

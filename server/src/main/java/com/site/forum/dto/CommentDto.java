package com.site.forum.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.site.forum.entity.Comment;
import com.site.forum.serializers.CommentDtoSerializer;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.modelmapper.ModelMapper;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@EqualsAndHashCode(exclude = {"replies", "parentComment", "user"})
@JsonSerialize(using = CommentDtoSerializer.class)
public class CommentDto {
    private Long id;
    @Size(min = 3, max = 255, message = "The text must be between 3 and 255 characters long")
    private String text;
    @NotNull(message = "User cannot be null")
    private UserDto user;
    private int likesCount;
    private int dislikesCount;
    private CommentDto parentComment;
    private Set<CommentDto> replies;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public CommentDto convertToDto(Comment comment) {
        ModelMapper modelMapper = new ModelMapper();
        CommentDto dto = modelMapper.map(comment, CommentDto.class);
        dto.setLikesCount(Objects.nonNull(comment.getLikes()) ? comment.getLikes().size() : 0);
        dto.setDislikesCount(Objects.nonNull(comment.getDislikes()) ? comment.getDislikes().size() : 0);
        dto.setReplies( Objects.nonNull(comment.getReplies())
                ? comment.getReplies().stream().map(this::convertToDto).collect(Collectors.toSet())
                : Collections.emptySet()
        );
        return dto;
    }

    public Comment convertToEntity(CommentDto commentDto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(commentDto, Comment.class);
    }
}

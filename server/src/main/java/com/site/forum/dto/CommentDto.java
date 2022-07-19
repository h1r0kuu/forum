package com.site.forum.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.site.forum.serializers.CommentDtoSerializer;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@EqualsAndHashCode(exclude = {"replies", "parentComment", "user"})
@JsonSerialize(using = CommentDtoSerializer.class)
public class CommentDto {
    private Long id;
    @Size(min = 3, max = 255, message = "The text must be between 3 and 255 characters long")
    private String text;
    @NotNull(message = "User cannot be null")
    private UserDto user;
    private Set<UserDto> likes;
    private Set<UserDto> dislikes;
    private CommentDto parentComment;
    private Set<CommentDto> replies;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

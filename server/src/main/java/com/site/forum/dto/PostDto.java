package com.site.forum.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.site.forum.serializers.PostDtoSerializer;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@ToString
@EqualsAndHashCode(exclude = {"creator", "forum"})
@JsonSerialize(using = PostDtoSerializer.class)
public class PostDto {
    private Long id;
    @Size(min = 3, max = 16, message = "The title must be between 3 and 16 characters long")
    private String title;
    @Size(min = 3, message = "The text must be more than 3 characters long")
    private String text;
    private Boolean closed;
    @NotNull(message = "Forum cannot be null")
    private ForumDto forum;
    @NotNull(message = "Creator cannot be null")
    private UserDto creator;
    private Set<CommentDto> comments = new HashSet<>();
    private Set<UserDto> likes = new HashSet<>();
    private Set<UserDto> dislikes = new HashSet<>();
    private Set<UserDto> views = new HashSet<>();
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

package com.site.forum.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.site.forum.serializers.ProfileCommentDtoSerializer;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
@ToString
@EqualsAndHashCode
@JsonSerialize(using = ProfileCommentDtoSerializer.class)
public class ProfileCommentDto {
    private Long id;
    @NotNull(message = "Commentator cannot be null")
    private UserDto commentator;
    @NotNull(message = "User cannot be null")
    private UserDto user;
    @Size(min = 3, max = 255, message = "The text must be between 3 and 255 characters long")
    private String text;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

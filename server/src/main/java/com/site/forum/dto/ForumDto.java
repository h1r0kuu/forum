package com.site.forum.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.site.forum.serializers.ForumDtoSerializer;
import lombok.Data;

import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.*;

@Data
@JsonSerialize(using = ForumDtoSerializer.class)
public class ForumDto {
    private Long id;
    @Size(min = 3, max = 16, message = "The title must be between 3 and 16 characters long")
    private String title;
    private Set<ForumDto> subForums;
    private Set<PostDto> posts;
    private PostDto lastPost;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

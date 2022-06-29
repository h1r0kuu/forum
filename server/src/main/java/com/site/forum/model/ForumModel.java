package com.site.forum.model;

import lombok.Data;
import org.springframework.lang.Nullable;

import javax.validation.constraints.Size;

@Data
public class ForumModel {
    @Size(min = 3, max = 16, message = "The title must be between 3 and 16 characters long")
    private String title;
    @Nullable
    private Long parentId;
}

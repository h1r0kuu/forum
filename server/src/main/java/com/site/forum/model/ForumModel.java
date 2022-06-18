package com.site.forum.model;

import lombok.Data;
import org.springframework.lang.Nullable;

@Data
public class ForumModel {
    private String title;
    @Nullable
    private Long parentId;
}

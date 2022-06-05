package com.site.forum.service;

import com.site.forum.entity.Forum;

import java.util.List;

public interface ForumService {
    Forum create(Forum forum);
    List<Forum> getAll();
    Forum getById(Long id);
}

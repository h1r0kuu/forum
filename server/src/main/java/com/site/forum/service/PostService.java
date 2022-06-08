package com.site.forum.service;

import com.site.forum.entity.Post;

import java.util.List;

public interface PostService {
    Post create(Post post);
    List<Post> getAll();
    Post getById(Long id);
    List<Post> getByForumId(Long forumId);
}

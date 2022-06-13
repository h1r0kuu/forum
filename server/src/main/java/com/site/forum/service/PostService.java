package com.site.forum.service;

import com.site.forum.entity.Post;
import com.site.forum.entity.User;

import java.util.List;

public interface PostService {
    Post create(Post post);
    void delete(Long id);
    List<Post> getAll(String sortBy);
    Post getById(Long id);
    List<Post> getByForumId(Long forumId);
    void like(Post post, User user);
    void dislike(Post post, User user);
}

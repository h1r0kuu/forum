package com.site.forum.service;

import com.site.forum.entity.Comment;
import com.site.forum.entity.Post;
import com.site.forum.entity.User;

import java.util.List;

public interface CommentService {

    Comment create(Comment comment);
    Comment getById(Long id);
    List<Comment> getByPostId(Long postId);
    List<Comment> getByUserUsername(String username);
    void like(Comment comment, User user);
    void dislike(Comment comment, User user);
}

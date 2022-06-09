package com.site.forum.service;

import com.site.forum.entity.Comment;

import java.util.List;

public interface CommentService {

    Comment create(Comment comment);
    List<Comment> getByPostId(Long postId);
    List<Comment> getByUserUsername(String username);
}

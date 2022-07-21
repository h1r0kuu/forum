package com.site.forum.service;

import com.site.forum.entity.Comment;
import com.site.forum.entity.Post;
import com.site.forum.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommentService {

    Comment create(Comment comment, Post post);
    void delete(Long id);
    Comment getById(Long id);
    Page<Comment> getByPostId(Long postId, Pageable pageable);
    Page<Comment> getByUserUsername(String username, Pageable pageable);
    void like(Comment comment, User user);
    void dislike(Comment comment, User user);
}

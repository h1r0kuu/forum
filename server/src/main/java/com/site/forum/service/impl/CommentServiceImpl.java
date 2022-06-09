package com.site.forum.service.impl;

import com.site.forum.dao.CommentRepository;
import com.site.forum.entity.Comment;
import com.site.forum.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    @Override
    public Comment create(Comment comment) {
        Comment createdComment = commentRepository.save(comment);
        return createdComment;
    }

    @Override
    public List<Comment> getByPostId(Long postId) {
        List<Comment> comments = commentRepository.findByPost_Id(postId);
        return comments;
    }

    @Override
    public List<Comment> getByUserUsername(String username) {
        List<Comment> comments = commentRepository.findByUser_Username(username);
        return comments;
    }
}

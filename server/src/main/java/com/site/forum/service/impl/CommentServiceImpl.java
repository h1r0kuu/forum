package com.site.forum.service.impl;

import com.site.forum.dao.CommentRepository;
import com.site.forum.entity.Comment;
import com.site.forum.entity.User;
import com.site.forum.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;

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
    public Comment getById(Long id) {
        Comment comment = commentRepository.findById(id).orElseThrow(()->new NoSuchElementException("Comment not founded"));
        return comment;
    }

    public Comment update(Comment comment) {
        Comment updatedComment = commentRepository.save(comment);
        return updatedComment;
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

    @Override
    public void like(Comment comment, User user) {
        Set<User> likes = comment.getLikes();
        Set<User> dislikes = comment.getDislikes();
        if(dislikes.contains(user)) {
            dislikes.remove(user);
        }
        likes.add(user);
        comment.setLikes(likes);
        update(comment);
    }

    @Override
    public void dislike(Comment comment, User user) {
        Set<User> likes = comment.getLikes();
        Set<User> dislikes = comment.getDislikes();
        if(likes.contains(user)) {
            likes.remove(user);
        }
        dislikes.add(user);
        comment.setDislikes(dislikes);
        update(comment);
    }
}

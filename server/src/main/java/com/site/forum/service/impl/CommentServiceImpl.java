package com.site.forum.service.impl;

import com.site.forum.dao.CommentRepository;
import com.site.forum.entity.Comment;
import com.site.forum.entity.Post;
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
    public Comment create(Comment comment, Post post) {
        comment.setPost(post);
        return commentRepository.save(comment);
    }

    @Override
    public void delete(Long id) {
        commentRepository.deleteById(id);
    }

    @Override
    public Comment getById(Long id) {
        return commentRepository.findById(id).orElseThrow(
                ()->new NoSuchElementException("Comment not founded")
        );
    }

    public Comment update(Comment comment) {
        return commentRepository.save(comment);
    }

    @Override
    public List<Comment> getByPostId(Long postId) {
        return commentRepository.findByPost_Id(postId);
    }

    @Override
    public List<Comment> getByUserUsername(String username) {
        return commentRepository.findByUser_Username(username);
    }

    @Override
    public void like(Comment comment, User user) {
        Set<User> likes = comment.getLikes();
        Set<User> dislikes = comment.getDislikes();

        dislikes.remove(user);
        likes.add(user);

        comment.setLikes(likes);
        update(comment);
    }

    @Override
    public void dislike(Comment comment, User user) {
        Set<User> likes = comment.getLikes();
        Set<User> dislikes = comment.getDislikes();

        likes.remove(user);
        dislikes.add(user);

        comment.setDislikes(dislikes);
        update(comment);
    }
}

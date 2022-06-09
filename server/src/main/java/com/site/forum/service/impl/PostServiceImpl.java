package com.site.forum.service.impl;

import com.site.forum.dao.PostRepository;
import com.site.forum.entity.Post;
import com.site.forum.entity.User;
import com.site.forum.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    @Override
    public Post create(Post post) {
        Post createdPost = postRepository.save(post);
        return createdPost;
    }

    public Post update(Post post) {
        Post updatedPost = postRepository.save(post);
        return updatedPost;
    }

    @Override
    public List<Post> getAll() {
        List<Post> posts = postRepository.findAll();
        return posts;
    }

    @Override
    public Post getById(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Post not founded"));
        return post;
    }

    @Override
    public List<Post> getByForumId(Long forumId) {
        List<Post> posts = postRepository.findByForum_Id(forumId);
        return posts;
    }

    @Override
    public void like(Post post, User user) {
        Set<User> likes = post.getLikes();
        Set<User> dislikes = post.getDislikes();
        if(dislikes.contains(user)) {
            dislikes.remove(user);
        }
        likes.add(user);
        post.setLikes(likes);
        update(post);
    }

    @Override
    public void dislike(Post post, User user) {
        Set<User> likes = post.getLikes();
        Set<User> dislikes = post.getDislikes();
        if(likes.contains(user)) {
            likes.remove(user);
        }
        dislikes.add(user);
        post.setDislikes(dislikes);
        update(post);
    }
}

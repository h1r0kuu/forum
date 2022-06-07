package com.site.forum.service.impl;

import com.site.forum.dao.PostRepository;
import com.site.forum.entity.Post;
import com.site.forum.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    @Override
    public Post create(Post post) {
        Post createdPost = postRepository.save(post);
        return createdPost;
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
}

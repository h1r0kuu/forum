package com.site.forum.service.impl;

import com.site.forum.dao.PostRepository;
import com.site.forum.entity.Forum;
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
    private final ForumServiceImpl forumService;

    @Override
    public Post create(Post post) {
        Forum forum = forumService.getById(post.getForum().getId());
        if(forum == null) {
            throw new NoSuchElementException("Forum with id " + forum.getId() + " doesn't exist");
        }
        Post createdPost = postRepository.save(post);
        return createdPost;
    }

    @Override
    public void delete(Long id) {
        postRepository.deleteById(id);
    }

    public Post update(Post post) {
        return postRepository.save(post);
    }

    @Override
    public List<Post> getAll() {
        return postRepository.findAll();
    }

    @Override
    public Post getById(Long id) {
        return postRepository.findById(id).orElseThrow(
                () -> new NoSuchElementException("Post not founded")
        );
    }

    @Override
    public List<Post> getByForumId(Long forumId) {
        return postRepository.findByForum_Id(forumId);
    }

    @Override
    public void like(Post post, User user) {
        Set<User> likes = post.getLikes();
        Set<User> dislikes = post.getDislikes();

        dislikes.remove(user);
        likes.add(user);

        post.setLikes(likes);
        update(post);
    }

    @Override
    public void dislike(Post post, User user) {
        Set<User> likes = post.getLikes();
        Set<User> dislikes = post.getDislikes();

        likes.remove(user);
        dislikes.add(user);

        post.setDislikes(dislikes);
        update(post);
    }
}

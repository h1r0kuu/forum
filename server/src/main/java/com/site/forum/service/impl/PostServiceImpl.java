package com.site.forum.service.impl;

import com.site.forum.dao.PostRepository;
import com.site.forum.entity.Forum;
import com.site.forum.entity.Post;
import com.site.forum.entity.User;
import com.site.forum.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
        if(post.getForum() == null) {
            throw new NoSuchElementException("Forum cannot be null");
        }

        Forum forum = forumService.getById(post.getForum().getId());

        if(forum == null) {
            throw new NoSuchElementException("Forum doesn't exist");
        }

        return postRepository.save(post);
    }

    @Override
    public void delete(Long id) {
        postRepository.deleteById(id);
    }

    public Post update(Post post) {return create(post);}

    @Override
    public Page<Post> getAll(Pageable pageable) {
        return postRepository.findAll(pageable);
    }

    @Override
    public Page<Post> getAll(Pageable pageable, String username) {
        return postRepository.findAll(pageable, username);
    }

    @Override
    public List<Post> getRecentPosts() {
        return postRepository.findTop5ByOrderByCreatedAtDesc();
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
    public Page<Post> getByForumIdAndPage(Long forumId, Pageable pageable) {
        return postRepository.findByForum_Id(forumId, pageable);
    }

    @Override
    public Page<Post> getByForumIdAndPage(Long forumId, Pageable pageable, String username) {
        return postRepository.findByForum_Id(forumId, pageable, username);
    }

    @Override
    public void like(Post post, User user) {
        Set<User> likes = post.getLikes();
        Set<User> dislikes = post.getDislikes();

        dislikes.remove(user);
        likes.add(user);

        post.setLikes(likes);
        post.setDislikes(dislikes);
        update(post);
    }

    @Override
    public void dislike(Post post, User user) {
        Set<User> likes = post.getLikes();
        Set<User> dislikes = post.getDislikes();

        likes.remove(user);
        dislikes.add(user);

        post.setDislikes(dislikes);
        post.setLikes(likes);
        update(post);
    }

    @Override
    public void addView(Post post, User user) {
        Set<User> views = post.getViews();
        views.add(user);

        post.setViews(views);

        update(post);
    }

    @Override
    public Page<Post> searchPostByTitleLike(String title, Pageable pageable) {
        return postRepository.searchPostByTitleLike(title, pageable);
    }
}

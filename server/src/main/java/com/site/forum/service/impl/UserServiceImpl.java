package com.site.forum.service.impl;

import com.site.forum.dao.ForumRepository;
import com.site.forum.dao.PostRepository;
import com.site.forum.dao.UserRepository;
import com.site.forum.entity.Forum;
import com.site.forum.entity.Post;
import com.site.forum.entity.User;
import com.site.forum.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;
    private final ForumRepository forumRepository;
    private final PostRepository postRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return getUserByUsername(username);
    }

    @Override
    public User update(User user) {
        return registration(user);
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public Page<User> getAll(Pageable pageable) {return userRepository.findAll(pageable);}

    @Override
    public User getUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if(Objects.isNull(user)) throw new UsernameNotFoundException("User with this username does`t exist");
        return user;
    }

    @Override
    public User registration(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<Forum> getUserForums(String username) {
        return forumRepository.findByCreator_Username(username);
    }

    @Override
    public Page<Post> getUserPosts(String username, Pageable pageable) {
        return postRepository.findByCreator_Username(username, pageable);
    }

    @Override
    public Page<Post> getHiddenPosts(String username, Pageable pageable) {
        return userRepository.getHiddenPosts(username, pageable);
    }

    @Override
    public Page<User> searchUserByUsernameLike(String username, Pageable pageable) {
        return userRepository.searchUserByUsernameLike(username, pageable);
    }

    @Override
    public void hidePost(User user, Post post) {
        Set<Post> posts = user.getHiddenPosts();
        posts.add(post);

        user.setHiddenPosts(posts);
        update(user);
    }

    @Override
    public void unHidePost(User user, Post post) {
        Set<Post> posts = user.getHiddenPosts();
        posts.remove(post);

        user.setHiddenPosts(posts);
        update(user);
    }
}

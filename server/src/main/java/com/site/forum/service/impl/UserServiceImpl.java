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
    public List<Post> getUserPosts(String username) {
        return postRepository.findByCreator_Username(username);
    }

    @Override
    public Page<User> searchUserByUsernameLike(String username, Pageable pageable) {
        return userRepository.searchUserByUsernameLike(username, pageable);
    }
}

package com.site.forum.service;

import com.site.forum.entity.Forum;
import com.site.forum.entity.Post;
import com.site.forum.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;

public interface UserService {
    User update(User user);
    List<User> getAll();
    Page<User> getAll(Pageable pageable);
    User getUserByUsername(String username) throws UsernameNotFoundException;
    User registration(User user);
    List<Forum> getUserForums(String username);
    Page<Post> getUserPosts(String username, Pageable pageable);
    Page<Post> getHiddenPosts(String username, Pageable pageable);
    Page<User> searchUserByUsernameLike(String username, Pageable pageable);
    void hidePost(User user, Post post);
    void unHidePost(User user, Post post);
}

package com.site.forum.service;

import com.site.forum.entity.Forum;
import com.site.forum.entity.Post;
import com.site.forum.entity.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;

public interface UserService {
    List<User> getAll();
    User getUserByUsername(String username) throws UsernameNotFoundException;
    User registration(User user);
    List<Forum> getUserForums(String username);
    List<Post> getUserPosts(String username);
}

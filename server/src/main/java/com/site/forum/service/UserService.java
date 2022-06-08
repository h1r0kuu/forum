package com.site.forum.service;

import com.site.forum.entity.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserService {
    User getUserByUsername(String username) throws UsernameNotFoundException;
    User registration(User user);
}

package com.site.forum.dao;

import com.site.forum.entity.Post;
import com.site.forum.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    @Query("SELECT u FROM User u WHERE u.username LIKE %?1%")
    Page<User> searchUserByUsernameLike(String username, Pageable pageable);
    @Query("SELECT h FROM User u LEFT JOIN u.hiddenPosts h WHERE u.username = :username")
    Page<Post> getHiddenPosts(String username, Pageable pageable);

}

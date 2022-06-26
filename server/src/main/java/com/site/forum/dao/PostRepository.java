package com.site.forum.dao;

import com.site.forum.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    Page<Post> findAll(Pageable pageable);
    @Query("SELECT p FROM Post p" +
            " WHERE p.id NOT IN (SELECT h.id FROM User u JOIN u.hiddenPosts h WHERE u.username = ?1)")
    Page<Post> findAll(Pageable pageable, String username);
    List<Post> findByForum_Id(Long id);
    Page<Post> findByForum_Id(Long id, Pageable pageable);
    List<Post> findByCreator_Username(String username);
    @Query("SELECT p FROM Post p WHERE p.title LIKE %?1%")
    Page<Post> searchPostByTitleLike(String title, Pageable pageable);
}


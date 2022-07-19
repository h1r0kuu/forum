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
    List<Post> findTop5ByOrderByCreatedAtDesc();
    List<Post> findByForum_Id(Long id);
    @Query("SELECT p FROM Post p " +
            "WHERE p.forum.id = ?1 OR p.forum.id IN " +
            "(SELECT sub.id FROM Forum f JOIN f.subForums sub WHERE f.id = ?1)")
    Page<Post> findByForum_Id(Long id, Pageable pageable);
    @Query("SELECT p FROM Post p " +
            "WHERE (p.forum.id = :id OR p.forum.id IN " +
            "(SELECT sub.id FROM Forum f JOIN f.subForums sub WHERE f.id = :id)) AND " +
            "p.id NOT IN (SELECT h.id FROM User u JOIN u.hiddenPosts h WHERE u.username = :username)")
    Page<Post> findByForum_Id(Long id, Pageable pageable, String username);
    List<Post> findByCreator_Username(String username);
    Page<Post> findByCreator_Username(String username, Pageable pageable);
    @Query("SELECT p FROM Post p WHERE p.title LIKE %?1%")
    Page<Post> searchPostByTitleLike(String title, Pageable pageable);
}


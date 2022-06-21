package com.site.forum.dao;

import com.site.forum.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByForum_Id(Long id);
    Page<Post> findByForum_Id(Long id, Pageable pageable);

    List<Post> findByCreator_Username(String username);
}


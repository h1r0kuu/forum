package com.site.forum.dao;

import com.site.forum.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    Page<Comment> findByPost_Id(Long id, Pageable pageable);
    Page<Comment> findByUser_Username(String username, Pageable pageable);
}

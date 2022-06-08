package com.site.forum.dao;

import com.site.forum.entity.Forum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ForumRepository extends JpaRepository<Forum, Long> {
    List<Forum> findByCreator_Username(String username);
}

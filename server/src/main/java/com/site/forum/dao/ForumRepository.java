package com.site.forum.dao;

import com.site.forum.entity.Forum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ForumRepository extends JpaRepository<Forum, Long> {
    List<Forum> findByCreator_Username(String username);
    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM Forum f" +
            " join f.subForums res" +
            " ON res.id = ?1")
    Boolean isForumASubForum(Long forumId);
}

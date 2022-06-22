package com.site.forum.dao;

import com.site.forum.entity.ProfileComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfileCommentRepository extends JpaRepository<ProfileComment, Long> {
    List<ProfileComment> findByCommentator_Username(String username);
    List<ProfileComment> findByUser_Username(String username);

}

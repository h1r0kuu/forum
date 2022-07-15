package com.site.forum.dao;

import com.site.forum.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {

    @Query("SELECT c FROM Chat c JOIN c.users u WHERE u.username = ?1")
    List<Chat> getAllUsersChats(String username);
}

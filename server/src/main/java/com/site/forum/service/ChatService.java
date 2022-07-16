package com.site.forum.service;

import com.site.forum.entity.Chat;
import com.site.forum.entity.ChatMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ChatService {
    Chat create(Chat chat);
    Chat getChat(Long id);
    Page<ChatMessage> getChatMessages(Long id, Pageable pageable);
    ChatMessage sendMessage(ChatMessage message);
    List<Chat> getUsersChats(String username);
}

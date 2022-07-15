package com.site.forum.service;

import com.site.forum.entity.Chat;
import com.site.forum.entity.ChatMessage;

import java.util.List;

public interface ChatService {
    Chat create(Chat chat);
    Chat getChat(Long id);
    ChatMessage sendMessage(ChatMessage message);
    List<Chat> getUsersChats(String username);
}

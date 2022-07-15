package com.site.forum.service.impl;

import com.site.forum.dao.ChatMessageRepository;
import com.site.forum.dao.ChatRepository;
import com.site.forum.entity.Chat;
import com.site.forum.entity.ChatMessage;
import com.site.forum.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatRepository chatRepository;
    private final ChatMessageRepository messageRepository;

    @Override
    public Chat create(Chat chat) {
        return chatRepository.save(chat);
    }

    @Override
    public Chat getChat(Long id) {
        return chatRepository.findById(id).orElseThrow();
    }

    @Override
    public ChatMessage sendMessage(ChatMessage message) {
        return messageRepository.save(message);
    }

    @Override
    public List<Chat> getUsersChats(String username) {
        return chatRepository.getAllUsersChats(username);
    }
}

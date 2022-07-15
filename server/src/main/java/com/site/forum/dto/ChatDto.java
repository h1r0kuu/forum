package com.site.forum.dto;

import com.site.forum.entity.Chat;
import com.site.forum.entity.ChatMessage;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
public class ChatDto {
    private Long id;
    private List<ChatMessageDto> messages;
    private Set<UserDto> users;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ChatDto convertToDto(Chat chat) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(chat, ChatDto.class);
    }

    public Chat convertToEntity(ChatDto chatDto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(chatDto, Chat.class);
    }
}

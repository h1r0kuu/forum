package com.site.forum.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.site.forum.entity.ChatMessage;
import com.site.forum.entity.Report;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.time.LocalDateTime;

@Data
public class ChatMessageDto {
    private Long id;
    private String text;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private ChatDto chat;
    private UserDto author;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ChatMessageDto convertToDto(ChatMessage message) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(message, ChatMessageDto.class);
    }

    public ChatMessage convertToEntity(ChatMessageDto messageDto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(messageDto, ChatMessage.class);
    }
}

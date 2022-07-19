package com.site.forum.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.site.forum.serializers.ChatDtoSerializer;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@JsonSerialize(using = ChatDtoSerializer.class)
public class ChatDto {
    private Long id;
    private List<ChatMessageDto> messages;
    private Set<UserDto> users;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

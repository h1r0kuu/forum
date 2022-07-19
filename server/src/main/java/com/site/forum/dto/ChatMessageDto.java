package com.site.forum.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.site.forum.serializers.ChatMessageDtoSerializer;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@JsonSerialize(using = ChatMessageDtoSerializer.class)
public class ChatMessageDto {
    private Long id;
    private String text;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private ChatDto chat;
    private UserDto author;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

package com.site.forum.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.site.forum.serializers.NotificationDtoSerializer;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@JsonSerialize(using = NotificationDtoSerializer.class)
public class NotificationDto {
    private Long id;
    private String text;
    private UserDto user;
    private boolean isRead;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    public NotificationDto() {
    }
    public NotificationDto(String text, UserDto user) {
        this.text = text;
        this.user = user;
    }
}

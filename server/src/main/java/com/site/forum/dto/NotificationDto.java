package com.site.forum.dto;

import com.site.forum.entity.Notification;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.time.LocalDateTime;

@Data
public class NotificationDto {
    private Long id;
    private String text;
    private UserDto user;
    private boolean isRead;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public NotificationDto convertToDto(Notification notification) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(notification, NotificationDto.class);
    }

    public Notification convertToEntity(NotificationDto notificationDto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(notificationDto, Notification.class);
    }
}

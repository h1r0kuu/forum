package com.site.forum.service;

import com.site.forum.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface NotificationService {
    Notification sendNotification(Notification notification);
    Notification update(Notification notification);
    void delete(Long notificationId);
    Page<Notification> getUserNotifications(String username, Pageable pageable);
    Notification setRead(Long id);
}

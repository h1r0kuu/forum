package com.site.forum.service;

import com.site.forum.entity.Notification;

import java.util.List;

public interface NotificationService {
    Notification sendNotification(Notification notification);
    Notification update(Notification notification);
    void delete(Long notificationId);
    List<Notification> getUserNotifications(String username);
    Notification setRead(Long id);
}

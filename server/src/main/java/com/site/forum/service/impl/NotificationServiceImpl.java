package com.site.forum.service.impl;

import com.site.forum.dao.NotificationRepository;
import com.site.forum.entity.Notification;
import com.site.forum.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Override
    public Notification sendNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    @Override
    public Notification update(Notification notification) {
        return notificationRepository.save(notification);
    }

    @Override
    public void delete(Long notificationId) {
        notificationRepository.deleteById(notificationId);
    }

    @Override
    public List<Notification> getUserNotifications(String username) {
        return notificationRepository.findByUser_Username(username);
    }

    @Override
    public Notification setRead(Long id) {
        Notification notification = notificationRepository.findById(id).orElseThrow(
                () -> new NoSuchElementException("Notification not found")
        );
        notification.setRead(true);
        update(notification);
        return notification;
    }
}

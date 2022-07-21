package com.site.forum.service.impl;

import com.site.forum.dao.NotificationRepository;
import com.site.forum.entity.Notification;
import com.site.forum.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public Page<Notification> getUserNotifications(String username, Pageable pageable) {
        return notificationRepository.findByUser_Username(username, pageable);
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

package com.site.forum.controller;

import com.site.forum.dto.NotificationDto;
import com.site.forum.entity.Notification;
import com.site.forum.service.NotificationService;
import com.site.forum.service.impl.NotificationServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    private final NotificationDto notificationDto = new NotificationDto();

    @PostMapping("/notify")
    public ResponseEntity<NotificationDto> notify(@RequestBody NotificationDto notificationDto) {
        Notification notification = notificationService.sendNotification( notificationDto.convertToEntity((notificationDto)) );
        return ResponseEntity.ok(notificationDto.convertToDto(notification));
    }

    @GetMapping("/{username}")
    public ResponseEntity<List<NotificationDto>> getUserNotifications(@PathVariable("username") String username) {
        List<NotificationDto> notifications = notificationService.getUserNotifications(username)
                .stream()
                .map(notificationDto::convertToDto)
                .toList();
        return ResponseEntity.ok(notifications);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteNotification(@PathVariable("id") Long id,
                                                      HttpServletRequest request) {

        return ResponseEntity.ok("Seccessfuly deleted");
    }

    @PutMapping("/read/{id}")
    public ResponseEntity<NotificationDto> setRead(@PathVariable("id") Long id,
                                                   HttpServletRequest request) {
        NotificationDto notification = notificationDto.convertToDto( notificationService.setRead(id) );
        return ResponseEntity.ok(notification);
    }
}

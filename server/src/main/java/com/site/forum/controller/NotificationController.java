package com.site.forum.controller;

import com.site.forum.dto.NotificationDto;
import com.site.forum.entity.Notification;
import com.site.forum.exception.UserNotAuthorized;
import com.site.forum.service.NotificationService;
import com.site.forum.utils.JWTUtil;
import com.site.forum.utils.Mapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    private final JWTUtil jwtUtil;
    private final Mapper mapper;

    @PostMapping("/notify")
    public ResponseEntity<NotificationDto> notify(@RequestBody NotificationDto notificationDto) {
        Notification notification = notificationService.sendNotification( mapper.convertTo(notificationDto, Notification.class) );
        return ResponseEntity.ok( mapper.convertTo(notification, NotificationDto.class) );
    }

    @GetMapping("/my")
    public ResponseEntity<Page<NotificationDto>> getUserNotifications(@PageableDefault(sort = "createdAt") Pageable pageable,
                                                                      HttpServletRequest request) throws UserNotAuthorized {
        String token = jwtUtil.extractTokenFromRequest(request);
        Page<NotificationDto> notifications = null;
        if (token != null && jwtUtil.validateToken(token)) {
            notifications = notificationService.getUserNotifications(jwtUtil.extractUserFromToken(token).getUsername(), pageable)
                                               .map(n -> mapper.convertTo(n, NotificationDto.class));
        }
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
        NotificationDto notification = mapper.convertTo(notificationService.setRead(id), NotificationDto.class);
        return ResponseEntity.ok(notification);
    }
}

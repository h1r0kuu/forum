package com.site.forum.controller;

import com.site.forum.dto.ChatDto;
import com.site.forum.dto.ChatMessageDto;
import com.site.forum.dto.PostDto;
import com.site.forum.entity.Chat;
import com.site.forum.entity.ChatMessage;
import com.site.forum.entity.User;
import com.site.forum.model.ChatModel;
import com.site.forum.service.ChatService;
import com.site.forum.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Set;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/chats")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    private final UserService userService;

    private final SimpMessagingTemplate messagingTemplate;

    private final ChatDto chatDto = new ChatDto();
    private final ChatMessageDto chatMessageDto = new ChatMessageDto();

    @PostMapping("/create")
    public ResponseEntity<ChatDto> create(@RequestBody ChatModel chatModel) {

        Chat chat = new Chat();

        for(String username: chatModel.getUsernames()) {
            chat.addChatMember( userService.getUserByUsername(username) );
        }
        Chat createdChat = chatService.create( chat );
        return ResponseEntity.ok(chatDto.convertToDto(createdChat));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChatDto> getChat(@PathVariable("id") Long id) {
        Chat chat = chatService.getChat(id);
        return ResponseEntity.ok(chatDto.convertToDto(chat));
    }

    @GetMapping("/{id}/messages")
    public ResponseEntity<Page<ChatMessageDto>> getChatMessages(@PathVariable("id") Long id,
                                                                @RequestParam(defaultValue = "0", value = "page") int page) {
        Pageable paging = PageRequest.of(page, 15, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<ChatMessage> messageList = chatService.getChatMessages(id, paging);
        Page<ChatMessageDto> messages = messageList.map(chatMessageDto::convertToDto);
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<ChatDto>> getUserChats(@PathVariable("username") String username) {
        List<ChatDto> chats = chatService.  getUsersChats(username)
                .stream()
                .map(chatDto::convertToDto)
                .toList();
        return ResponseEntity.ok(chats);
    }

    @PostMapping("/sendMessage")
    public ResponseEntity<ChatMessageDto> sendMessage(@RequestBody ChatMessageDto messageDto) {
        ChatMessageDto message = messageDto.convertToDto(chatService.sendMessage( messageDto.convertToEntity(messageDto) ));
        message.getChat().getUsers()
                        .forEach(user ->
                                messagingTemplate.convertAndSend("/topic/chat/"+user.getUsername(), message)
                        );
        return ResponseEntity.ok(message);
    }
}

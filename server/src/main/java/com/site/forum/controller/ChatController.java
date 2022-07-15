package com.site.forum.controller;

import com.site.forum.dto.ChatDto;
import com.site.forum.dto.ChatMessageDto;
import com.site.forum.entity.Chat;
import com.site.forum.entity.ChatMessage;
import com.site.forum.entity.User;
import com.site.forum.model.ChatModel;
import com.site.forum.service.ChatService;
import com.site.forum.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
        ChatMessage message = chatService.sendMessage( messageDto.convertToEntity(messageDto) );
        return ResponseEntity.ok(messageDto.convertToDto(message));
    }
}

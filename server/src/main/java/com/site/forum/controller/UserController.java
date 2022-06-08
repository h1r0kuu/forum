package com.site.forum.controller;

import com.site.forum.dto.ForumDto;
import com.site.forum.dto.PostDto;
import com.site.forum.dto.UserDto;
import com.site.forum.entity.User;
import com.site.forum.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserServiceImpl userService;

    private final UserDto userDto = new UserDto();
    private final ForumDto forumDto = new ForumDto();
    private final PostDto postDto = new PostDto();

    @PostMapping("/registration")
    public ResponseEntity<UserDto> registration(@RequestBody UserDto userDto,
                                                HttpServletRequest request) {

        if(!userDto.getPassword().equals(request.getParameter("confirm_password"))) {
            System.out.println("Passwords don't match ");
        }

        userDto.setPassword( new BCryptPasswordEncoder().encode(userDto.getPassword()));
        User createdUser = userService.registration(userDto.convertToEntity(userDto));
        return ResponseEntity.ok(userDto.convertToDto(createdUser));
    }

    @GetMapping("/{username}/forums")
    public ResponseEntity<List<ForumDto>> getUserForums(@PathVariable("username") String username) {
        List<ForumDto> forums = userService.getUserForums(username).stream()
                                           .map(forumDto::convertToDto)
                                           .toList();
        return ResponseEntity.ok(forums);
    }

    @GetMapping("/{username}/posts")
    public ResponseEntity<List<PostDto>> getUserPosts(@PathVariable("username") String username) {
        List<PostDto> posts = userService.getUserPosts(username).stream()
                                         .map(postDto::convertToDto)
                                         .toList();
        return ResponseEntity.ok(posts);
    }
}

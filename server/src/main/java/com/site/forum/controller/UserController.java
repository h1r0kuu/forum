package com.site.forum.controller;

import com.site.forum.dto.CommentDto;
import com.site.forum.dto.ForumDto;
import com.site.forum.dto.PostDto;
import com.site.forum.dto.UserDto;
import com.site.forum.entity.User;
import com.site.forum.model.FollowModel;
import com.site.forum.service.impl.CommentServiceImpl;
import com.site.forum.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserServiceImpl userService;
    private final CommentServiceImpl commentService;

    private final UserDto userDto = new UserDto();
    private final ForumDto forumDto = new ForumDto();
    private final PostDto postDto = new PostDto();
    private final CommentDto commentDto = new CommentDto();

    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> getAll() {
        List<User> users = userService.getAll();
        return ResponseEntity.ok(
                users.stream()
                     .map(userDto::convertToDto)
                     .toList()
        );
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserDto> getUserInfo(@PathVariable("username") String username) {
        User user = userService.getUserByUsername(username);
        return ResponseEntity.ok(userDto.convertToDto(user));
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

    @GetMapping("/{username}/comments")
    public ResponseEntity<Set<CommentDto>> getUserComments(@PathVariable("username") String username) {
        Set<CommentDto> comments = commentService.getByUserUsername(username).stream()
                                                                              .map(commentDto::convertToDto)
                                                                              .collect(Collectors.toSet());
        return ResponseEntity.ok(comments);
    }

    @PostMapping("/follow")
    public ResponseEntity<String> follow(@RequestBody FollowModel followModel) {
        User following = userService.getUserByUsername(followModel.getFollowingUsername());
        following.addFollower( userService.getUserByUsername(followModel.getFollowerUsername()) );
        userService.update(following);
        return ResponseEntity.ok("Successfuly followed");
    }
}

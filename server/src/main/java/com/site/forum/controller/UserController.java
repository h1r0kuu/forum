package com.site.forum.controller;

import com.site.forum.dto.*;
import com.site.forum.entity.*;
import com.site.forum.model.FollowModel;
import com.site.forum.service.CommentService;
import com.site.forum.service.ProfileCommentService;
import com.site.forum.service.UserService;
import com.site.forum.utils.Mapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final SessionRegistry sessionRegistry;

    private final UserService userService;
    private final CommentService commentService;
    private final ProfileCommentService profileCommentService;

    private final Mapper mapper;
    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> getAll() {
        List<User> users = userService.getAll();
        return ResponseEntity.ok( mapper.listConvertTo(users, UserDto.class) );
    }

    @GetMapping("/online")
    public ResponseEntity<Set<UserDto>> getOnlineUsers() {
        Set<UserDto> onlineUsers = new HashSet<>();
        List<User> principals = sessionRegistry.getAllPrincipals().stream()
                .filter(User.class::isInstance)
                .map(User.class::cast)
                .toList();

        for(User user : principals) {
            List<SessionInformation> activeUserSession = sessionRegistry.getAllSessions(user, false);
            for(SessionInformation sesInfo : activeUserSession) {
                if(!sesInfo.isExpired()) {
                    onlineUsers.add( mapper.convertTo(user, UserDto.class) );
                }
            }
        }
        return ResponseEntity.ok(onlineUsers);
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserDto> getUserInfo(@PathVariable("username") String username) {
        User user = userService.getUserByUsername(username);
        return ResponseEntity.ok( mapper.convertTo(user, UserDto.class) );
    }

    @GetMapping("/{username}/forums")
    public ResponseEntity<List<ForumDto>> getUserForums(@PathVariable("username") String username) {
        List<Forum> forums = userService.getUserForums(username);
        return ResponseEntity.ok( mapper.listConvertTo(forums, ForumDto.class) );
    }

    @GetMapping("/{username}/posts")
    public ResponseEntity<Page<PostDto>> getUserPosts(@PathVariable("username") String username,
                                                      @Nullable @RequestParam(value = "order", defaultValue = "createdAt") String orderBy,
                                                      @RequestParam(defaultValue = "0", value = "page") int page,
                                                      @RequestParam(defaultValue = "10", value = "size") int size) {
        Pageable paging = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, orderBy));
        Page<Post> postList = userService.getUserPosts(username, paging);
        Page<PostDto> posts = postList.map(p -> mapper.convertTo(p, PostDto.class));
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{username}/hidden_posts")
    public ResponseEntity<List<PostDto>> getHiddenPosts(@PathVariable("username") String username) {
        List<Post> posts = userService.getHiddenPosts(username);
        return ResponseEntity.ok( mapper.listConvertTo(posts, PostDto.class) );
    }

    @GetMapping("/{username}/comments")
    public ResponseEntity<List<CommentDto>> getUserComments(@PathVariable("username") String username) {
        List<Comment> comments = commentService.getByUserUsername(username);
        return ResponseEntity.ok( mapper.listConvertTo(comments, CommentDto.class) );
    }

    @GetMapping("/{username}/profile_comments")
    public ResponseEntity<List<ProfileCommentDto>> profileComments(@PathVariable("username") String username) {
        List<ProfileComment> profileComments = profileCommentService.getAllByUserUsername(username);
        return ResponseEntity.ok( mapper.listConvertTo(profileComments, ProfileCommentDto.class) );
    }

    @PostMapping("/follow")
    public ResponseEntity<String> follow(@RequestBody FollowModel followModel) {
        User following = userService.getUserByUsername(followModel.getFollowingUsername());
        following.addFollower( userService.getUserByUsername(followModel.getFollowerUsername()) );
        userService.update(following);
        return ResponseEntity.ok("Successfuly followed");
    }
}

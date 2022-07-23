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
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
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
    public ResponseEntity<Page<UserDto>> getAll(@PageableDefault(sort = "createdAt") Pageable pageable) {
        Page<UserDto> users = userService.getAll(pageable)
                                         .map(u -> mapper.convertTo(u, UserDto.class));
        return ResponseEntity.ok(users);
    }

    @GetMapping("/online")
    @Transactional
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
                                                      @PageableDefault(sort = "createdAt") Pageable pageable) {
        Page<PostDto> posts = userService.getUserPosts(username, pageable)
                                         .map(p -> mapper.convertTo(p, PostDto.class));
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{username}/hidden_posts")
    public ResponseEntity<Page<PostDto>> getHiddenPosts(@PathVariable("username") String username,
                                                        @PageableDefault(sort = "createdAt") Pageable pageable) {
        Page<PostDto> posts = userService.getHiddenPosts(username, pageable)
                                         .map(p -> mapper.convertTo(p, PostDto.class));
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{username}/comments")
    public ResponseEntity<Page<CommentDto>> getUserComments(@PathVariable("username") String username,
                                                            @PageableDefault(sort = "createdAt") Pageable pageable) {
        Page<CommentDto> comments = commentService.getByUserUsername(username, pageable)
                                                  .map(c -> mapper.convertTo(c, CommentDto.class));
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/{username}/profile_comments")
    public ResponseEntity<List<ProfileCommentDto>> profileComments(@PathVariable("username") String username) {
        List<ProfileComment> profileComments = profileCommentService.getAllByUserUsername(username);
        return ResponseEntity.ok( mapper.listConvertTo(profileComments, ProfileCommentDto.class) );
    }

    @GetMapping("/{username}/following")
    public ResponseEntity<List<UserDto>> getUserFollowingList(@PathVariable("username") String username) {
        Set<User> users = userService.getUserByUsername(username).getFollowing();
        return ResponseEntity.ok( mapper.listConvertTo(users, UserDto.class) );
    }

    @GetMapping("/{username}/followers")
    public ResponseEntity<List<UserDto>> getUserFollowers(@PathVariable("username") String username) {
        Set<User> users = userService.getUserByUsername(username).getFollowers();
        return ResponseEntity.ok( mapper.listConvertTo(users, UserDto.class) );
    }

    @PostMapping("/follow")
    public ResponseEntity<String> follow(@RequestBody FollowModel followModel) {
        User following = userService.getUserByUsername(followModel.getFollowingUsername());
        User follower = userService.getUserByUsername(followModel.getFollowerUsername());

        following.addFollower( follower );
        follower.addFollowing( following );

        userService.update(following);
        userService.update(following);

        return ResponseEntity.ok("Successfully followed");
    }

    @PostMapping("/unfollow")
    public ResponseEntity<String> unfollow(@RequestBody FollowModel followModel) {
        User following = userService.getUserByUsername(followModel.getFollowingUsername());
        User follower = userService.getUserByUsername(followModel.getFollowerUsername());

        following.removeFollower( follower );
        follower.removeFollowing( follower );

        userService.update(following);
        userService.update(follower);

        return ResponseEntity.ok("Successfully unfollowed");
    }
}

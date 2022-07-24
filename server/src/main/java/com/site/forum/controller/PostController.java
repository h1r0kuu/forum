package com.site.forum.controller;

import com.site.forum.dto.CommentDto;
import com.site.forum.dto.PostDto;
import com.site.forum.entity.Comment;
import com.site.forum.entity.Post;
import com.site.forum.entity.User;
import com.site.forum.exception.UserNotAuthorized;
import com.site.forum.service.CommentService;
import com.site.forum.service.NotificationService;
import com.site.forum.service.PostService;
import com.site.forum.service.UserService;
import com.site.forum.utils.JWTUtil;
import com.site.forum.utils.Mapper;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.*;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
@Cacheable(value = "posts")
public class PostController {

    private final PostService postService;
    private final CommentService commentService;
    private final UserService userService;
    private final NotificationService notificationService;

    private final SimpMessagingTemplate messagingTemplate;
    private final Mapper mapper;
    private final JWTUtil jwtUtil;

    @PostMapping(value = "/create", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<PostDto> create(@Valid @RequestBody PostDto post) {
        Post createdPost = postService.create( mapper.convertTo(post, Post.class) );
        return ResponseEntity.ok( mapper.convertTo(createdPost, PostDto.class) );
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDto> getOne(@PathVariable("id") Long id,
                                          HttpServletRequest request) throws UserNotAuthorized {
        Post post = postService.getById(id);
        if (Objects.nonNull(request.getHeader("Authorization"))) {
            String token = jwtUtil.extractTokenFromRequest(request);
            if (token != null && jwtUtil.validateToken(token)) {
                User user = jwtUtil.extractUserFromToken(token);
                postService.addView(post, user);
            }
        }
        return ResponseEntity.ok( mapper.convertTo(post, PostDto.class) );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable("id") Long id) {
        postService.delete(id);
        return ResponseEntity.ok("Successfuly deleted");
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostDto> updatePost(@RequestBody PostDto postDto) {
        Post updatedPost = postService.update( mapper.convertTo(postDto, Post.class) );
        return ResponseEntity.ok(mapper.convertTo(updatedPost, PostDto.class) );
    }

    @GetMapping("/all")
    public ResponseEntity<Page<PostDto>> getAll(@RequestParam(name = "page", defaultValue = "0") int page,
                                                @RequestParam(name = "size", defaultValue = "5") int size,
                                                @RequestParam(name = "order", defaultValue = "createdAt") String order,
                                                @RequestParam(name = "direction", defaultValue = "DESC") Sort.Direction direction,
                                                HttpServletRequest request) throws UserNotAuthorized {
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, order));

        String token = null;
        try {
            token = jwtUtil.extractTokenFromRequest(request);
        } catch(UserNotAuthorized ignored) {

        }
        Page<Post> postList;
        if (token != null && jwtUtil.validateToken(token)) {
            postList = postService.getAll(pageable, jwtUtil.extractUserFromToken(token).getUsername());
        } else {
            postList = postService.getAll(pageable);
        }

        Page<PostDto> posts = postList.map(p -> mapper.convertTo(p, PostDto.class));
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/recent")
    public ResponseEntity<List<PostDto>> getRecentPosts() {
        List<Post> posts = postService.getRecentPosts();
        return ResponseEntity.ok(mapper.listConvertTo(posts, PostDto.class));
    }

    @GetMapping("/forum/{id}")
    public ResponseEntity<Page<PostDto>> getPostsByForumId(@PathVariable("id") Long id,
                                                           @PageableDefault(size = 5, sort = "createdAt") Pageable pageable,
                                                           HttpServletRequest request) throws UserNotAuthorized {
        String token = jwtUtil.extractTokenFromRequest(request);
        Page<Post> postList;
        if(!token.equals("null") && jwtUtil.validateToken(token)) {
            postList = postService.getByForumIdAndPage(id, pageable, jwtUtil.extractUserFromToken(token).getUsername());
        } else {
            postList = postService.getByForumIdAndPage(id, pageable);
        }
        Page<PostDto> posts = postList.map(p -> mapper.convertTo(p, PostDto.class));

        return ResponseEntity.ok(posts);
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<String> likePost(@PathVariable("id") Long id,
                                           @RequestBody Map<String, String> payload) {
        String username = payload.get("username");

        Post post = postService.getById(id);
        User user = userService.getUserByUsername(username);
        postService.like(post, user);
        return ResponseEntity.ok("liked");
    }

    @PostMapping("/{id}/dislike")
    public ResponseEntity<String> dislikePost(@PathVariable("id") Long id,
                                              @RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        Post post = postService.getById(id);
        User user = userService.getUserByUsername(username);
        postService.dislike(post, user);
        return ResponseEntity.ok("disliked");
    }

    @PostMapping("/{id}/hide")
    public ResponseEntity<String> hidePostForUser(@PathVariable("id") Long id, HttpServletRequest request) throws UserNotAuthorized {
        String token = jwtUtil.extractTokenFromRequest(request);
        User user = jwtUtil.extractUserFromToken(token);
        Post post = postService.getById(id);

        userService.hidePost(user, post);

        return ResponseEntity.ok("Success");
    }
    @PostMapping("/{id}/unhide")
    public ResponseEntity<String> unHidePostForUser(@PathVariable("id") Long id, HttpServletRequest request) throws UserNotAuthorized {
        String token = jwtUtil.extractTokenFromRequest(request);
        User user = jwtUtil.extractUserFromToken(token);
        Post post = postService.getById(id);

        userService.unHidePost(user, post);

        return ResponseEntity.ok("Success");
    }

//    Comments

    @PostMapping("/{id}/comments")
    public ResponseEntity<CommentDto> createComment(@PathVariable("id") Long id,
                                                    @RequestBody CommentDto commentDto) {
        Post post = postService.getById(id);
        Comment createdComment = commentService.create( mapper.convertTo(commentDto, Comment.class), post );
        if(!post.getCreator().getUsername().equals(commentDto.getUser().getUsername())) {
//            NotificationDto notification = notificationDto.convertToDto(notificationService.sendNotification(notificationDto.convertToEntity(
//                    new NotificationDto("New comment in your post", userDto.convertToDto(post.getCreator()))
//            )));
//            messagingTemplate.convertAndSend("/topic/notifications/" + post.getCreator().getUsername(), notification);
        }
        return ResponseEntity.ok( mapper.convertTo(createdComment, CommentDto.class) );
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<Page<CommentDto>> getPostComments(@PathVariable("id") Long id,
                                                            @PageableDefault(sort = "createdAt") Pageable pageable) {
        Page<CommentDto> comments = commentService.getByPostId(id, pageable)
                .map(c -> mapper.convertTo(c, CommentDto.class));
        return ResponseEntity.ok(comments);
    }

    @DeleteMapping("/{id}/comments/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable("commentId") Long id) {
        commentService.delete(id);
        return ResponseEntity.ok("Successfuly deleted");
    }

    @PostMapping("/comments/{commentId}/like")
    public ResponseEntity<String> likeComment(@PathVariable("commentId") Long id,
                                              @RequestBody Map<String, String> payload) {
        String username = payload.get("username");

        Comment comment = commentService.getById(id);
        User user = userService.getUserByUsername(username);
        commentService.like(comment, user);
        return ResponseEntity.ok("liked");
    }

    @PostMapping("/comments/{commentId}/dislike")
    public ResponseEntity<String> dislikeComment(@PathVariable("commentId") Long id,
                                                 @RequestBody Map<String, String> payload) {
        String username = payload.get("username");

        Comment comment = commentService.getById(id);
        User user = userService.getUserByUsername(username);
        commentService.dislike(comment, user);
        return ResponseEntity.ok("disliked");
    }
}

package com.site.forum.controller;

import com.site.forum.dto.CommentDto;
import com.site.forum.dto.PostDto;
import com.site.forum.entity.Comment;
import com.site.forum.entity.Notification;
import com.site.forum.entity.Post;
import com.site.forum.entity.User;
import com.site.forum.exception.UserNotAuthorized;
import com.site.forum.service.CommentService;
import com.site.forum.service.NotificationService;
import com.site.forum.service.PostService;
import com.site.forum.service.UserService;
import com.site.forum.service.impl.CommentServiceImpl;
import com.site.forum.service.impl.NotificationServiceImpl;
import com.site.forum.service.impl.PostServiceImpl;
import com.site.forum.service.impl.UserServiceImpl;
import com.site.forum.utils.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final CommentService commentService;
    private final UserService userService;
    private final NotificationService notificationService;

    private final PostDto postDto = new PostDto();
    private final CommentDto commentDto = new CommentDto();

    private final JWTUtil jwtUtil;
    @PostMapping(value = "/create", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<PostDto> create(@Valid @RequestBody PostDto post) {
        Post createdPost = postService.create( postDto.convertToEntity(post) );
        return ResponseEntity.ok( postDto.convertToDto(createdPost) );
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDto> getOne(@PathVariable("id") Long id,
                                          HttpServletRequest request) throws UserNotAuthorized {
        Post post = postService.getById(id);
        String token = jwtUtil.extractTokenFromRequest(request);
        if(jwtUtil.validateToken(token)) {
            User user = jwtUtil.extractUserFromToken(token);
            postService.addView(post, user);
        }

        return ResponseEntity.ok( postDto.convertToDto(post) );
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deletePost(@PathVariable("id") Long id) {
        postService.delete(id);
        return ResponseEntity.ok("Successfuly deleted");
    }

    @GetMapping("/all")
    public ResponseEntity<Page<PostDto>> getAll(@Nullable @RequestParam(value = "order", defaultValue = "createdAt") String orderBy,
                                                @RequestParam(defaultValue = "0", value = "page") int page,
                                                @RequestParam(defaultValue = "10", value = "size") int size,
                                                HttpServletRequest request) throws UserNotAuthorized {
        Pageable paging = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, orderBy));

        String token = jwtUtil.extractTokenFromRequest(request);
        Page<Post> postList;
        if (!token.equals("null") && jwtUtil.validateToken(token)) {
            postList = postService.getAll(paging, jwtUtil.extractUserFromToken(token).getUsername());
        } else {
            postList = postService.getAll(paging);
        }
        Page<PostDto> posts = postList.map(postDto::convertToDto);

        return ResponseEntity.ok(posts);
    }

    @GetMapping("/forum/{id}")
    public ResponseEntity<Page<PostDto>> getPostsByForumId(@PathVariable("id") Long id,
                                                           @Nullable @RequestParam(value = "order", defaultValue = "createdAt") String orderBy,
                                                           @RequestParam(defaultValue = "0", value = "page") int page,
                                                           @RequestParam(defaultValue = "5", value = "size") int size) {
        Pageable paging = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, orderBy));
    
        Page<Post> postList = postService.getByForumIdAndPage(id, paging);
        Page<PostDto> posts = postList.map(postDto::convertToDto);

        return ResponseEntity.ok(posts);
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<String> likePost(@PathVariable("id") Long id,
                                           @RequestBody Map<String, String> payload) {
        String username = payload.get("username");

        Post post = postService.getById(id);
        User user = userService.getUserByUsername(username);
        postService.like(post, user);
        return ResponseEntity.ok("likes");
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
    @GetMapping("/{id}/comments")
    public ResponseEntity<Set<CommentDto>> getPostComments(@PathVariable("id") Long id) {
        Set<CommentDto> comments = commentService.getByPostId(id).stream()
                                                                 .map(commentDto::convertToDto)
                                                                 .collect(Collectors.toSet());
        return ResponseEntity.ok(comments);
    }

    @DeleteMapping("/{id}/comments/{commentId}/delete")
    public ResponseEntity<String> deleteComment(@PathVariable("commentId") Long id) {
        commentService.delete(id);
        return ResponseEntity.ok("Successfuly deleted");
    }

    @PostMapping("/{id}/comments/create")
    public ResponseEntity<CommentDto> createComment(@PathVariable("id") Long id,
                                                    @RequestBody CommentDto commentDto) {
        Post post = postService.getById(id);
        Comment createdComment = commentService.create( commentDto.convertToEntity(commentDto), post );
        return ResponseEntity.ok(commentDto.convertToDto(createdComment));
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

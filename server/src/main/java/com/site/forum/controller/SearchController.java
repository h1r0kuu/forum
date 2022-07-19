package com.site.forum.controller;

import com.site.forum.dto.PostDto;
import com.site.forum.dto.UserDto;
import com.site.forum.entity.Post;
import com.site.forum.entity.User;
import com.site.forum.service.PostService;
import com.site.forum.service.UserService;
import com.site.forum.utils.Mapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class SearchController {

    private final UserService userService;
    private final PostService postService;

    private final Mapper mapper;
    @GetMapping("/search")
    public ResponseEntity<HashMap<String, Object>> search(@RequestParam("query") String query,
                                                          @Nullable @RequestParam(value = "order", defaultValue = "createdAt") String orderBy,
                                                          @RequestParam(defaultValue = "0", value = "page") int page,
                                                          @RequestParam(defaultValue = "5", value = "size") int size) {
        HashMap<String, Object> res = new HashMap<>();
        Pageable paging = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, orderBy));

        Page<User> findedUsers = userService.searchUserByUsernameLike(query, paging);
        Page<Post> findedPosts = postService.searchPostByTitleLike(query, paging);

        res.put("users", findedUsers.map(u -> mapper.convertTo(u, UserDto.class)));
        res.put("posts", findedPosts.map(p -> mapper.convertTo(p, PostDto.class)));

        return ResponseEntity.ok(res);
    }
}

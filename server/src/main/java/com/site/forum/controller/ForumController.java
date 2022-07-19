package com.site.forum.controller;

import com.site.forum.dto.ForumDto;
import com.site.forum.entity.Forum;
import com.site.forum.model.ForumModel;
import com.site.forum.service.ForumService;
import com.site.forum.utils.Mapper;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/forums")
@RequiredArgsConstructor
@Cacheable(value = "forums")
public class ForumController {
    private final ForumService forumService;
    private final Mapper mapper;

    @PostMapping(value = "/create")
    public ResponseEntity<ForumDto> create(@RequestBody ForumModel model) {
        Forum res = null;
        Forum forum = mapper.convertTo(model, Forum.class);
        forumService.create(forum);
        res = forum;
        if(model.getParentId() != null) {
            Forum parentForum = forumService.getById(model.getParentId());
            parentForum.getSubForums().add(forum);
            forumService.create(parentForum);
            res = parentForum;
        }
        return ResponseEntity.ok( mapper.convertTo(res, ForumDto.class) );
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteForum(@PathVariable("id") Long id) {
        forumService.delete(id);
        return ResponseEntity.ok("Successfuly deleted");
    }

    @GetMapping("/all")
    public ResponseEntity<List<ForumDto>> getForums(@RequestParam(value = "subforums", defaultValue = "false") boolean subforums) {
        List<Forum> forums;
        if(!subforums) {
            forums = forumService.getAll().stream()
                    .filter(f -> !forumService.isForumASubForum(f.getId()))
                    .toList();
        } else {
            forums = forumService.getAll();
        }
        return ResponseEntity.ok( mapper.listConvertTo(forums, ForumDto.class) );
    }
}

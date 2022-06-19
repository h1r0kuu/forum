package com.site.forum.controller;

import com.site.forum.dto.ForumDto;
import com.site.forum.entity.Forum;
import com.site.forum.model.ForumModel;
import com.site.forum.service.impl.ForumServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/forums")
@RequiredArgsConstructor
public class ForumController {
    private final ForumServiceImpl forumService;
    private final ForumDto forumDto = new ForumDto();

    @PostMapping(value = "/create")
    public ResponseEntity<ForumDto> create(@RequestBody ForumModel model) {
        Forum res = null;
        Forum forum = forumDto.modelToEntity( model);
        forumService.create(forum);
        res = forum;
        if(model.getParentId() != null) {
            Forum parentForum = forumService.getById(model.getParentId());
            parentForum.getSubForums().add(forum);
            forumService.create(parentForum);
            res = parentForum;
        }
        return ResponseEntity.ok( forumDto.convertToDto(res) );
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteForum(@PathVariable("id") Long id) {
        forumService.delete(id);
        return ResponseEntity.ok("Successfuly deleted");
    }

    @GetMapping("/all")
    public ResponseEntity<List<ForumDto>> getForums(@RequestParam(value = "subforums", defaultValue = "false") boolean subforums) {
        List<ForumDto> forums;
        if(!subforums) {
            forums = forumService.getAll().stream()
                    .filter(f -> !forumService.isForumASubForum(f.getId()))
                    .map(forumDto::convertToDto)
                    .toList();
        } else {
            forums = forumService.getAll().stream()
                    .map(forumDto::convertToDto)
                    .toList();
        }
        return ResponseEntity.ok(forums);
    }
}

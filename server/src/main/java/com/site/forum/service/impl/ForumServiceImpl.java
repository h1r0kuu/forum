package com.site.forum.service.impl;

import com.site.forum.dao.ForumRepository;
import com.site.forum.dto.ForumDto;
import com.site.forum.entity.Forum;
import com.site.forum.service.ForumService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ForumServiceImpl implements ForumService {

    private final ForumRepository forumRepository;

    @Override
    public Forum create(Forum forum) {
        System.out.println(forum.toString());
        Forum createdForum = forumRepository.save(forum);
        return createdForum;
    }

    @Override
    public List<Forum> getAll() {
        List<Forum> forums = forumRepository.findAll();
        return forums;
    }

    @Override
    public Forum getById(Long id) {
        Forum forum = forumRepository.findById(id).orElseThrow();
        return forum;
    }
}

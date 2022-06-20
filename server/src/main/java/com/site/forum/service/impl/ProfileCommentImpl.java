package com.site.forum.service.impl;

import com.site.forum.dao.ProfileCommentRepository;
import com.site.forum.entity.ProfileComment;
import com.site.forum.service.ProfileCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileCommentImpl implements ProfileCommentService {
    private final ProfileCommentRepository repository;

    @Override
    public ProfileComment create(ProfileComment profileComment) {
        return repository.save(profileComment);
    }

    @Override
    public List<ProfileComment> getAllByUserUsername(String username) {
        return repository.findByUser_Username(username);
    }

    @Override
    public List<ProfileComment> getAllByCreatorUsername(String username) {
        return repository.findByCommentator_Username(username);
    }
}

package com.site.forum.service;

import com.site.forum.entity.ProfileComment;

import java.util.List;

public interface ProfileCommentService {
    ProfileComment create(ProfileComment profileComment);
    List<ProfileComment> getAllByUserUsername(String username);
    List<ProfileComment> getAllByCreatorUsername(String username);
}

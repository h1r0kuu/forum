package com.site.forum.model;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class FollowModel {
    @NotBlank(message = "Following username cannot be empty")
    private String followingUsername;
    @NotBlank(message = "Follower username cannot be empty")
    private String followerUsername;
}

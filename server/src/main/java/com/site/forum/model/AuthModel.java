package com.site.forum.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class AuthModel {
    private String username;
    private String password;
}

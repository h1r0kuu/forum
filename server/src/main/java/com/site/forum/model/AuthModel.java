package com.site.forum.model;

import com.sun.istack.NotNull;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class AuthModel {
    @NotNull
    private String username;
    @NotNull
    private String password;
}

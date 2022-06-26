package com.site.forum.exception;

import javax.naming.AuthenticationException;

public class UserNotAuthorized extends AuthenticationException {
    public UserNotAuthorized(String msg) {
        super(msg);
    }
}

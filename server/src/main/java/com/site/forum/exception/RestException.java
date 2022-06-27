package com.site.forum.exception;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;

import java.util.HashMap;
import java.util.NoSuchElementException;

@ControllerAdvice
@ResponseStatus
public class RestException {

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<HashMap<String, Object>> noSuchElementException(NoSuchElementException exception, WebRequest request) {
        HashMap<String, Object> error = new HashMap<>();
        error.put("status_code", HttpStatus.NOT_FOUND.value());
        error.put("error", exception.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(PostIsClosedException.class)
    public ResponseEntity<HashMap<String, Object>> postIsClosedException(PostIsClosedException exception, WebRequest request) {
        HashMap<String, Object> error = new HashMap<>();
        error.put("status_code", HttpStatus.LOCKED.value());
        error.put("error", exception.getMessage());
        return ResponseEntity.status(HttpStatus.LOCKED).body(error);
    }

    @ExceptionHandler(UserNotAuthorized.class)
    public ResponseEntity<HashMap<String, Object>> userNotAuthorized(UserNotAuthorized exception, WebRequest request) {
        HashMap<String, Object> error = new HashMap<>();
        error.put("status_code", HttpStatus.LOCKED.value());
        error.put("error", exception.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<HashMap<String, Object>> userNotAuthorized(ExpiredJwtException exception, WebRequest request) {
        HashMap<String, Object> error = new HashMap<>();
        error.put("status_code", HttpStatus.UNAUTHORIZED.value());
        error.put("error", exception.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }
}
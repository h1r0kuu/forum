package com.site.forum.exception;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@ControllerAdvice
@ResponseStatus
public class RestException extends ResponseEntityExceptionHandler {

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

    private ResponseEntity<Object> exceptionWithBinding(BindException ex,
                                                        HttpHeaders headers,
                                                        HttpStatus status, WebRequest request) {
        HashMap<String, Object> body = new HashMap<>();
        body.put("timestamp", new Date());
        body.put("status", status.value());

        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.toList());

        body.put("errors", errors);

        return new ResponseEntity<>(body, headers, status);
    }
    @Override
    public ResponseEntity<Object> handleBindException(BindException ex,
                                                      HttpHeaders headers,
                                                      HttpStatus status, WebRequest request) {
        return exceptionWithBinding(ex, headers,status,request);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatus status, WebRequest request) {
        return exceptionWithBinding(ex, headers,status,request);
    }
}
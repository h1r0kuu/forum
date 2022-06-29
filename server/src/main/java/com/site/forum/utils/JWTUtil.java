package com.site.forum.utils;

import com.site.forum.entity.User;
import com.site.forum.exception.UserNotAuthorized;
import com.site.forum.service.impl.UserServiceImpl;
import io.jsonwebtoken.*;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.function.Function;

@Component
@RequiredArgsConstructor
@Slf4j
public class JWTUtil {

    private final UserServiceImpl userService;

    @Value(value = "$ {jwt.secret_key}")
    private String SECRET_KEY;

    public String getUsernameFromToken(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 2 * 60 *10 ))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }

    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, user.getUsername());
    }

    private boolean isTokenExpired(String token) {
        boolean res = true;
        try {
            res = extractExpiration(token).before(new Date());
        } catch (MalformedJwtException | ExpiredJwtException e) {
            log.info(e.getMessage());
        }
        return res;
    }

    public boolean validateToken(String token) {
        return !isTokenExpired(token);
    }

    public boolean validateToken(String token, User user) {
        String username = getUsernameFromToken(token);
        return ( (username.equals(user.getUsername())) && (!isTokenExpired(token)) );
    }

    public boolean validateToken(HttpServletRequest request) throws UserNotAuthorized {
        String jwt = extractTokenFromRequest(request);
        return !isTokenExpired(jwt);
    }

    public User extractUserFromToken(String token) throws UserNotAuthorized {
        String username = getUsernameFromToken(token);
        return userService.getUserByUsername(username);
    }
    public String extractTokenFromRequest(HttpServletRequest request) throws UserNotAuthorized {
        String header = request.getHeader("Authorization");
        if(!Objects.nonNull(header) || !header.startsWith("Bearer ")) {
            throw new UserNotAuthorized("User not authorized");
        }
        return header.substring(7);
    }
}

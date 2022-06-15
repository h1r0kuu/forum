package com.site.forum.controller;

import com.site.forum.dto.UserDto;
import com.site.forum.entity.User;
import com.site.forum.enums.UserRole;
import com.site.forum.model.AuthModel;
import com.site.forum.service.impl.PostServiceImpl;
import com.site.forum.service.impl.UserServiceImpl;
import com.site.forum.utils.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.jaas.SecurityContextLoginModule;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authManager;
    private final UserServiceImpl userService;
    private final JWTUtil jwtUtil;

    private final UserDto userDto = new UserDto();

    @PostMapping("/registration")
    public ResponseEntity<UserDto> registration(@RequestBody UserDto userDto,
                                                HttpServletRequest request) {

        if(!userDto.getPassword().equals(request.getParameter("confirm_password"))) {

        }

        userDto.setRole( UserRole.USER );

        userDto.setPassword( new BCryptPasswordEncoder().encode(userDto.getPassword()));
        User createdUser = userService.registration(userDto.convertToEntity(userDto));
        return ResponseEntity.ok(userDto.convertToDto(createdUser));
    }

    @PostMapping("/login")
    public ResponseEntity<HashMap<String, Object>> createAuthToken(@RequestBody AuthModel authModel) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(authModel.getUsername(), authModel.getPassword())
        );
        User user = userService.getUserByUsername(authModel.getUsername());
        String jwt = jwtUtil.generateToken(user);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        HashMap<String, Object> res = new HashMap<>();
        res.put("token", jwt);
        res.put("user", userDto.convertToDto(user));
        return ResponseEntity.ok(res);
    }

    @GetMapping("/refresh")
    public ResponseEntity<HashMap<String, Object>> refreshToken(@RequestParam("token") String jwtToken) {
        String username = jwtUtil.getUsernameFromToken(jwtToken);
        User user = userService.getUserByUsername(username);

        String jwt = jwtUtil.generateToken(user);

        HashMap<String, Object> res = new HashMap<>();
        res.put("token", jwtToken);
        res.put("user", userDto.convertToDto(user));
        return ResponseEntity.ok(res);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null){
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return ResponseEntity.ok("logout");
    }
}

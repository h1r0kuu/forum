package com.site.forum.controller;

import com.site.forum.dto.UserDto;
import com.site.forum.entity.User;
import com.site.forum.enums.UserRole;
import com.site.forum.model.AuthModel;
import com.site.forum.model.RegistrationModel;
import com.site.forum.service.UserService;
import com.site.forum.service.impl.UserServiceImpl;
import com.site.forum.utils.FileUpload;
import com.site.forum.utils.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authManager;
    private final SessionRegistry sessionRegistry;

    private final UserService userService;
    private final JWTUtil jwtUtil;

    private final UserDto userDto = new UserDto();

    @Value("${user.image.upload.path}")
    private String fileUploadPath;

    @PostMapping(value = "/registration", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<UserDto> registration(@Valid @ModelAttribute RegistrationModel userModel) throws IOException {
        MultipartFile file = userModel.getImage();
        userModel.setPassword( new BCryptPasswordEncoder().encode(userModel.getPassword()));

        FileUpload.upload(fileUploadPath, file.getOriginalFilename(), file);

        UserDto user = userDto.modelToDto(userModel);
        user.setImagePath("http://localhost:8080/img/" + file.getOriginalFilename());
        user.setRole(UserRole.USER);
        User createdUser = userService.registration(userDto.convertToEntity(user));
        return ResponseEntity.ok(userDto.convertToDto(createdUser));
    }

    @PostMapping("/login")

    public ResponseEntity<HashMap<String, Object>> createAuthToken(@RequestBody AuthModel authModel,
                                                                   HttpServletRequest request) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(authModel.getUsername(), authModel.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = (User)authentication.getPrincipal();
        String jwt = jwtUtil.generateToken(user);

        HashMap<String, Object> res = new HashMap<>();
        res.put("token", jwt);
        res.put("user", userDto.convertToDto(user));

        sessionRegistry.registerNewSession(user.getId().toString(), authentication.getPrincipal());
        return ResponseEntity.ok(res);
    }

    @GetMapping("/refresh")
    public ResponseEntity<HashMap<String, Object>> refreshToken(@RequestParam("token") String jwtToken) {
        String username = jwtUtil.getUsernameFromToken(jwtToken);
        User user = userService.getUserByUsername(username);
        String jwt = jwtUtil.generateToken(user);

        HashMap<String, Object> res = new HashMap<>();
        res.put("token", jwt);
        res.put("user", userDto.convertToDto(user));

        return ResponseEntity.ok(res);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(Authentication authentication,
                                         HttpServletRequest request,
                                         HttpServletResponse response) {

        new SecurityContextLogoutHandler().logout(request, response, authentication);
        User user = userService.getUserByUsername(authentication.getName());
        sessionRegistry.removeSessionInformation( user.getId().toString() );
        return ResponseEntity.ok("logout");
    }
}

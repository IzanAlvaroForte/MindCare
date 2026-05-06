package com.example.Mindcarebackend_system.Service;

import com.example.Mindcarebackend_system.DTO.Request.RegisterRequest;
import com.example.Mindcarebackend_system.DTO.Response.AuthResponse;
import com.example.Mindcarebackend_system.Modal.User;

import com.example.Mindcarebackend_system.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    // Register new user
    public AuthResponse registerUser(RegisterRequest request) {
        // Check if username exists
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        // Check if email exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // Create new user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setRole("USER");
        user.setStatus("ACTIVE");
        user.setCreatedAt(LocalDateTime.now());

        User savedUser = userRepository.save(user);

        // Return response (token will be added later)
        return new AuthResponse(
                "temp-token-" + savedUser.getId(),
                "Bearer",
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getEmail(),
                savedUser.getRole(),
                savedUser.getStatus(),
                savedUser.getPhone()
        );
    }
}

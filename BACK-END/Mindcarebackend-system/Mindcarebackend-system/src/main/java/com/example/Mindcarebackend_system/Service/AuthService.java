package com.example.Mindcarebackend_system.Service;

import com.example.Mindcarebackend_system.DTO.Request.LoginRequest;
import com.example.Mindcarebackend_system.DTO.Request.RegisterRequest;
import com.example.Mindcarebackend_system.DTO.Response.AuthResponse;
import com.example.Mindcarebackend_system.Modal.User;
import com.example.Mindcarebackend_system.Repository.UserRepository;
import com.example.Mindcarebackend_system.Util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
     private final JwtUtil jwtUtil;  // ← UNCOMMENT FOR JWT

    public AuthResponse register(RegisterRequest request) {
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

        String token = jwtUtil.generateToken(savedUser.getUsername(), savedUser.getRole());

        return new AuthResponse(
                token,
                "Bearer",
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getEmail(),
                savedUser.getRole(),
                savedUser.getStatus(),
                savedUser.getPhone()
        );
    }

    public AuthResponse login(LoginRequest request) {
        // Find user by username
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        // Check password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        if (user.getStatus().equals("DELETED")) {
            throw new RuntimeException("Account has been deleted");
        }

        // Check if account is active
        if (!user.getStatus().equals("ACTIVE")) {
            throw new RuntimeException("Account is " + user.getStatus().toLowerCase());
        }

        // 🔐 JWT CODE (COMMENTED FOR NOW)
         String token = jwtUtil.generateToken(user.getUsername(), user.getRole());

        return new AuthResponse(
                token,
                "Bearer",
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                user.getStatus(),
                user.getPhone()
        );
    }
}


package com.example.Mindcarebackend_system.Controller;

import com.example.Mindcarebackend_system.DTO.Request.LoginRequest;
import com.example.Mindcarebackend_system.DTO.Request.RegisterRequest;
import com.example.Mindcarebackend_system.DTO.Response.AuthResponse;
import com.example.Mindcarebackend_system.Modal.User;
import com.example.Mindcarebackend_system.Repository.UserRepository;
import com.example.Mindcarebackend_system.Service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authService.register(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, Object> request) {
        try {
            Long userId = Long.valueOf(request.get("userId").toString());
            String currentPassword = (String) request.get("currentPassword");
            String newPassword = (String) request.get("newPassword");

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Verify current password
            if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
                return ResponseEntity.badRequest().body("Current password is incorrect");
            }

            // Validate new password
            if (newPassword.length() < 6) {
                return ResponseEntity.badRequest().body("New password must be at least 6 characters");
            }

            // Update password
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setUpdatedAt(LocalDateTime.now());
            userRepository.save(user);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Password changed successfully");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete-account/{userId}")
    public ResponseEntity<?> deleteAccount(@PathVariable Long userId) {
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Soft delete - set status to DELETED
            user.setStatus("DELETED");
            user.setUpdatedAt(LocalDateTime.now());
            userRepository.save(user);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Account deleted successfully");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

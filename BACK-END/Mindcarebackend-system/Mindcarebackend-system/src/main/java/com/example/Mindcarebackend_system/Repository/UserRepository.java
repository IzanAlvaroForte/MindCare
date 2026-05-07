package com.example.Mindcarebackend_system.Repository;

import com.example.Mindcarebackend_system.Modal.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find user by username (for login)
    Optional<User> findByUsername(String username);

    // Find user by email
    Optional<User> findByEmail(String email);

    // Check if username exists
    boolean existsByUsername(String username);

    // Check if email exists
    boolean existsByEmail(String email);

    // Find all users by role (USER or ADMIN)
    List<User> findByRole(String role);

    // Find all active users
    List<User> findByStatus(String status);

    Optional<User> findByUsernameIgnoreCase(String username);
}

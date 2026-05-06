package com.example.Mindcarebackend_system.Repository;

import com.example.Mindcarebackend_system.Modal.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    // Find doctor by email
    Optional<Doctor> findByEmail(String email);

    // Find doctors by specialty
    List<Doctor> findBySpecialty(String specialty);

    // Find doctors by status (ACTIVE, INACTIVE)
    List<Doctor> findByStatus(String status);

    // Find active doctors by specialty
    List<Doctor> findBySpecialtyAndStatus(String specialty, String status);

    // Search doctors by name (contains)
    List<Doctor> findByNameContainingIgnoreCase(String name);
}
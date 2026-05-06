package com.example.Mindcarebackend_system.Modal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "doctors")
@NoArgsConstructor
@AllArgsConstructor
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Doctor name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "Specialty is required")
    @Size(min = 2, max = 50, message = "Specialty must be between 2 and 50 characters")
    @Column(nullable = false)
    private String specialty;

    @Email(message = "Invalid email format")
    @Column(unique = true)
    private String email;

    @Pattern(regexp = "^[0-9]{10,15}$", message = "Phone must be 10-15 digits only")
    private String phone;

    @DecimalMin(value = "0.00", message = "Fee cannot be negative")
    @DecimalMax(value = "10000.00", message = "Fee cannot exceed 10000")
    private Double fee = 500.00;

    @Min(value = 0, message = "Experience cannot be negative")
    @Max(value = 50, message = "Experience cannot exceed 50 years")
    private Integer experience = 0;

    @Column(length = 1000)
    private String bio;

    private String status = "ACTIVE";  // ACTIVE, INACTIVE, ON_LEAVE, BUSY

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // One Doctor has many Appointments
    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Appointment> appointments = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (fee == null) fee = 500.00;
        if (experience == null) experience = 0;
        if (status == null) status = "ACTIVE";
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

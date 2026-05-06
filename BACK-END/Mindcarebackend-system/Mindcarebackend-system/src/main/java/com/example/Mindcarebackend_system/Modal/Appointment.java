package com.example.Mindcarebackend_system.Modal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Entity
@Table(name = "appointments")
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "User is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotNull(message = "Doctor is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @NotNull(message = "Appointment date is required")
    @Future(message = "Appointment date must be in the future")
    @Column(name = "appointment_date", nullable = false)
    private LocalDate appointmentDate;

    @NotNull(message = "Appointment time is required")
    @Column(name = "appointment_time", nullable = false)
    private LocalTime appointmentTime;

    private String status = "PENDING";  // PENDING, CONFIRMED, COMPLETED, CANCELLED, RESCHEDULED

    private String reason;  // Why patient is booking

    private String notes;   // Additional notes for doctor

    @Column(name = "cancelled_at")
    private LocalDateTime cancelledAt;

    private String cancelledReason;

    @Column(name = "rescheduled_from")
    private Long rescheduledFrom;  // Original appointment ID if rescheduled

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) status = "PENDING";
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
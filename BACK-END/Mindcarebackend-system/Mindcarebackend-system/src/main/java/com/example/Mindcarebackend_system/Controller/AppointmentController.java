package com.example.Mindcarebackend_system.Controller;

import com.example.Mindcarebackend_system.Modal.Appointment;
import com.example.Mindcarebackend_system.Modal.Doctor;
import com.example.Mindcarebackend_system.Modal.User;
import com.example.Mindcarebackend_system.Repository.AppointmentRepository;
import com.example.Mindcarebackend_system.Repository.DoctorRepository;
import com.example.Mindcarebackend_system.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AppointmentController {
    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;

    @PostMapping
    public Appointment bookAppointment(@RequestBody Map<String, Object> request) {
        Long userId = ((Number) request.get("userId")).longValue();
        Long doctorId = ((Number) request.get("doctorId")).longValue();
        String date = (String) request.get("date");
        String time = (String) request.get("time");
        String reason = (String) request.get("reason");

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Appointment appointment = new Appointment();
        appointment.setUser(user);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDate(LocalDate.parse(date));
        appointment.setAppointmentTime(LocalTime.parse(time));
        appointment.setReason(reason);
        appointment.setStatus("PENDING");
        appointment.setCreatedAt(LocalDateTime.now());

        return appointmentRepository.save(appointment);
    }

    @GetMapping("/user/{userId}")
    public List<Appointment> getUserAppointments(@PathVariable Long userId) {
        return appointmentRepository.findByUserId(userId);
    }

    @PutMapping("/{id}/cancel")
    public Appointment cancelAppointment(@PathVariable Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointment.setStatus("CANCELLED");
        appointment.setCancelledAt(LocalDateTime.now());
        return appointmentRepository.save(appointment);
    }
}

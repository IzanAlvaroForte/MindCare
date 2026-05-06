package com.example.Mindcarebackend_system.Controller;

import com.example.Mindcarebackend_system.Repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class DashboardController {

    private final AppointmentRepository appointmentRepository;

    @GetMapping("/stats/{userId}")
    public Map<String, Object> getStats(@PathVariable Long userId) {
        List<?> allAppointments = appointmentRepository.findByUserId(userId);
        long total = allAppointments.size();
        long upcoming = appointmentRepository.findByUserIdAndStatus(userId, "PENDING").size();
        long completed = appointmentRepository.findByUserIdAndStatus(userId, "COMPLETED").size();

        Map<String, Object> stats = new HashMap<>();
        stats.put("total", total);
        stats.put("upcoming", upcoming);
        stats.put("completed", completed);
        return stats;
    }
}

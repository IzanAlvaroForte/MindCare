package com.example.Mindcarebackend_system.Controller;

import com.example.Mindcarebackend_system.Modal.Appointment;
import com.example.Mindcarebackend_system.Modal.Doctor;
import com.example.Mindcarebackend_system.Modal.User;
import com.example.Mindcarebackend_system.Repository.AppointmentRepository;
import com.example.Mindcarebackend_system.Repository.DoctorRepository;
import com.example.Mindcarebackend_system.Repository.UserRepository;
import com.example.Mindcarebackend_system.Util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // ========== DASHBOARD STATS ==========
    @GetMapping("/dashboard/stats")
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        long totalUsers = userRepository.count();
        long totalDoctors = doctorRepository.count();
        long totalAppointments = appointmentRepository.count();

        // Today's appointments
        LocalDate today = LocalDate.now();
        long todayAppointments = appointmentRepository.findAll().stream()
                .filter(a -> a.getAppointmentDate().equals(today))
                .count();

        // Status counts
        long pendingAppointments = appointmentRepository.findAll().stream()
                .filter(a -> "PENDING".equals(a.getStatus()))
                .count();

        long completedAppointments = appointmentRepository.findAll().stream()
                .filter(a -> "COMPLETED".equals(a.getStatus()))
                .count();

        long cancelledAppointments = appointmentRepository.findAll().stream()
                .filter(a -> "CANCELLED".equals(a.getStatus()))
                .count();

        stats.put("totalUsers", totalUsers);
        stats.put("totalDoctors", totalDoctors);
        stats.put("totalAppointments", totalAppointments);
        stats.put("todayAppointments", todayAppointments);
        stats.put("pendingAppointments", pendingAppointments);
        stats.put("completedAppointments", completedAppointments);
        stats.put("cancelledAppointments", cancelledAppointments);

        return stats;
    }

    // ========== RECENT APPOINTMENTS ==========
    @GetMapping("/appointments/recent")
    public List<Map<String, Object>> getRecentAppointments() {
        return appointmentRepository.findAll().stream()
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .limit(10)
                .map(a -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", a.getId());
                    map.put("patientName", a.getUser().getUsername());
                    map.put("doctorName", a.getDoctor().getName());
                    map.put("date", a.getAppointmentDate().toString());
                    map.put("time", a.getAppointmentTime().toString());
                    map.put("status", a.getStatus());
                    return map;
                })
                .collect(Collectors.toList());
    }


    // ========== USER MANAGEMENT ==========
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword() != null ? user.getPassword() : "default123"));
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        if (user.getRole() == null) user.setRole("USER");
        if (user.getStatus() == null) user.setStatus("ACTIVE");
        return userRepository.save(user);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        try {
            User user = userRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Update only fields that are provided
            if (updates.containsKey("username")) {
                user.setUsername((String) updates.get("username"));
            }
            if (updates.containsKey("email")) {
                user.setEmail((String) updates.get("email"));
            }
            if (updates.containsKey("phone")) {
                user.setPhone((String) updates.get("phone"));
            }
            if (updates.containsKey("role")) {
                user.setRole((String) updates.get("role"));
            }
            if (updates.containsKey("status")) {
                user.setStatus((String) updates.get("status"));
            }

            user.setUpdatedAt(LocalDateTime.now());

            User saved = userRepository.save(user);
            return ResponseEntity.ok(saved);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/users/{id}")
    public Map<String, String> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User deleted successfully");
        return response;
    }

    // ========== DOCTOR MANAGEMENT ==========
    @GetMapping("/doctors")
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @GetMapping("/doctors/{id}")
    public Doctor getDoctorById(@PathVariable Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
    }

    @PostMapping("/doctors")
    public Doctor createDoctor(@RequestBody Doctor doctor) {
        doctor.setCreatedAt(LocalDateTime.now());
        doctor.setStatus("ACTIVE");
        return doctorRepository.save(doctor);
    }

    @PutMapping("/doctors/{id}")
    public Doctor updateDoctor(@PathVariable Long id, @RequestBody Doctor doctorDetails) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        doctor.setName(doctorDetails.getName());
        doctor.setSpecialty(doctorDetails.getSpecialty());
        doctor.setEmail(doctorDetails.getEmail());
        doctor.setPhone(doctorDetails.getPhone());
        doctor.setFee(doctorDetails.getFee());
        doctor.setExperience(doctorDetails.getExperience());
        doctor.setBio(doctorDetails.getBio());
        doctor.setStatus(doctorDetails.getStatus());
        doctor.setUpdatedAt(LocalDateTime.now());

        return doctorRepository.save(doctor);
    }

    @DeleteMapping("/doctors/{id}")
    public Map<String, String> deleteDoctor(@PathVariable Long id) {
        doctorRepository.deleteById(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Doctor deleted successfully");
        return response;
    }

    // ========== APPOINTMENT MANAGEMENT ==========
    @GetMapping("/appointments")
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @PutMapping("/appointments/{id}/status")
    public Appointment updateAppointmentStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointment.setStatus(request.get("status"));
        appointment.setUpdatedAt(LocalDateTime.now());

        return appointmentRepository.save(appointment);
    }

    @DeleteMapping("/appointments/{id}")
    public Map<String, String> deleteAppointment(@PathVariable Long id) {
        appointmentRepository.deleteById(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Appointment cancelled successfully");
        return response;
    }

    // ========== REPORTS ENDPOINTS ==========

    @GetMapping("/reports/stats")
    public Map<String, Object> getReportsStats() {
        Map<String, Object> stats = new HashMap<>();

        long totalAppointments = appointmentRepository.count();
        long totalUsers = userRepository.count();
        long totalDoctors = doctorRepository.count();

        // Calculate revenue (assuming 500 average fee)
        double totalRevenue = appointmentRepository.findAll().stream()
                .filter(a -> "COMPLETED".equals(a.getStatus()))
                .count() * 500;

        long completedAppointments = appointmentRepository.findAll().stream()
                .filter(a -> "COMPLETED".equals(a.getStatus()))
                .count();

        double completionRate = totalAppointments > 0 ?
                (completedAppointments * 100.0 / totalAppointments) : 0;

        long cancelledAppointments = appointmentRepository.findAll().stream()
                .filter(a -> "CANCELLED".equals(a.getStatus()))
                .count();

        double cancellationRate = totalAppointments > 0 ?
                (cancelledAppointments * 100.0 / totalAppointments) : 0;

        stats.put("totalAppointments", totalAppointments);
        stats.put("totalUsers", totalUsers);
        stats.put("totalDoctors", totalDoctors);
        stats.put("totalRevenue", totalRevenue);
        stats.put("completionRate", Math.round(completionRate));
        stats.put("cancellationRate", Math.round(cancellationRate));
        stats.put("averageRating", 4.8);

        return stats;
    }

    @GetMapping("/reports/status")
    public List<Map<String, Object>> getAppointmentsByStatus() {
        List<Map<String, Object>> statusData = new ArrayList<>();

        Map<String, Long> statusCounts = appointmentRepository.findAll().stream()
                .collect(Collectors.groupingBy(Appointment::getStatus, Collectors.counting()));

        Map<String, String> colors = Map.of(
                "PENDING", "#f59e0b",
                "CONFIRMED", "#10b981",
                "COMPLETED", "#3b82f6",
                "CANCELLED", "#ef4444"
        );

        for (Map.Entry<String, Long> entry : statusCounts.entrySet()) {
            Map<String, Object> item = new HashMap<>();
            item.put("status", entry.getKey());
            item.put("count", entry.getValue());
            item.put("color", colors.getOrDefault(entry.getKey(), "#6b7280"));
            statusData.add(item);
        }

        return statusData;
    }

    @GetMapping("/reports/top-doctors")
    public List<Map<String, Object>> getTopDoctors() {
        List<Map<String, Object>> result = new ArrayList<>();

        try {
            // Group appointments by doctor name
            Map<String, Long> doctorAppointments = appointmentRepository.findAll().stream()
                    .filter(a -> a.getDoctor() != null && a.getDoctor().getName() != null)
                    .collect(Collectors.groupingBy(
                            a -> a.getDoctor().getName(),
                            Collectors.counting()
                    ));

            // Convert to list and sort
            doctorAppointments.entrySet().stream()
                    .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                    .limit(5)
                    .forEach(entry -> {
                        Map<String, Object> doctor = new HashMap<>();
                        doctor.put("name", entry.getKey());
                        doctor.put("appointments", entry.getValue());
                        doctor.put("revenue", entry.getValue() * 500);
                        result.add(doctor);
                    });

        } catch (Exception e) {
            e.printStackTrace();
            // Return empty list on error
        }

        return result;
    }

    @GetMapping("/reports/monthly-trend")
    public List<Map<String, Object>> getMonthlyTrend() {
        List<Map<String, Object>> monthlyData = new ArrayList<>();

        Map<Integer, Long> monthlyCounts = appointmentRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                        a -> a.getCreatedAt().getMonthValue(),
                        Collectors.counting()));

        String[] months = {"Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};

        for (int i = 1; i <= 6; i++) {
            Map<String, Object> month = new HashMap<>();
            month.put("month", months[i - 1]);
            month.put("appointments", monthlyCounts.getOrDefault(i, 0L));
            month.put("revenue", monthlyCounts.getOrDefault(i, 0L) * 500);
            monthlyData.add(month);
        }

        return monthlyData;
    }

    @GetMapping("/reports/activities")
    public List<Map<String, Object>> getRecentActivities() {
        return appointmentRepository.findAll().stream()
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .limit(10)
                .map(a -> {
                    Map<String, Object> activity = new HashMap<>();
                    activity.put("date", a.getCreatedAt().toLocalDate().toString());
                    activity.put("action", "Appointment " + a.getStatus().toLowerCase());
                    activity.put("user", a.getUser().getUsername());
                    activity.put("doctor", a.getDoctor().getName());
                    return activity;
                })
                .collect(Collectors.toList());
    }

    // ========== SETTINGS ENDPOINTS ==========

    @GetMapping("/profile")
    public ResponseEntity<?> getAdminProfile(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Map<String, Object> profile = new HashMap<>();
        profile.put("name", user.getUsername());
        profile.put("email", user.getEmail());
        profile.put("phone", user.getPhone() != null ? user.getPhone() : "");
        profile.put("role", user.getRole());

        return ResponseEntity.ok(profile);
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateAdminProfile(@RequestBody Map<String, Object> profileData, Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean usernameChanged = false;

        if (profileData.containsKey("name") && !profileData.get("name").equals(user.getUsername())) {
            user.setUsername((String) profileData.get("name"));
            usernameChanged = true;
        }
        if (profileData.containsKey("email")) {
            user.setEmail((String) profileData.get("email"));
        }
        if (profileData.containsKey("phone")) {
            user.setPhone((String) profileData.get("phone"));
        }

        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Profile updated successfully");

        // If username changed, generate new token
        if (usernameChanged) {
            String newToken = jwtUtil.generateToken(user.getUsername(), user.getRole());
            response.put("token", newToken);
            response.put("usernameChanged", true);
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/notifications")
    public ResponseEntity<?> getNotificationSettings() {
        Map<String, Boolean> settings = new HashMap<>();
        settings.put("email", true);
        settings.put("sms", false);
        return ResponseEntity.ok(settings);
    }

    @PutMapping("/notifications")
    public ResponseEntity<?> updateNotificationSettings(@RequestBody Map<String, Boolean> settings) {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Notification settings updated");
        return ResponseEntity.ok(response);
    }


}
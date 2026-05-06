package com.example.Mindcarebackend_system.Controller;

import com.example.Mindcarebackend_system.Modal.Doctor;
import com.example.Mindcarebackend_system.Repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorRepository doctorRepository;

    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @GetMapping("/{id}")
    public Doctor getDoctorById(@PathVariable Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
    }
}

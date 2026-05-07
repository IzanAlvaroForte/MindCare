package com.example.Mindcarebackend_system.Config;

import com.example.Mindcarebackend_system.Modal.User;
import com.example.Mindcarebackend_system.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
        // Data initialization disabled - admin user already exists
        System.out.println("ℹ️ Data initialization skipped");
    }
}

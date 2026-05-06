package com.example.Mindcarebackend_system.Repository;

import com.example.Mindcarebackend_system.Modal.Appointment;
import com.example.Mindcarebackend_system.Modal.Doctor;
import com.example.Mindcarebackend_system.Modal.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // Find appointments by user
    List<Appointment> findByUser(User user);

    // Find appointments by user ID
    List<Appointment> findByUserId(Long userId);

    // Find appointments by doctor
    List<Appointment> findByDoctor(Doctor doctor);

    // Find appointments by doctor ID
    List<Appointment> findByDoctorId(Long doctorId);

    // Find appointments by status
    List<Appointment> findByStatus(String status);

    // Find appointments by date
    List<Appointment> findByAppointmentDate(LocalDate date);

    // Find upcoming appointments for a user
    List<Appointment> findByUserIdAndAppointmentDateAfterOrderByAppointmentDateAsc(Long userId, LocalDate date);

    // Find appointments by user and status
    List<Appointment> findByUserIdAndStatus(Long userId, String status);

    // Count appointments by doctor
    Long countByDoctorId(Long doctorId);

    // Count appointments by status
    Long countByStatus(String status);

    // Custom query: Find appointments between dates
    @Query("SELECT a FROM Appointment a WHERE a.appointmentDate BETWEEN :startDate AND :endDate")
    List<Appointment> findAppointmentsBetweenDates(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}
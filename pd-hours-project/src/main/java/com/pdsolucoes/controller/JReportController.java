package com.pdsolucoes.controller;

import com.pdsolucoes.entity.Employee;
import com.pdsolucoes.entity.Report;

import com.pdsolucoes.repository.JEmployeeRepository;
import com.pdsolucoes.repository.JReportRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/report")
public class JReportController {

    @Autowired
    private JReportRepository reportRepository;

    @Autowired
    private JEmployeeRepository employeeRepository;

    @PostMapping
    public ResponseEntity<Report> createReport(@RequestBody Report report) {
        if (report.getDescription() == null || report.getDescription().isEmpty() ||
            report.getEmployee() == null || report.getSpentHours() <= 0) {
            return ResponseEntity.badRequest().build();
        }

        Employee employee = employeeRepository.findById(report.getEmployee().getId()).orElse(null);
        if (employee == null) {
            return ResponseEntity.badRequest().build();
        }

        report.setCreatedAt(LocalDateTime.now());
        Report savedReport = reportRepository.save(report);
        return ResponseEntity.ok(savedReport);
    }

    @GetMapping("/hours-by-member")
    public ResponseEntity<List<Report>> getHoursByMember(
            @RequestParam Long squadId,
            @RequestParam String startDate,
            @RequestParam String endDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime startDateTime = LocalDateTime.parse(startDate, formatter);
        LocalDateTime endDateTime = LocalDateTime.parse(endDate, formatter);
        List<Report> reports = reportRepository.findBySquadIdAndCreatedAtBetween(squadId, startDateTime, endDateTime);
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/total-hours")
    public ResponseEntity<Integer> getTotalHours(
            @RequestParam Long squadId,
            // @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime startDate,
            // @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime endDate) {
            @RequestParam String startDate,
            @RequestParam String endDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime startDateTime = LocalDateTime.parse(startDate, formatter);
        LocalDateTime endDateTime = LocalDateTime.parse(endDate, formatter);
        Integer totalHours = reportRepository.sumSpentHoursBySquadIdAndCreatedAtBetween(squadId, startDateTime, endDateTime);
        return ResponseEntity.ok(totalHours);
    }

    @GetMapping("/average-hours")
    public ResponseEntity<Double> getAverageHours(
            @RequestParam Long squadId,
            @RequestParam String startDate,
            @RequestParam String endDate) {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime startDateTime = LocalDateTime.parse(startDate, formatter);
        LocalDateTime endDateTime = LocalDateTime.parse(endDate, formatter);
        Double averageHours = reportRepository.averageSpentHoursBySquadIdAndCreatedAtBetween(squadId, startDateTime, endDateTime);
        return ResponseEntity.ok(averageHours);
    }
}
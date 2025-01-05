package com.pdsolucoes.repository;

import com.pdsolucoes.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface JReportRepository extends JpaRepository<Report, Long> {

    @Query("SELECT r FROM Report r WHERE r.employee.squad.id = :squadId AND r.createdAt BETWEEN :startDate AND :endDate")
    List<Report> findBySquadIdAndCreatedAtBetween(Long squadId, LocalDateTime startDate, LocalDateTime endDate);

    @Query("SELECT SUM(r.spentHours) FROM Report r WHERE r.employee.squad.id = :squadId AND r.createdAt BETWEEN :startDate AND :endDate")
    Integer sumSpentHoursBySquadIdAndCreatedAtBetween(Long squadId, LocalDateTime startDate, LocalDateTime endDate);

    @Query("SELECT AVG(r.spentHours) FROM Report r WHERE r.employee.squad.id = :squadId AND r.createdAt BETWEEN :startDate AND :endDate")
    Double averageSpentHoursBySquadIdAndCreatedAtBetween(Long squadId, LocalDateTime startDate, LocalDateTime endDate);
}
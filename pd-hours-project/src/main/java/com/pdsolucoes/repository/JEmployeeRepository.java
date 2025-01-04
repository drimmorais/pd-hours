package com.pdsolucoes.repository;

import com.pdsolucoes.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JEmployeeRepository extends JpaRepository<Employee, Long> {
}
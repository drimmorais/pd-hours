package com.pdsolucoes.controller;

import com.pdsolucoes.entity.Employee;
import com.pdsolucoes.repository.JEmployeeRepository;
import com.pdsolucoes.repository.JSquadRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/employee")
public class JEmployeeController {

    @Autowired
    private JEmployeeRepository employeeRepository;

    @Autowired
    private JSquadRepository squadRepository;

    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        if (employee.getSquad() == null || !squadRepository.existsById(employee.getSquad().getId())) {
            return ResponseEntity.badRequest().build();
        }
        Employee savedEmployee = employeeRepository.save(employee);
        return ResponseEntity.ok(savedEmployee);
    }

    @GetMapping
    public ResponseEntity<Boolean> getEmployees() {
        //Iterable<Employee> employees = employeeRepository.findAll();
        return ResponseEntity.ok(true);
    }
}
package com.pdsolucoes.controller;

import com.pdsolucoes.entity.Squad;
import com.pdsolucoes.repository.JSquadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/squad")
public class JSquadController {

    @Autowired
    private JSquadRepository squadRepository;

    @PostMapping
    public ResponseEntity<Squad> createSquad(@RequestBody Squad squad) {
        if (squad.getName() == null || squad.getName().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Squad savedSquad = squadRepository.save(squad);
        return ResponseEntity.ok(savedSquad);
    }
}
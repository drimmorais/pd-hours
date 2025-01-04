package com.pdsolucoes.service;

import com.pdsolucoes.entity.Squad;
import com.pdsolucoes.repository.JSquadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JSquadService {

    @Autowired
    private JSquadRepository squadRepository;

    public List<Squad> findAll() {
        return squadRepository.findAll();
    }

    public Squad save(Squad squad) {
        return squadRepository.save(squad);
    }
}
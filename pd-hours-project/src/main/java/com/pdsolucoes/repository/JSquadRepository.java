package com.pdsolucoes.repository;

import com.pdsolucoes.entity.Squad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JSquadRepository extends JpaRepository<Squad, Long> {
}

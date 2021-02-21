package com.carlease.vehiclelist.repository;

import com.carlease.vehiclelist.model.Make;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MakeRepository extends JpaRepository<Make, Long> {
    
    public Make findByNameIgnoreCase(String name);
}

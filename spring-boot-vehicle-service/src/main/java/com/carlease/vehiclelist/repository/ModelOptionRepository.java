package com.carlease.vehiclelist.repository;

import com.carlease.vehiclelist.model.ModelOption;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModelOptionRepository extends JpaRepository<ModelOption, Long> {
    
}

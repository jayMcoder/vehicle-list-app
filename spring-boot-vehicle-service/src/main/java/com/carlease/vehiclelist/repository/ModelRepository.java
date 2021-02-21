package com.carlease.vehiclelist.repository;

import java.util.List;

import com.carlease.vehiclelist.model.Model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModelRepository extends JpaRepository<Model, Long> {
    
    public List<Model> findByMakeId(Long makeId);

    public Model findByNameIgnoreCase(String name);
}

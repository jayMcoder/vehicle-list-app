package com.carlease.vehiclelist.repository;

import java.util.List;

import com.carlease.vehiclelist.model.ModelEdition;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModelEditionRepository extends JpaRepository<ModelEdition, Long> {
    
    public List<ModelEdition> findByMakeId(Long makeId);

    public List<ModelEdition> findByMakeIdAndModelId(Long makeId, Long modelId);
    
    public ModelEdition findByMakeIdAndModelIdAndNameIgnoreCase(Long makeId, Long modelId, String name);
}

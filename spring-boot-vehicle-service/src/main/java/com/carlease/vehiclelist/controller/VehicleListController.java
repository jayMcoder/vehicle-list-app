package com.carlease.vehiclelist.controller;

import java.util.List;
import java.util.Optional;

import com.carlease.vehiclelist.repository.MakeRepository;
import com.carlease.vehiclelist.repository.ModelEditionRepository;
import com.carlease.vehiclelist.exception.ResourceNotFoundException;
import com.carlease.vehiclelist.model.Make;
import com.carlease.vehiclelist.model.Model;
import com.carlease.vehiclelist.model.ModelEdition;
import com.carlease.vehiclelist.model.ModelOption;
import com.carlease.vehiclelist.repository.ModelOptionRepository;
import com.carlease.vehiclelist.repository.ModelRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class VehicleListController {

    private MakeRepository makeRepository;
    private ModelRepository modelRepository;
    private ModelEditionRepository modelEditionRepository;
    private ModelOptionRepository modelOptionRepository;

    @Autowired
    public void setMakeRepository(MakeRepository makeRepository) {
        this.makeRepository = makeRepository;
    }

    @Autowired
    public void setModelRepository(ModelRepository modelRepository) {
        this.modelRepository = modelRepository;
    }

    @Autowired
    public void setModelEditionRepository(ModelEditionRepository modelEditionRepository) {
        this.modelEditionRepository = modelEditionRepository;
    }

    @Autowired
    public void setModelOptionRepository(ModelOptionRepository modelOptionRepository) {
        this.modelOptionRepository = modelOptionRepository;
    }

    @GetMapping("/make")
    public List<Make> getAllMake() {
        return makeRepository.findAll();
    }

    @GetMapping("/make/{makeId}/model")
    public ResponseEntity<List<Model>> getModelByMake(@PathVariable Long makeId) {
        List<Model> modelList = modelRepository.findByMakeId(makeId);
        if (modelList.size() == 0) {
            throw new ResourceNotFoundException("Model not found for the make id: " + makeId);
        }
        return ResponseEntity.ok(modelList);
    }

    @GetMapping("/edition")
    public ResponseEntity<List<ModelEdition>> getAllModelEdition() {
        return ResponseEntity.ok(modelEditionRepository.findAll());
    }

    @GetMapping("/edition/{modelEditionId}")
    public ResponseEntity<ModelEdition> getModelEditionById(
        @PathVariable Long modelEditionId
    ) {
        return modelEditionRepository.findById(modelEditionId).map(
            modelEdition -> ResponseEntity.ok(modelEdition)
        ).orElseThrow(
            () -> new ResourceNotFoundException("Model edition not found for the model edition id: " + modelEditionId)
        );
    }

    @GetMapping("/make/{makeId}/edition")
    public ResponseEntity<List<ModelEdition>> getModelEditionByMake(
        @PathVariable Long makeId
    ) {
        List<ModelEdition> modelEditionList = modelEditionRepository.findByMakeId(makeId);
        if (modelEditionList.size() == 0) {
            throw new ResourceNotFoundException("Model edition not found for the make id: " + makeId);
        }
        return ResponseEntity.ok(modelEditionList);
    }

    @GetMapping("/make/{makeId}/model/{modelId}/edition")
    public ResponseEntity<List<ModelEdition>> getModelEditionByMakeAndModel(
        @PathVariable Long makeId, 
        @PathVariable Long modelId
    ) {
        List<ModelEdition> modelEditionList = modelEditionRepository.findByMakeIdAndModelId(makeId, modelId);
        if (modelEditionList.size() == 0) {
            throw new ResourceNotFoundException("Model edition not found for the make id: " + makeId + " model id: " + modelId);
        }
        return ResponseEntity.ok(modelEditionList);
    }

    @PostMapping("/edition")
    public ResponseEntity<String> addEdition(@RequestBody ModelEdition modelEditionRequest) {

        Make make = makeRepository.findByNameIgnoreCase(modelEditionRequest.getMake().getName());
        Model model = modelRepository.findByNameIgnoreCase(modelEditionRequest.getModel().getName());

        if (make != null && model != null && 
            modelEditionRepository.findByMakeIdAndModelIdAndNameIgnoreCase(
                make.getId(), model.getId(), modelEditionRequest.getName()) != null) {
                    return ResponseEntity.status(HttpStatus.FOUND).body("Vehicle detail exists");
        }

        if (make == null) {
            make = makeRepository.save(modelEditionRequest.getMake());
        }

        if (model == null) {
            model = modelEditionRequest.getModel();
            model.setMake(make);
            model = modelRepository.save(model);
        }

        ModelEdition newModelEdition = ModelEdition.builder()
            .make(make)
            .model(model)
            .name(modelEditionRequest.getName())
            .basePrice(modelEditionRequest.getBasePrice())
            .description(modelEditionRequest.getDescription()).build();

        ModelEdition modelEdition = modelEditionRepository.save(newModelEdition);

        for(ModelOption option: modelEditionRequest.getModelOptions()) {
            option.setModelEdition(modelEdition);
            modelOptionRepository.save(option);
        }

        return ResponseEntity.ok("Vehicle detail created successfully");
    }

    @PutMapping("/edition/{modelEditionId}")
    public ResponseEntity<ModelEdition> updateEdition(
        @PathVariable Long modelEditionId,
        @RequestBody ModelEdition modelEditionRequest) {
            Optional<ModelEdition> modelEditionData = modelEditionRepository.findById(modelEditionId);

            if(modelEditionData.isPresent()) {
                ModelEdition modelEdition = modelEditionData.get();
                modelEdition.setBasePrice(modelEditionRequest.getBasePrice());
                modelEdition.setDescription(modelEditionRequest.getDescription());
                return ResponseEntity.ok(modelEditionRepository.save(modelEdition));
            } 

            throw new ResourceNotFoundException("Model edition not found for the model edition id = " + modelEditionId);
        }

    @GetMapping("/option") 
    public ResponseEntity<List<ModelOption>> getAllModelOption() {
        return ResponseEntity.ok(modelOptionRepository.findAll());
    }

}

package com.carlease.vehiclelist.model;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "model_edition")
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class ModelEdition {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "make_id", referencedColumnName = "id")
    private Make make;

    @ManyToOne
    @JoinColumn(name = "model_id", referencedColumnName = "id")
    private Model model;

    @NotBlank(message = "Model edition name is mandatory")
    @Size(max = 250)
    @Column(name = "name")
    private String name;

    @NotBlank(message = "Model edition description is mandatory")
    @Lob
    @Column(name = "description")
    private String description;

    @DecimalMin(value = "0.0", inclusive = false)
    @Digits(integer = 6, fraction = 2)
    @Column(name = "base_price")
    private BigDecimal basePrice;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "modelEdition", orphanRemoval = true)
    @JsonIgnoreProperties("modelEdition")
    private List<ModelOption> modelOptions;
}

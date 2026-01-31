package com.ecommerce.backend.dto;

import lombok.Data;

@Data
public class CategoryDTO {

    private Long id;
    private String name;
    private Long parentId;

    public CategoryDTO() {}

    public CategoryDTO(Long id, String name, Long parentId) {
        this.id = id;
        this.name = name;
        this.parentId = parentId;
    }

    // getters & setters
}

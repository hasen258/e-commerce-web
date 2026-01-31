package com.ecommerce.backend.dto;

import lombok.Data;

@Data
public class CustomerDTO {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String password;

    public CustomerDTO() {}

    public CustomerDTO(Long id, String name, String email, String phone, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
    }

    // getters & setters
}

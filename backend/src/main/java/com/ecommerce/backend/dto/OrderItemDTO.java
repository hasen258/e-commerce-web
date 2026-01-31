package com.ecommerce.backend.dto;

import lombok.Data;

import java.math.BigDecimal;
@Data
public class OrderItemDTO {

    private Long productId;
    private String productName;
    private Integer quantity;
    private BigDecimal price;

    public OrderItemDTO() {}

    public OrderItemDTO(Long productId, String productName,
                        Integer quantity, BigDecimal price) {
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
    }

    // getters & setters
}


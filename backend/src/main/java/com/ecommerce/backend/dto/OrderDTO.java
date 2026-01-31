package com.ecommerce.backend.dto;

import lombok.Data;

import java.time.OffsetDateTime;
import java.util.List;

@Data
public class OrderDTO {

    private Long id;
    private OffsetDateTime orderDate;
    private String status;
    private List<OrderItemDTO> items;

    public OrderDTO() {}

    public OrderDTO(Long id, OffsetDateTime orderDate,
                    String status, List<OrderItemDTO> items) {
        this.id = id;
        this.orderDate = orderDate;
        this.status = status;
        this.items = items;
    }

    // getters & setters
}

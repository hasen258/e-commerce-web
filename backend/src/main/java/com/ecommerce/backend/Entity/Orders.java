package com.ecommerce.backend.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "orders")
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customers customer;

    @Column(name = "order_date")
    private OffsetDateTime orderDate;

    @Column(nullable = false)
    private String status;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<Order_items> orderItems = new ArrayList<>();
}

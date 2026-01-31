package com.ecommerce.backend.Repositories;

import com.ecommerce.backend.Entity.Order_items;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends JpaRepository<Order_items, Long> {
}

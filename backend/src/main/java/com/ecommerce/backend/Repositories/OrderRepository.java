package com.ecommerce.backend.Repositories;

import com.ecommerce.backend.Entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Long> {

    // 🔹 Orders of a specific customer
    List<Orders> findByCustomer_Id(Long customerId);
}

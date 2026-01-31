package com.ecommerce.backend.Repositories;

import com.ecommerce.backend.Entity.Customers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customers, Long> {

    Optional<Customers> findByEmail(String email);
}

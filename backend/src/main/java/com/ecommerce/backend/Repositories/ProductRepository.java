package com.ecommerce.backend.Repositories;

import com.ecommerce.backend.Entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Products, Long> {

    // 🔹 All products of a specific category (ex: T-Shirts)
    List<Products> findByCategory_Id(Long categoryId);

    // 🔹 All products under a parent category (ex: Men)
    List<Products> findByCategory_Parent_Id(Long parentCategoryId);

    // 🔹 Filter by category name (ex: "T-Shirts")
    List<Products> findByCategory_Name(String name);

    // 🔹 Filter by parent category name (ex: "Men")
    List<Products> findByCategory_Parent_Name(String parentName);
}

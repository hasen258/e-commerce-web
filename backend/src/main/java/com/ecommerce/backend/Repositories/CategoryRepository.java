package com.ecommerce.backend.Repositories;

import com.ecommerce.backend.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    // 🔹 Get all root categories (Men, Women, Kids)
    List<Category> findByParentIsNull();

    // 🔹 Get subcategories of a category
    List<Category> findByParent_Id(Long parentId);

    // 🔹 Find category by name
    Optional<Category> findByName(String name);
}

package com.ecommerce.backend.Controller;

import com.ecommerce.backend.Service.CategoryService;
import com.ecommerce.backend.dto.CategoryDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/root")
    public List<CategoryDTO> getRootCategories() {
        return categoryService.getRootCategories();
    }

    @GetMapping("/{parentId}/children")
    public List<CategoryDTO> getSubCategories(@PathVariable Long parentId) {
        return categoryService.getSubCategories(parentId);
    }

    @PostMapping
    public CategoryDTO createCategory(@RequestBody CategoryDTO categoryDTO) {
        return categoryService.createCategory(categoryDTO);
    }

    @PutMapping("/{id}")
    public CategoryDTO updateCategory(@PathVariable Long id, @RequestBody CategoryDTO categoryDTO) {
        return categoryService.updateCategory(id, categoryDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
    }
}


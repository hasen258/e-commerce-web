package com.ecommerce.backend.Controller;

import com.ecommerce.backend.Entity.Products;
import com.ecommerce.backend.dto.ProductDTO;
import com.ecommerce.backend.Service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost"})
public class ProductController {

    private final ProductService productService;

    // 🔹 All products
    @GetMapping
    public ResponseEntity<List<ProductDTO>> getProducts(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long parentCategoryId
    ) {

        List<Products> products;

        if (categoryId != null) {
            products = productService.getProductsByCategory(categoryId);
        } else if (parentCategoryId != null) {
            products = productService.getProductsByParentCategory(parentCategoryId);
        } else {
            products = productService.getAllProducts();
        }

        List<ProductDTO> productDTOs = products.stream()
                .map(this::toDto)
                .toList();

        return ResponseEntity.ok(productDTOs);
    }

    private ProductDTO toDto(Products product) {
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStock(),
                product.getImageUrl(),
                product.getCategory().getId(),
                product.getCategory().getName()
        );
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<ProductDTO> createProduct(
            @RequestPart("product") ProductDTO productDTO,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        return ResponseEntity.ok(productService.createProduct(productDTO, image));
    }

    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable Long id,
            @RequestPart("product") ProductDTO productDTO,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        return ResponseEntity.ok(productService.updateProduct(id, productDTO, image));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}

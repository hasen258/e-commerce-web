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
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    private final ProductService productService;

    // 🔹 All products
    @GetMapping
    public ResponseEntity<List<Products>> getProducts(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long parentCategoryId
    ) {

        if (categoryId != null) {
            return ResponseEntity.ok(
                    productService.getProductsByCategory(categoryId)
            );
        }

        if (parentCategoryId != null) {
            return ResponseEntity.ok(
                    productService.getProductsByParentCategory(parentCategoryId)
            );
        }

        return ResponseEntity.ok(productService.getAllProducts());
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

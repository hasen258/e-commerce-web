package com.ecommerce.backend.Service;

import com.ecommerce.backend.Entity.Products;
import com.ecommerce.backend.Repositories.ProductRepository;
import com.ecommerce.backend.Entity.Category;
import com.ecommerce.backend.Repositories.CategoryRepository;
import com.ecommerce.backend.dto.ProductDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final CloudinaryService cloudinaryService;


    public List<Products> getAllProducts() {
        return productRepository.findAll();
    }


    public List<Products> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategory_Id(categoryId);
    }


    public List<Products> getProductsByParentCategory(Long parentCategoryId) {
        return productRepository.findByCategory_Parent_Id(parentCategoryId);
    }

    public ProductDTO createProduct(ProductDTO productDTO, MultipartFile imageFile) {
        Products product = new Products();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setStock(productDTO.getStock());

        if (imageFile != null && !imageFile.isEmpty()) {
            String imageUrl = cloudinaryService.uploadFile(imageFile);
            product.setImageUrl(imageUrl);
        }

        Category category = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        product.setCategory(category);

        Products savedProduct = productRepository.save(product);
        return toDto(savedProduct);
    }

    public ProductDTO updateProduct(Long id, ProductDTO productDTO, MultipartFile imageFile) {
        Products product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setStock(productDTO.getStock());

        if (imageFile != null && !imageFile.isEmpty()) {
            String imageUrl = cloudinaryService.uploadFile(imageFile);
            product.setImageUrl(imageUrl);
        }

        if (productDTO.getCategoryId() != null) {
            Category category = categoryRepository.findById(productDTO.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            product.setCategory(category);
        }

        Products updatedProduct = productRepository.save(product);
        return toDto(updatedProduct);
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found");
        }
        productRepository.deleteById(id);
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
}
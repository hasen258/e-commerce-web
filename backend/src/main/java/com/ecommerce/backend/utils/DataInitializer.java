package com.ecommerce.backend.utils;

import com.ecommerce.backend.Entity.Category;
import com.ecommerce.backend.Entity.Customers;
import com.ecommerce.backend.Entity.Products;
import com.ecommerce.backend.Repositories.CategoryRepository;
import com.ecommerce.backend.Repositories.CustomerRepository;
import com.ecommerce.backend.Repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {

        // Check/Create Admin
        // Admin is handled via Environment Variables in CustomUserDetailsService
        // We do not create it in the database.

        // Check/Create Categories
        Category electronics = createCategoryIfNotFound("Electronics", null);
        Category clothing = createCategoryIfNotFound("Clothing", null);
        Category phones = createCategoryIfNotFound("Smartphones", electronics);
        Category laptops = createCategoryIfNotFound("Laptops", electronics);
        Category tshirts = createCategoryIfNotFound("T-Shirts", clothing);

        // Check/Create Products
        if (productRepository.count() == 0) {
            System.out.println("Initializing sample products...");

            createProduct("iPhone 14", "Latest Apple smartphone", new BigDecimal("999.99"), 50, phones, "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg");
            createProduct("Samsung Galaxy S23", "Android flagship", new BigDecimal("899.99"), 30, phones, "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg");
            createProduct("MacBook Pro 16", "Powerhouse laptop", new BigDecimal("2499.00"), 10, laptops, "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg");
            createProduct("Cotton T-Shirt", "100% Cotton, White", new BigDecimal("19.99"), 100, tshirts, "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg");
            createProduct("Gaming Laptop", "High performance gaming", new BigDecimal("1500.00"), 15, laptops, "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg");
        }
    }

    private Category createCategoryIfNotFound(String name, Category parent) {
        // Simple check by name for data init purposes
        // In real app maybe check by more specific criteria
        Optional<Category> existing = categoryRepository.findAll().stream()
                .filter(c -> c.getName().equalsIgnoreCase(name))
                .findFirst();

        if (existing.isPresent()) {
            return existing.get();
        }

        Category category = new Category();
        category.setName(name);
        category.setParent(parent);
        return categoryRepository.save(category);
    }

    private void createProduct(String name, String description, BigDecimal price, Integer stock, Category category, String imageUrl) {
        Products product = new Products();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setStock(stock);
        product.setCategory(category);
        product.setImageUrl(imageUrl);
        productRepository.save(product);
    }
}

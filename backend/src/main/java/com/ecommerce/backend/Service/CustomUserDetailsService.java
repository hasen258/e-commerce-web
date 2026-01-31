package com.ecommerce.backend.Service;

import com.ecommerce.backend.Entity.Customers;
import com.ecommerce.backend.Repositories.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.email}")
    private String adminEmail;

    @Value("${admin.password}")
    private String adminPassword;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // 1. Check if the user is the Admin from Environment Variables
        if (adminEmail != null && adminEmail.equals(email)) {
            return User.builder()
                    .username(adminEmail)
                    .password(passwordEncoder.encode(adminPassword)) // Encode the plain env password
                    .roles("ADMIN") 
                    .build();
        }

        // 2. Otherwise check the Database for regular customers
        Customers customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        // Regular users get "USER" role automatically
        return User.builder()
                .username(customer.getEmail())
                .password(customer.getPassword()) // Already encoded in DB
                .roles("USER")
                .build();
    }
}

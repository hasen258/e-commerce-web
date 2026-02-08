package com.ecommerce.backend.config;

import com.ecommerce.backend.Entity.Customers;
import com.ecommerce.backend.Repositories.CustomerRepository;
import com.ecommerce.backend.Service.JwtUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final CustomerRepository customerRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @Value("${frontend.url:http://localhost:4200}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        Customers customer;
        Optional<Customers> optionalCustomer = customerRepository.findByEmail(email);

        if (optionalCustomer.isPresent()) {
            customer = optionalCustomer.get();
        } else {
            customer = new Customers();
            customer.setEmail(email);
            customer.setName(name != null ? name : "User");
            customer.setPassword(passwordEncoder.encode(UUID.randomUUID().toString())); // Random password
            customer = customerRepository.save(customer);
        }

        UserDetails userDetails = User.builder()
                .username(customer.getEmail())
                .password(customer.getPassword())
                .roles("USER")
                .build();

        String token = jwtUtil.generateToken(userDetails);

        // Redirect to frontend with token
        String targetUrl = frontendUrl + "/login-success?token=" + token;
        System.out.println("Redirecting to: " + targetUrl);
        
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}

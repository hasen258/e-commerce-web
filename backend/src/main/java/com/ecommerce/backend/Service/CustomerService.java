package com.ecommerce.backend.Service;

import com.ecommerce.backend.Entity.Customers;
import com.ecommerce.backend.Repositories.CustomerRepository;
import com.ecommerce.backend.dto.CustomerDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;


    public CustomerDTO getCustomer(Long id) {
        Customers customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        return toDto(customer);
    }

    public CustomerDTO createCustomer(CustomerDTO customerDTO) {
        Customers customer = new Customers();
        customer.setName(customerDTO.getName());
        customer.setEmail(customerDTO.getEmail());
        customer.setPhone(customerDTO.getPhone());
        customer.setPassword(passwordEncoder.encode(customerDTO.getPassword()));


        Customers savedCustomer = customerRepository.save(customer);
        return toDto(savedCustomer);
    }

    public CustomerDTO updateCustomer(Long id, CustomerDTO customerDTO) {
        Customers customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        customer.setName(customerDTO.getName());
        customer.setEmail(customerDTO.getEmail());
        customer.setPhone(customerDTO.getPhone());
        customer.setPassword(customerDTO.getPassword());

        Customers updatedCustomer = customerRepository.save(customer);
        return toDto(updatedCustomer);
    }

    public void deleteCustomer(Long id) {
        if (!customerRepository.existsById(id)) {
            throw new RuntimeException("Customer not found");
        }
        customerRepository.deleteById(id);
    }

    private CustomerDTO toDto(Customers customer) {
        return new CustomerDTO(
                customer.getId(),
                customer.getName(),
                customer.getEmail(),
                customer.getPhone(),
                customer.getPassword()
        );
    }
}


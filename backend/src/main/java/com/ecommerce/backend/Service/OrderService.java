package com.ecommerce.backend.Service;

import com.ecommerce.backend.Entity.Orders;
import com.ecommerce.backend.Repositories.OrderRepository;
import com.ecommerce.backend.dto.OrderDTO;
import com.ecommerce.backend.dto.OrderItemDTO;
import com.ecommerce.backend.Entity.Customers;
import com.ecommerce.backend.Entity.Order_items;
import com.ecommerce.backend.Entity.Products;
import com.ecommerce.backend.Repositories.CustomerRepository;
import com.ecommerce.backend.Repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;


    public List<OrderDTO> getOrdersByCustomer(Long customerId) {
        return orderRepository.findByCustomer_Id(customerId)
                .stream()
                .map(this::toDto)
                .toList();
    }

    public OrderDTO createOrder(Long customerId, OrderDTO orderDTO) {
        Customers customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Orders order = new Orders();
        order.setCustomer(customer);
        order.setOrderDate(OffsetDateTime.now());
        order.setStatus("PENDING"); // Default status

        List<Order_items> orderItems = orderDTO.getItems().stream()
                .map(itemDto -> {
                    Products product = productRepository.findById(itemDto.getProductId())
                            .orElseThrow(() -> new RuntimeException("Product not found"));

                    Order_items item = new Order_items();
                    item.setOrder(order);
                    item.setProduct(product);
                    item.setQuantity(itemDto.getQuantity());
                    item.setPrice(product.getPrice()); // Use current product price
                    return item;
                })
                .toList();
        
        order.setOrderItems(orderItems);

        Orders savedOrder = orderRepository.save(order);
        return toDto(savedOrder);
    }

    public OrderDTO updateOrder(Long id, OrderDTO orderDTO) {
        Orders order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        // For simplicity, we only allow updating status or maybe items logic is complex
        // Here we just update status if provided
        if (orderDTO.getStatus() != null) {
            order.setStatus(orderDTO.getStatus());
        }
        
        // If you want to update items, it requires clearing old items and adding new ones
        // Implementation depends on requirements. For now, keep it simple.

        Orders updatedOrder = orderRepository.save(order);
        return toDto(updatedOrder);
    }

    public void deleteOrder(Long id) {
        if (!orderRepository.existsById(id)) {
            throw new RuntimeException("Order not found");
        }
        orderRepository.deleteById(id);
    }

    private OrderDTO toDto(Orders order) {
        return new OrderDTO(
                order.getId(),
                order.getOrderDate(),
                order.getStatus(),
                order.getOrderItems().stream()
                        .map(item -> new OrderItemDTO(
                                item.getProduct().getId(),
                                item.getProduct().getName(),
                                item.getQuantity(),
                                item.getPrice()
                        ))
                        .toList()
        );
    }
}

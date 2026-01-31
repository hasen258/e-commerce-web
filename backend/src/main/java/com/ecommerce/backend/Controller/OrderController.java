package com.ecommerce.backend.Controller;

import com.ecommerce.backend.Service.OrderService;
import com.ecommerce.backend.dto.OrderDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/customer/{customerId}")
    public List<OrderDTO> getOrders(@PathVariable Long customerId) {
        return orderService.getOrdersByCustomer(customerId);
    }

    @PostMapping("/customer/{customerId}")
    public OrderDTO createOrder(@PathVariable Long customerId, @RequestBody OrderDTO orderDTO) {
        return orderService.createOrder(customerId, orderDTO);
    }

    @PutMapping("/{id}")
    public OrderDTO updateOrder(@PathVariable Long id, @RequestBody OrderDTO orderDTO) {
        return orderService.updateOrder(id, orderDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
    }
}


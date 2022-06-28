package lt.vtmc.egzaminas.controllers;

import lt.vtmc.egzaminas.services.OrderService;
import lt.vtmc.egzaminas.models.Order;
import lt.vtmc.egzaminas.payloads.responses.OrderResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/orders")
public class OrderController {

    private OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<OrderResponse>> fetchAllOrders() {
        return ResponseEntity.ok().body(this.orderService.getAllOrders());
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> fetchAllUserOrders() {
        return ResponseEntity.ok().body(this.orderService.getAllUserOrders());
    }

    @PostMapping(value = "/{bookId}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') ")
    public ResponseEntity<Order> saveNewUserOrder(@PathVariable Long bookId) {
        return ResponseEntity.ok().body(this.orderService.saveNewOrder(bookId));
    }

    @PostMapping(value = "/{userId}/{bookId}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') ")
    public ResponseEntity<Order> saveNewUserOrderByAdmin(@PathVariable Long userId, @PathVariable Long bookId) {
        return ResponseEntity.ok().body(this.orderService.saveNewOrderByAdmin(userId, bookId));
    }

    @DeleteMapping(value = "/{bookId}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') ")
    public ResponseEntity<String> deleteOrder(@PathVariable Long bookId) {
        return ResponseEntity.ok().body(this.orderService.deleteOrder(bookId));
    }

    @DeleteMapping(value = "/{userId}/{bookId}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN') ")
    public ResponseEntity<String> deleteOrderByAdmin(@PathVariable Long userId, @PathVariable Long bookId) {
        return ResponseEntity.ok().body(this.orderService.deleteOrderByAdmin(userId, bookId));
    }
}

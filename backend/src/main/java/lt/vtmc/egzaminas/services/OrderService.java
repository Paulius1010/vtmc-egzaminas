package lt.vtmc.egzaminas.services;

import lt.vtmc.egzaminas.models.Book;
import lt.vtmc.egzaminas.models.Order;
import lt.vtmc.egzaminas.models.User;
import lt.vtmc.egzaminas.payloads.responses.OrderResponse;
import lt.vtmc.egzaminas.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private OrderRepository orderRepository;
    private UserService userService;
    private BookService bookService;

    @Autowired
    public OrderService(OrderRepository orderRepository, UserService userService, BookService bookService) {
        this.orderRepository = orderRepository;
        this.userService = userService;
        this.bookService = bookService;
    }

    public List<OrderResponse> getAllUserOrders() {
        String currentPrincipalEmail = getCurrentPrincipalEmail();
        User user = userService.getUserByEmail(currentPrincipalEmail).orElse(null);
        if(user != null){
            List<Order> orders = orderRepository.findByUser(user);
            List<OrderResponse> orderResponses = new ArrayList<>();
            for (Order order: orders) {
                Book book = order.getBook();
                orderResponses.add(new OrderResponse(
                        user.getId(),
                        user.getEmail(),
                        book.getCategory().getName(),
                        book.getId(),
                        book.getName()
                ));
            }
            return orderResponses.stream().sorted(Comparator.comparingLong(OrderResponse::getBookId)).collect(Collectors.toList());
        } else {
            return Collections.emptyList();
        }
    }

    public Order saveNewOrder(Long bookId) {
        String currentPrincipalEmail = getCurrentPrincipalEmail();
        User user = userService.getUserByEmail(currentPrincipalEmail).orElse(null);
        Book book = bookService.getBookById(bookId).get();
        if (book.getBooked() == false) {
            Order order = new Order(user, book);
            return orderRepository.save(order);
        } else {
            return null;
        }
    }

    public Order saveNewOrderByAdmin(Long userId, Long bookId) {
        User user = userService.getUserById(userId).get();
        Book book = bookService.getBookById(bookId).get();
        if (book.getBooked() == false) {
            Order order = new Order(user, book);
            return orderRepository.save(order);
        } else {
            return null;
        }
    }

    public String deleteOrder(Long bookId) {
        String currentPrincipalEmail = getCurrentPrincipalEmail();
        User user = userService.getUserByEmail(currentPrincipalEmail).orElse(null);
        if (getAllUserOrders().stream().anyMatch(order -> order.getBookId().equals(bookId))) {
            Order deletingOrder = orderRepository.findByUser(user).stream().filter(order -> order.getBook().getId().equals(bookId)).findFirst().get();
            orderRepository.delete(deletingOrder);
            return "deleted";
        } else {
            return "not find";
        }
    }

    public String deleteOrderByAdmin(Long userId, Long bookId) {
        User user = userService.getUserById(userId).get();
        if (getAllUserOrders().stream().anyMatch(order -> order.getBookId().equals(bookId))) {
            Order deletingOrder = orderRepository.findByUser(user).stream().filter(order -> order.getBook().getId().equals(bookId)).findFirst().get();
            orderRepository.delete(deletingOrder);
            return "deleted";
        } else {
            return "not find";
        }
    }

    private String getCurrentPrincipalEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    public List<OrderResponse> getAllOrders() {
        List<User> users = userService.getAllUsers();
        List<OrderResponse> orderResponses = new ArrayList<>();
        if(!users.isEmpty()){
            for (User user : users) {
                List<Order> orders = orderRepository.findByUser(user);
                for (Order order : orders) {
                    Book book = order.getBook();
                    orderResponses.add(new OrderResponse(
                            user.getId(),
                            user.getEmail(),
                            book.getCategory().getName(),
                            book.getId(),
                            book.getName()
                    ));
                }
            }
            return orderResponses.stream().sorted(Comparator.comparingLong(OrderResponse::getBookId)).collect(Collectors.toList());
        } else {
            return Collections.emptyList();
        }
    }
}

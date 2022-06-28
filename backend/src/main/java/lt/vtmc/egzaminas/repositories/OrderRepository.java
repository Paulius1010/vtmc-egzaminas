package lt.vtmc.egzaminas.repositories;

import lt.vtmc.egzaminas.models.Order;
import lt.vtmc.egzaminas.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUser(User user);
}

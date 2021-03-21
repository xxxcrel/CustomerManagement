package beer.cheese.repository;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import beer.cheese.entity.Customer;
import beer.cheese.entity.Product;
import beer.cheese.entity.Order;


public interface OrderRepository extends JpaRepository<Order, Long> {
   Order findByCustomerAndProduct(Customer customer, Product product);

   @EntityGraph(attributePaths = {"customer", "product"})
   List<Order> findAllByProduct(Product product);

   @EntityGraph(attributePaths = {"customer", "product"})
   List<Order> findAllByCustomer(Customer customer);
}

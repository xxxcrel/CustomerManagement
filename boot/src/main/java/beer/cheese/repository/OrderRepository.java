package beer.cheese.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import beer.cheese.entity.Customer;
import beer.cheese.entity.Product;
import beer.cheese.entity.Order;
import beer.cheese.entity.PurchasingPower;
import beer.cheese.entity.SalesDTO;


public interface OrderRepository extends JpaRepository<Order, Long> {

   @Query("select new beer.cheese.entity.SalesDTO(o.product.name, count(o.product)) from Order o group by o.product")
   List<SalesDTO> groupByProduct();

   @Query("select new beer.cheese.entity.PurchasingPower(o.customer.companyName, count(o.customer)) from Order o group by o.customer order by count(o.customer) desc")
   List<PurchasingPower> groupByCustomer();
   Order findByCustomerAndProduct(Customer customer, Product product);

   @EntityGraph(attributePaths = {"customer", "product"})
   List<Order> findAllByProduct(Product product);

   @EntityGraph(attributePaths = {"customer", "product"})
   List<Order> findAllByCustomer(Customer customer);
}

package beer.cheese.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import beer.cheese.entity.CountDTO;
import beer.cheese.entity.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findByUsername(String username);

    Long countUsersByAgeBetween(Long before, Long after);

    @Query("select new beer.cheese.entity.CountDTO(u.address, count(u.address)) from Customer u group by u.address")
    List<CountDTO> groupByAddress();

    @Query("select new beer.cheese.entity.CountDTO(u.gender, count(u.gender)) from Customer u group by u.gender")
    List<CountDTO> groupByGender();
}
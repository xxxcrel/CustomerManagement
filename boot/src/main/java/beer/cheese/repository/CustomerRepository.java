package beer.cheese.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import beer.cheese.web.response.CountDTO;
import beer.cheese.entity.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Customer findByUsername(String username);

    Customer findByCompanyName(String companyName);

    boolean existsByCompanyName(String companyName);

    Long countUsersByAgeBetween(Long before, Long after);

    @Query("select new beer.cheese.web.response.CountDTO(u.area, count(u.area)) from Customer u group by u.area")
    List<CountDTO> groupByArea();

    @Query("select new beer.cheese.web.response.CountDTO(u.gender, count(u.gender)) from Customer u group by u.gender")
    List<CountDTO> groupByGender();
}
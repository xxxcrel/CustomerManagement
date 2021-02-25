package beer.cheese.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import beer.cheese.entity.CountDTO;
import beer.cheese.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    @Query("select new beer.cheese.entity.CountDTO(u.address, count(u.address)) from User u group by u.address")
    List<CountDTO> groupByAddress();

    @Query("select new beer.cheese.entity.CountDTO(u.gender, count(u.gender)) from User u group by u.gender")
    List<CountDTO> groupByGender();
}
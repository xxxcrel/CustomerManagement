package beer.cheese.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import beer.cheese.entity.Area;

@Repository
public interface AreaRepository extends JpaRepository<Area, Long> {

    @EntityGraph(attributePaths = {"employees", "employees.state"})
    Area findByName(String name);
}

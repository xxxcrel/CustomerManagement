package beer.cheese.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import beer.cheese.entity.Type;

@Repository
public interface TypeRepository extends JpaRepository<Type, Long> {

    Type findByTypeName(String name);
}

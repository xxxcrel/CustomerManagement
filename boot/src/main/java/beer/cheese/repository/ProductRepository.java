package beer.cheese.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import beer.cheese.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Product findProductByName(String name);
}

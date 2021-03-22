package beer.cheese.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import beer.cheese.entity.Product;
import beer.cheese.entity.ProductComment;

public interface ProductCommentRepository extends JpaRepository<ProductComment, Long> {
    List<ProductComment> findAllByProduct(Product product);
}

package beer.cheese.web.api;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import beer.cheese.entity.Customer;
import beer.cheese.entity.Product;
import beer.cheese.entity.Order;
import beer.cheese.entity.ProductComment;
import beer.cheese.repository.CustomerRepository;
import beer.cheese.repository.ProductCommentRepository;
import beer.cheese.repository.ProductRepository;
import beer.cheese.repository.OrderRepository;
import beer.cheese.service.CodeGenerator;
import beer.cheese.view.Result;
import beer.cheese.web.request.CommentRequest;
import beer.cheese.web.request.PurchaseRequest;
import beer.cheese.web.request.RenewRequest;

@RestController
@RequestMapping("/product")
@CrossOrigin
public class ProductController {

    private final Log logger = LogFactory.getLog(getClass());

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductCommentRepository commentRepository;

    @PostMapping("/renew")
    public Result<String> renew(@RequestBody RenewRequest renewRequest){
        Customer customer = customerRepository.getOne(renewRequest.getCustomerId());
        Product product = productRepository.getOne(renewRequest.getProductId());
        Order duration = orderRepository.findByCustomerAndProduct(customer, product);
        duration.setEndTime(renewRequest.getEndTime());
        return Result.ok("续费成功");
    }

    @GetMapping("/all")
    public Result<List<Product>> getAllProduct(){
        return Result.ok(productRepository.findAll());
    }

    @GetMapping("/one")
    public Result<Product> getOne(@RequestParam Long id){
        System.out.println(id);
//        System.out.println(productRepository.getOne(id));
        return Result.ok(productRepository.findById(id).get());
    }
    @GetMapping("/comments")
    public Result<List<ProductComment>> getComments(@RequestParam Long id){
        Product product = productRepository.findById(id).get();
        return Result.ok(commentRepository.findAllByProduct(product));
    }
    @PostMapping("/comment")
    public Result<String> giveAComment(@RequestBody CommentRequest commentRequest){
        Product product = productRepository.findById(commentRequest.getProductId()).get();
        Customer customer = customerRepository.findById(commentRequest.getCustomerId()).get();
        ProductComment comment = new ProductComment();
        comment.setProduct(product);
        comment.setCustomer(customer);
        comment.setRating(commentRequest.getRating());
        comment.setReview(commentRequest.getReview());
        comment.setReviewDate(new Date());
        commentRepository.save(comment);
        Order order = orderRepository.findByCustomerAndProduct(customer, product);
        order.setCommented(true);
        orderRepository.saveAndFlush(order);
        return Result.ok("评论成功");
    }

    @GetMapping("/{id}/order")
    public Result<List<Order>> getCustomer(@PathVariable("id") Long productId){
        Product product = productRepository.findById(productId).get();
        logger.info(product);
        return Result.ok(orderRepository.findAllByProduct(product));
    }

    @PostMapping("/purchase")
    public Result<String> purchaseProduct(@RequestBody PurchaseRequest purchaseRequest){
        System.out.println(purchaseRequest);
        Product product = productRepository.getOne(purchaseRequest.getProductId());
        Customer customer = customerRepository.findByCompanyName(purchaseRequest.getCompanyName());
        Order order = new Order();
        order.setProduct(product);
        order.setCustomer(customer);
        order.setStartTime(purchaseRequest.getStartTime());
        order.setEndTime(purchaseRequest.getEndTime());
        order.setFinalPrice(purchaseRequest.getFinalPrice());
        order.setAuthorizationCode(CodeGenerator.generateAuthorizationCode());
        orderRepository.save(order);
        return Result.ok("购买成功");
    }
}

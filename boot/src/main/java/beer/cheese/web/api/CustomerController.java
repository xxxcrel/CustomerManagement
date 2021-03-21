package beer.cheese.web.api;

import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import beer.cheese.entity.Area;
import beer.cheese.entity.Customer;
import beer.cheese.entity.Order;
import beer.cheese.entity.Type;
import beer.cheese.repository.AreaRepository;
import beer.cheese.repository.TypeRepository;
import beer.cheese.web.request.CustomerDTO;
import beer.cheese.repository.CustomerRepository;
import beer.cheese.repository.OrderRepository;
import beer.cheese.service.CustomerService;
import beer.cheese.view.Result;

@RestController
@RequestMapping(value = "/customer", produces = {MediaType.APPLICATION_JSON_VALUE})
@CrossOrigin
public class CustomerController {

    private static final Log logger = LogFactory.getLog(CustomerController.class);

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private TypeRepository typeRepository;

    @Autowired
    private AreaRepository areaRepository;

    @PostMapping("/login")
    public Result<Customer> login(@RequestParam String username, @RequestParam String password){
        return Result.ok(customerService.login(username, password));
    }

    @GetMapping("/order")
    public Result<List<Order>> purchasedProduct(@RequestParam Long customerId){
        Customer customer = customerRepository.findById(customerId).get();
        List<Order> orderList = orderRepository.findAllByCustomer(customer);
        return Result.ok(orderList);
    }

    @GetMapping(value = "/all", produces = {MediaType.APPLICATION_JSON_VALUE})
    public Result<List<Customer>> getUserList() {
        return Result.ok(customerRepository.findAll());
    }

    @GetMapping
    public Result<Customer> getUser() {
        Customer user = customerRepository.findByUsername("wuxc");
        return Result.ok(user);
    }

    @PostMapping("/add")
    public Result<String> addCustomer(@RequestBody CustomerDTO customerDTO){
        System.out.println(customerDTO);
        if(customerRepository.existsByCompanyName(customerDTO.getCompanyName())){
            return Result.error("该客户已经存在");
        }
        Customer customer = new Customer();
        Type type = typeRepository.findByTypeName(customerDTO.getType());
        Area area = areaRepository.findByName(customerDTO.getArea());
        BeanUtils.copyProperties(customerDTO, customer, "area", "type");
        customer.setType(type);
        customer.setArea(area);
        customerRepository.save(customer);
        return Result.ok("添加" + customerDTO.getCompanyName() + "成功!!!");
    }
    @PutMapping
    public Result<String> updateUser(@RequestParam("user_id") Long userId,
                                     @RequestBody Map<String, String> updateData) {
        return Result.ok("success");
    }

    @DeleteMapping
    public Result<String> removeUser(@RequestParam("user_id")Long userId) {
        customerRepository.deleteById(userId);
        return Result.ok("删除客户: " + userId + " 成功");
    }

}

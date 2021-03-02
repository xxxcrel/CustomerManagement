package beer.cheese.web.api;

import java.util.List;
import java.util.Map;
import java.util.Optional;

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

import beer.cheese.entity.Customer;
import beer.cheese.entity.UserDTO;
import beer.cheese.repository.CustomerRepository;
import beer.cheese.view.Result;

@RestController
@RequestMapping(value = "/user", produces = {MediaType.APPLICATION_JSON_VALUE})
@CrossOrigin
public class UserController {

    private static final Log logger = LogFactory.getLog(UserController.class);

    @Autowired
    private CustomerRepository customerRepository;



    @GetMapping(value = "/all", produces = {MediaType.APPLICATION_JSON_VALUE})
    public Result<List<Customer>> getUserList() {
        return Result.ok(customerRepository.findAll());
    }

    @GetMapping
    public Result<Customer> getUser() {
        Optional<Customer> user = customerRepository.findByUsername("wuxc");
        return Result.ok(user.get());
    }

    @PostMapping
    public Result<String> addUser(@RequestBody UserDTO userDTO){
        Customer customer = new Customer();
        BeanUtils.copyProperties(userDTO, customer);
        customerRepository.save(customer);
        return Result.ok("add " + userDTO.getUsername() + " successful!!!");
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

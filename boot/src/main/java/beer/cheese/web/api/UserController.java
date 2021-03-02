package beer.cheese.web.api;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import beer.cheese.entity.User;
import beer.cheese.entity.UserDTO;
import beer.cheese.repository.UserRepository;
import beer.cheese.view.Result;

@RestController
@RequestMapping(value = "/user", produces = {MediaType.APPLICATION_JSON_VALUE})
@CrossOrigin
public class UserController {

    private static final Log logger = LogFactory.getLog(UserController.class);

    @Autowired
    private UserRepository userRepository;



    @GetMapping(value = "/all", produces = {MediaType.APPLICATION_JSON_VALUE})
    public Result<List<User>> getUserList() {
        return Result.ok(userRepository.findAll());
    }

    @GetMapping
    public Result<User> getUser() {
        Optional<User> user = userRepository.findByUsername("wuxc");
        return Result.ok(user.get());
    }

    @PostMapping
    public Result<String> addUser(@RequestBody UserDTO userDTO){
        User user = new User();
        BeanUtils.copyProperties(userDTO, user);
        userRepository.save(user);
        return Result.ok("add " + userDTO.getUsername() + " successful!!!");
    }
    @PutMapping
    public Result<String> updateUser(@RequestParam("user_id") Long userId,
                                     @RequestBody Map<String, String> updateData) {
        return Result.ok("success");
    }

    @DeleteMapping
    public Result<String> removeUser(@RequestParam("user_id")Long userId) {
        userRepository.deleteById(userId);
        return Result.ok("删除客户: " + userId + " 成功");
    }

}

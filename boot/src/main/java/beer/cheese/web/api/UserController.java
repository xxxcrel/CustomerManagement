package beer.cheese.web.api;

import java.util.List;
import java.util.Optional;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import beer.cheese.entity.User;
import beer.cheese.repository.UserRepository;
import beer.cheese.view.Result;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserController {

    private static final Log logger = LogFactory.getLog(UserController.class);
    @Autowired
    private UserRepository userRepository;

    @PostMapping(value = "/login", produces = {"application/json"} )
    @ResponseStatus(HttpStatus.OK)
    public Result<String> login(@RequestParam("username") String username,
                      @RequestParam("password") String password) {
        logger.info("Username: " + username);
        logger.info("Password: " + password);
        return Result.ok("登入成功");
    }

    @GetMapping(value = "/userList", produces = {MediaType.APPLICATION_JSON_VALUE})
    public Result<List<User>> getUserList(){
        return Result.ok(userRepository.findAll());
    }
    @GetMapping("/user")
    public Result<User> getUser() {
        Optional<User> user = userRepository.findByUsername("wuxc");
        return Result.ok(user.get());
    }

}

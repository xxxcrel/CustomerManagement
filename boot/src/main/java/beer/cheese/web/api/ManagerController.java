package beer.cheese.web.api;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import beer.cheese.view.Result;

@RestController
@RequestMapping("")
public class ManagerController {
    private final Log logger = LogFactory.getLog(getClass());

    @PostMapping(value = "/login", produces = {"application/json"})
    @ResponseStatus(HttpStatus.OK)
    public Result<String> login(@RequestParam("username") String username,
                                @RequestParam("password") String password) {
        logger.info("Username: " + username);
        logger.info("Password: " + password);

        return Result.ok("登入成功");
    }
}

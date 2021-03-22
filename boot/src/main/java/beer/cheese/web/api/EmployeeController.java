package beer.cheese.web.api;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import beer.cheese.entity.Employee;
import beer.cheese.repository.EmployeeRepository;
import beer.cheese.service.EmployeeService;
import beer.cheese.view.Result;

@RestController
@RequestMapping("/employee")
@CrossOrigin
public class EmployeeController {
    private final Log logger = LogFactory.getLog(getClass());

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private EmployeeRepository employeeRepository;


    @PostMapping(value = "/login", produces = {"application/json"})
    @ResponseStatus(HttpStatus.OK)
    public Result<Employee> login(@RequestParam("username") String username,
                                  @RequestParam("password") String password) {
        logger.info("Username: " + username);
        logger.info("Password: " + password);

        return Result.ok(employeeService.login(username, password));
    }

    @GetMapping("/info")
    public Result<Employee> getDetails(@RequestParam("jobNum") String jobNum){
        return Result.ok(employeeRepository.findByJobNum(jobNum).get());
    }

    @GetMapping("/all")
    public Result getAllManager(){
        return Result.ok(employeeRepository.findAll());
    }

    @GetMapping("/findByArea")
    public Result getManagerByArea(@RequestParam("area") String area){
        logger.info(area);
        return Result.ok(employeeRepository.findAllByArea(area));
    }
    @GetMapping("/findAll")
    public Result getAllEmployee(){
        return Result.ok("ok");
    }
}

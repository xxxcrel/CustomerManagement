package beer.cheese.web.api;

import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

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
    public Result<Employee> login(
                                  @RequestParam("username") String username,
                                  @RequestParam("password") String password) {
        logger.info("Username: " + username);
        logger.info("Password: " + password);
        Employee loginEmployee = employeeService.login(username, password);
//        model.addAttribute("info", loginEmployee);
        return Result.ok(loginEmployee);
    }

    @PostMapping("/changePermission")
    public Result<String> changePermission(@RequestParam("id")Long id, @RequestParam("permission")int permission){
        Employee employee = employeeRepository.getOne(id);
        employee.setPermission(permission);
        employeeRepository.save(employee);
        return Result.ok("更新权限成功");
    }

    @PostMapping("/changePwd")
    public Result<String> changePassword(@RequestParam("id") Long id, @RequestParam("newPwd")String newPassword){
        Employee employee = employeeRepository.findById(id).get();
        employee.setPassword(newPassword);
        employeeRepository.save(employee);
        return Result.ok("密码修改成功");
    }
//
//    @GetMapping("/info")
//    public Result<Employee> getDetails(@SessionAttribute("info") Employee info) {
//        return Result.ok(info);
//    }
//
//    @GetMapping("/logout")
//    public Result<String> logout(SessionStatus status){
//        status.setComplete();
//        return Result.ok("logout");
//    }
    @GetMapping("/all")
    public Result getAllManager() {
        return Result.ok(employeeRepository.findAll());
    }

    @GetMapping("/findByArea")
    public Result getManagerByArea(@RequestParam("area") String area) {
        logger.info(area);
        return Result.ok(employeeRepository.findAllByArea(area));
    }

    @GetMapping("/findAll")
    public Result getAllEmployee() {
        return Result.ok("ok");
    }
}

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

import beer.cheese.entity.Area;
import beer.cheese.entity.Manager;
import beer.cheese.repository.AreaRepository;
import beer.cheese.repository.ManagerRepository;
import beer.cheese.service.ManagerService;
import beer.cheese.view.Result;

@RestController
@RequestMapping("/manager")
@CrossOrigin
public class ManagerController {
    private final Log logger = LogFactory.getLog(getClass());

    @Autowired
    private ManagerService managerService;

    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private AreaRepository areaRepository;

    @PostMapping(value = "/login", produces = {"application/json"})
    @ResponseStatus(HttpStatus.OK)
    public Result<String> login(@RequestParam("username") String username,
                                @RequestParam("password") String password) {
        logger.info("Username: " + username);
        logger.info("Password: " + password);

        managerService.login(username, password);
        return Result.ok("登入成功");
    }

    @GetMapping("/info")
    public Result<Manager> getDetails(@RequestParam("jobNum") String jobNum){
        return Result.ok(managerRepository.findByJobNum(jobNum).get());
    }

    @GetMapping("/all")
    public Result getAllManager(){
        return Result.ok(managerRepository.findAll());
    }

    @GetMapping("/findByArea")
    public Result getManagerByArea(@RequestParam("area") String area){
        logger.info(area);
        Area area1 = areaRepository.findByName(area);
        logger.info("hello" + area1.getName() + "nothing");
        logger.info("hello" + area1.getManagers());
        return Result.ok(areaRepository.findByName(area).getManagers());
    }
}

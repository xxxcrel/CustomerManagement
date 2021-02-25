package beer.cheese.web.api;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import beer.cheese.repository.UserRepository;
import beer.cheese.view.Result;

@RestController
@RequestMapping(value = "/api/statistics", produces = {MediaType.APPLICATION_JSON_VALUE})
@CrossOrigin
public class StatisticsController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/gender")
    public Result getFemaleStatistics() {
        return Result.ok(userRepository.groupByGender());
//        return Result.ok("hello");
    }

    @GetMapping("/location")
    public Result getLocationStatistics() {
//        userRepository.groupByAddress().forEach((add)->{
//            System.out.println(add.getAddress());
//            System.out.println(add.getValue());
//        });
        return Result.ok(
                userRepository.groupByAddress());
    }
}
package beer.cheese.web.api;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import beer.cheese.entity.AgeRangeDTO;
import beer.cheese.repository.CustomerRepository;
import beer.cheese.view.Result;

@RestController
@RequestMapping(value = "/api/statistics", produces = {MediaType.APPLICATION_JSON_VALUE})
@CrossOrigin
public class StatisticsController {

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("/gender")
    public Result getFemaleStatistics() {
        return Result.ok(customerRepository.groupByGender());
//        return Result.ok("hello");
    }

    @GetMapping("/location")
    public Result getLocationStatistics() {
        return Result.ok(
                customerRepository.groupByAddress());
    }

    @PostMapping("/age")
    public Result getAgeStatistics(@RequestBody List<AgeRangeDTO> ageList) {
        List<List<String>> resultArray = new ArrayList<>();
        ageList.forEach(ageRange -> {
            String rangeString = ageRange.getAfter() + "-" + ageRange.getBefore();
            Long count = customerRepository.countUsersByAgeBetween(ageRange.getAfter(), ageRange.getBefore());
            resultArray.add(Arrays.asList(rangeString, count.toString()));
        });

        return Result.ok(resultArray);
    }
}

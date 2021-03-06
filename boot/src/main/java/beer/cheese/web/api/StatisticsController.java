package beer.cheese.web.api;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import beer.cheese.repository.CustomerRepository;
import beer.cheese.repository.OrderRepository;
import beer.cheese.view.Result;

@RestController
@RequestMapping(value = "/api/statistics", produces = {MediaType.APPLICATION_JSON_VALUE})
@CrossOrigin
public class StatisticsController {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/gender")
    public Result getFemaleStatistics() {
        return Result.ok(customerRepository.groupByGender());
    }

    @GetMapping("/sales")
    public Result getProductSales() {
        return Result.ok(orderRepository.groupByProduct());
    }
    @GetMapping("/location")
    public Result getLocationStatistics() {
        return Result.ok(customerRepository.groupByArea());
    }
    @GetMapping("/purchasingPower")
    public Result getAgeStatistics() {
        return Result.ok(orderRepository.groupByCustomer()
                .stream().limit(5)
                .collect(Collectors.toList()));
    }
}

package beer.cheese.web.api;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/statis", produces = {MediaType.APPLICATION_JSON_VALUE})
public class StatisController {
}

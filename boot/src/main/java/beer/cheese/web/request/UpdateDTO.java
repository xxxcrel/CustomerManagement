package beer.cheese.web.request;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class UpdateDTO {

    private String username;
    private Long age;
    private String gender;
    private String tel;
    private String area;
}

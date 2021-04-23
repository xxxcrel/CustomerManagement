package beer.cheese.web.request;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class EmployeeEntryDTO {
    private String username;
    private String password;
    private String jobNum;
    private String gender;
    private String tel;
    private Long age;
    private String state;
    private String area;
}

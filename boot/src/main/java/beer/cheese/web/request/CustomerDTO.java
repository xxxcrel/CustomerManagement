package beer.cheese.web.request;

import org.hibernate.annotations.GeneratorType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CustomerDTO {

    private String companyName;
    private String type;
    private String password;
    private String username;
    private Long age;
    private String tel;
    private String address;
    private String gender;
    private String area;
}

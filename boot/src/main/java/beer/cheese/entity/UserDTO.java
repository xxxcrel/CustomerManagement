package beer.cheese.entity;

import org.hibernate.annotations.GeneratorType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private String username;
    private String age;
    private String tel;
    private String address;
    private String gender;
    private String idCard;
}

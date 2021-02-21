package beer.cheese.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tbl_user")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(name = "username", length = 16)
    private String username;

    @Column(name = "id_card", length = 18)
    private String idCard;

    @Column(name = "age")
    private Long age;

    @Column(name = "gender", length = 6)
    private String gender;

    @Column(name = "tel", length = 11)
    private String tel;

    @Column(name = "address")
    private String address;

}

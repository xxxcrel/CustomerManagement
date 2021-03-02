package beer.cheese.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tbl_administrator")
@Setter
@Getter
@AllArgsConstructor
public class Administrator {

    @Id
    private Long id;

    private String username;

    private String password;
}

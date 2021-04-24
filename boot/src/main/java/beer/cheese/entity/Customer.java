package beer.cheese.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tbl_customer")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;

    @Column(name = "username", length = 16)
    private String username;

    private String password;

    @Column(name = "age")
    private Long age;

    @Column(name = "gender", length = 6)
    private String gender;

    @Column(name = "tel", length = 11)
    private String tel;

    @Column(name = "address")
    private String address;

    /**
     * 客户属于哪片区域
     * 1：华东，2：华北，3：华中，4：华南
     */
    private String area;

    /**
     * 客户类型
     * 1：普通用户，2：VIP，3：超级VIP
     */
    @OneToOne
    @JoinColumn(name = "tbl_type_id")
    private Type type;

    public Customer(String companyName, String area, String username, String password, Long age, String gender, String tel, String address) {
        this.companyName = companyName;
        this.area = area;
        this.username = username;
        this.password = password;
        this.age = age;
        this.gender = gender;
        this.tel = tel;
        this.address = address;
    }
}

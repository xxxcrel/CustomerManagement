package beer.cheese.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
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

    @Column(name = "username", length = 16)
    private String username;

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
    @OneToOne
    private Area area;

    /**
     * 客户类型
     * 1：普通用户，2：VIP，3：超级VIP
     */
    @OneToOne
    private Type type;

    /**
     * 客户状态
     * 1：待签约，2：已签约，3：解约中，4：待解约
     */
    @OneToOne
    @JoinColumn(name = "state_id")
    private State state;

    /**
     * 签约日期
     */
    @JsonFormat(pattern = "yyyy/MM/dd")
    private LocalDateTime signDate;

    /**
     * 解约日期
     */
    @JsonFormat(pattern = "yyyy/MM/dd")
    private LocalDateTime terminatedDate;
}

package beer.cheese.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tbl_manager")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Manager {

    @Id
    @GeneratedValue
    private Long id;

    /**
     * 管理员工号
     */
    @Column(name = "job_num")
    private String jobNum;

    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "avatar_url")
    private String avatarUrl;

    /**
     * 入职日期
     */
    @Column(name = "entry_date")
    private Date entryDate;

    private Long age;

    private String gender;

    @OneToMany
    private Set<Area> manageArea = new HashSet<>();

    private int permission;

    /**
     * 员工在职状态
     * 1：实习；2：在职；3：请假中；4：调休中；5：离职
     */
    @OneToOne
    @JoinColumn(name = "state_id")
    private State state;

}

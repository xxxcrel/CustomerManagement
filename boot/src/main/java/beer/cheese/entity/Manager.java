package beer.cheese.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
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

    private int permission;

    /**
     * 员工在职状态
     * 1：在职；2：离职；3：请假中；4：调休中
     */
    private int state;

}

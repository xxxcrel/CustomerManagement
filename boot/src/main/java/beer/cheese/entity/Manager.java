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
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

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
    @JsonFormat(pattern = "yyyy/MM/dd")
    private Date entryDate;

    private Long age;

    private String gender;

    @ManyToMany
    @JoinTable(name = "tbl_manager_area")
    @JsonIgnore
    private Set<Area> areas = new HashSet<>();

    private int permission;

    /**
     * 员工在职状态
     * 1：实习；2：在职；3：请假中；4：调休中；5：离职
     */
    @OneToOne
    @JoinColumn(name = "state_id")
    @JsonIgnore
    private State state;

    @Override
    public String toString() {
       return "name" + username;
    }
}

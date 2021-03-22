package beer.cheese.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tbl_order")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    private Customer customer;

    @OneToOne
    private Product product;

    private Date startTime;

    private Date endTime;

    private long finalPrice;

    private String authorizationCode;

    /**
     * 是否评价
     */
    private boolean commented;
}

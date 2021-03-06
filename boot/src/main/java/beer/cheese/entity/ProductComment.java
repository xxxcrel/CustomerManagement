package beer.cheese.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tbl_comment")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProductComment {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "tbl_product_id")
    private Product product;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "tbl_customer_id")
    private Customer customer;

    private int rating;

    private String review;

    @JsonFormat(pattern = "yyyy/MM/dd")
    private Date reviewDate;

}

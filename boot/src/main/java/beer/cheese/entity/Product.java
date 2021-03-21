package beer.cheese.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "tbl_product")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Product {
    @Id
    private Long id;

    private String name;

    private String desc;

    private String icon;

    private long price;

    /**
     * 促销价格
     */
    private long promotionPrice;

    /**
     * 评分
     */
    private int rating;

    /**
     * 上架时间
     */
    @JsonFormat(pattern = "yyyy/MM/dd")
    private Date launchTime;

}

package beer.cheese.web.request;

import java.util.Date;

import org.springframework.web.bind.annotation.GetMapping;

import com.fasterxml.jackson.annotation.JsonFormat;

import beer.cheese.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PurchaseRequest {

    private Long productId;

    private String companyName;

    private Date startTime;

    private Date endTime;

    private long finalPrice;
}

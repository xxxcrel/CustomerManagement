package beer.cheese.web.request;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RenewRequest {

    private Long productId;

    private Long customerId;

    private Date endTime;

}

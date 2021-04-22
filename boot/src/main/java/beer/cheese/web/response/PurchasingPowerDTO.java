package beer.cheese.web.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PurchasingPowerDTO {

    /**
     * 客户名
     */
    private String username;

    /**
     * 购买数量
     */
    private Long quantity;
}

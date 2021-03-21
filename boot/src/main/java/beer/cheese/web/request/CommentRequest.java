package beer.cheese.web.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class CommentRequest {

    private Long productId;

    private Long customerId;

    private int rating;

    private String review;
}

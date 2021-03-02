package beer.cheese.exception;

import org.springframework.util.ObjectUtils;

import beer.cheese.view.IResultEnum;
import lombok.Getter;

@Getter
public class BaseException extends RuntimeException {
    Object data;
    IResultEnum status;

    public BaseException(IResultEnum status) {
        super(status.getMessage());
        this.status = status;
    }

    public BaseException(IResultEnum status, Object... data) {
        super(status.getMessage());
        this.status = status;
        if (!ObjectUtils.isEmpty(data)) {
            this.data = data;
        }
    }

    public BaseException(IResultEnum status, Throwable cause, Object... data) {
        super(status.getMessage(), cause);
        this.status = status;
        if (!ObjectUtils.isEmpty(data)) {
            this.data = data;
        }
    }
}

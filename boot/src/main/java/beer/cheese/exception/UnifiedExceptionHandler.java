package beer.cheese.exception;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import beer.cheese.view.Result;


@ControllerAdvice
@ConditionalOnWebApplication
public class UnifiedExceptionHandler {

    private final Log logger = LogFactory.getLog(getClass());

    @ExceptionHandler(BaseException.class)
    public Result handleBaseException(BaseException e) {
        return Result.error(e.status.getMessage());
    }

//    @ExceptionHandler(NotFoundException.class)
//    @ResponseStatus(value = HttpStatus.NOT_FOUND)
//    @ResponseBody
//    public Result<String> userNotFound(NotFoundException notFound) {
//        return Result.notFound(notFound.getLocalizedMessage());
//    }
//
//    @ExceptionHandler(AlreadyExistsException.class)
//    @ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
//    @ResponseBody
//    public Result<String> alreadyExists(AlreadyExistsException exception) {
//        Result<String> alreadyExists = new Result<>(exception.getLocalizedMessage());
//        alreadyExists.setStatus(HttpStatus.UNPROCESSABLE_ENTITY.value());
//        return alreadyExists;
//    }
//
//    @ExceptionHandler(AccessDeniedException.class)
//    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
//    @ResponseBody
//    public Result accessDenied(AccessDeniedException e){
//        return new Result(e.getMessage());
//    }
//
//    @ExceptionHandler(MailSendException.class)
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    @ResponseBody
//    public Result mailException(MailSendException e){
//        return new Result(e.getMessage());
//    }

}

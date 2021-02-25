package beer.cheese.view;


public class Result<T> {
    private int code;

    private String message;

    private T data;

    public Result(){

    }

    public static <T> Result<T> ok(T data){
        Result result = new Result();
        result.setData(data);
        result.setMessage("success");
        result.setCode(200);
        return result;
    }

    public static Result error(String message){
        Result result = new Result();
        result.setCode(404);
        result.setMessage(message);
        return result;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

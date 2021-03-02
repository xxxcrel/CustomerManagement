package beer.cheese.view;

public enum ResultEnum implements IResultEnum {
    SUCCESS(200, "success"),
    ERROR(400, "error");
    private final int code;
    private final String message;
    ResultEnum(int code, String message){
        this.code = code;
        this.message = message;
    }

    @Override
    public int getCode() {
        return code;
    }

    @Override
    public String getMessage() {
        return message;
    }
}

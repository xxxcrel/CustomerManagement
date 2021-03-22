package beer.cheese.service;

import java.util.UUID;

public class CodeGenerator {

    public static String generateAuthorizationCode() {
        return UUID.randomUUID().toString().replace("-", "");
    }
}

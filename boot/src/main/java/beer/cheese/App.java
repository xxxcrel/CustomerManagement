package beer.cheese;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import beer.cheese.entity.User;
import beer.cheese.repository.UserRepository;

@SpringBootApplication
public class App {

    public static void main(String[] args) {
       ApplicationContext ctx =  SpringApplication.run(App.class);
//       UserRepository userRepository = (UserRepository) ctx.getBean(UserRepository.class);
//       User user = new User();
//       user.setAge(12L);
//       user.setUsername("wuxc");
//       user.setGender("male");
//       user.setTel("13086114764");
//       user.setIdCard("362331199805140517");
//       userRepository.save(user);
    }

}

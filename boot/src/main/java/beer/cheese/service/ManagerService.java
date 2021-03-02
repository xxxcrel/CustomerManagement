package beer.cheese.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import beer.cheese.entity.Manager;
import beer.cheese.repository.ManagerRepository;
import beer.cheese.repository.UserRepository;

@Service
public class ManagerService {

    private final int DELETE = 0x01 << 1;
    private final int CREATE = 0x01 << 2;
    private final int UPDATE = 0x01 << 3;
    private final int RETRIVE = 0x01 << 4;
    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private UserRepository userRepository;


    public void login(String jobNum, String password) {
        Assert.notNull(jobNum, "工号不能为空");
        Assert.notNull(password, "密码不能为空");

        Manager manager = managerRepository.findByJobNum(jobNum).orElseThrow(() -> new RuntimeException("can't find jobNum: " + jobNum));
        String truePasswd = manager.getPassword();
        if (truePasswd == null || truePasswd.isEmpty() || password.isEmpty() || !truePasswd.equals(password)) {
            throw new RuntimeException("密码错误请重新输入");
        }
    }

    public void modifyPermission(String jobNum, int permission) {
        Manager manager = managerRepository.findByJobNum(jobNum).orElseThrow(() -> new RuntimeException("can't find jobNum: " + jobNum));
        manager.setPermission(permission);
        managerRepository.saveAndFlush(manager);
    }

    

}

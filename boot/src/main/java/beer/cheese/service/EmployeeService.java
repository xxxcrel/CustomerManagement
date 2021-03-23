package beer.cheese.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import beer.cheese.entity.Employee;
import beer.cheese.exception.BaseException;
import beer.cheese.repository.EmployeeRepository;
import beer.cheese.repository.CustomerRepository;
import beer.cheese.view.ResultEnum;

@Service
public class EmployeeService {

    private final int DELETE = 0x01 << 1;
    private final int CREATE = 0x01 << 2;
    private final int UPDATE = 0x01 << 3;
    private final int RETRIVE = 0x01 << 4;
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private CustomerRepository customerRepository;


    public Employee login(String jobNum, String password) {
        Assert.notNull(jobNum, "账号不能为空");
        Assert.notNull(password, "密码不能为空");

        Employee employee = employeeRepository.findByJobNum(jobNum)
                .orElseThrow(() -> new RuntimeException("can't find jobNum: " + jobNum));
        String truePasswd = employee.getPassword();
        if (truePasswd == null || truePasswd.isEmpty() || password.isEmpty()
                || !truePasswd.equals(password)) {
            throw new BaseException(ResultEnum.ERROR, "密码错误");
        }
        return employee;
    }

    public void modifyPermission(String jobNum, int permission) {
        Employee employee = employeeRepository.findByJobNum(jobNum).orElseThrow(() -> new RuntimeException("can't find jobNum: " + jobNum));
        employee.setPermission(permission);
        employeeRepository.saveAndFlush(employee);
    }


}

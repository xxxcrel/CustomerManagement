package beer.cheese.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import beer.cheese.entity.Customer;
import beer.cheese.entity.Employee;
import beer.cheese.exception.BaseException;
import beer.cheese.repository.CustomerRepository;
import beer.cheese.view.ResultEnum;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;
    public Customer login(String username, String password){
        Customer customer = customerRepository.findByUsername(username);
        String truePasswd = customer.getPassword();
        if (truePasswd == null || truePasswd.isEmpty() || password.isEmpty() || !truePasswd.equals(password)) {
            throw new BaseException(ResultEnum.ERROR, "密码错误");
        }
        return customer;
    }
}

package beer.cheese.repository;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import beer.cheese.entity.Area;
import beer.cheese.entity.Customer;
import beer.cheese.entity.Manager;
import beer.cheese.entity.State;
import beer.cheese.entity.Type;

@Component
public class InitData {

    @Autowired
    AreaRepository areaRepository;
    @Autowired
    ManagerRepository managerRepository;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    TypeRepository typeRepository;
    @Autowired
    StateRepository stateRepository;

    String[] names = {"华东", "华西", "华南", "华北"};
    String[] addresses = {"上饶", "深圳", "杭州", "北京", "厦门", "上海", "南昌"};
    String[] gender = {"男", "女"};
    String[] states = {"待签约", "已签约", "解约中", "已解约",
            "实习", "在职", "请假中", "调休中", "离职"};
    Random random = new Random();
    @PostConstruct
    public void init() {
        initState();
        initType();
        initArea();
        initManager();
        initCustomer();
    }

    public void initState(){
        List<State> statesList  = Arrays.stream(states)
                                    .map(state -> {
                                        State stat = new State();
                                        stat.setName(state);
                                        return stat;
                                    }).collect(Collectors.toList());
        stateRepository.saveAll(statesList);
    }

    public void initArea() {
        List<Area> areaList = Arrays.stream(names).map(name -> {
            Area area = new Area();
            area.setName(name);
            return area;
        }).collect(Collectors.toList());
        areaRepository.saveAll(areaList);
    }

    public void initType() {
        HashMap<String, String> types = new HashMap<>();
        types.put("NORMAL", "普通客户");
        types.put("VIP", "重要客户");
        types.put("SVIP", "非常重要客户");
        List<Type> typeList = types.entrySet()
                .stream()
                .map(entry -> {
                    Type type = new Type();
                    type.setTypeName(entry.getKey());
                    type.setTypeDesc(entry.getValue());
                    return type;
                }).collect(Collectors.toList());
        typeRepository.saveAll(typeList);
    }

    public void initManager() {
        IntStream.rangeClosed(1, 10)
                .forEach(i -> {
                    Manager manager = buildManager(i);
                    managerRepository.save(manager);
                });
    }

    private Manager buildManager(int stepNum) {
        Manager manager = new Manager();
        manager.setUsername("管理员" + stepNum + "号");
        manager.setJobNum("12312" + stepNum);
        manager.setPassword("password" + stepNum);
        manager.setTel("1877777232" + stepNum);
        manager.setAvatarUrl("http://www.cheese.beer/img/img" + stepNum + ".jpg");
        manager.setEntryDate(new Date());
        manager.setAge(20L + stepNum);

        manager.setGender(stepNum % 2 == 0 ? "男" : "女");
        manager.setState(stateRepository.findByName("实习"));
        manager.setPermission(0x01 << 1);
        Area area = areaRepository.findByName(names[stepNum % 4]);
        manager.getAreas().add(area);
        return manager;
    }

    public void initCustomer() {
        IntStream.rangeClosed(1, 20)
                .forEach(i -> {
                    Customer customer = buildCustomer(i);
                    customerRepository.save(customer);
                });

    }

    private Customer buildCustomer(int stepNum) {

        Customer customer = new Customer();
        customer.setUsername(stepNum + "号客户");
        customer.setAge(20L + stepNum);
        customer.setGender(gender[random.nextInt(gender.length)]);
        customer.setSignDate(LocalDateTime.now().plusDays(stepNum));
        Long tel = 13023311923L + stepNum;
        customer.setTel(tel.toString());
        Type type = typeRepository.findByTypeName("NORMAL");
        customer.setType(type);
        customer.setState(stateRepository.findByName("已签约"));
        customer.setAddress(addresses[random.nextInt(addresses.length)]);
        customer.setArea(areaRepository.findByName(names[stepNum % 4]));
        return customer;
    }
}

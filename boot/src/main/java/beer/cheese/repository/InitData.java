package beer.cheese.repository;

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

import beer.cheese.entity.Customer;
import beer.cheese.entity.Employee;
import beer.cheese.entity.Order;
import beer.cheese.entity.Product;
import beer.cheese.entity.ProductComment;
import beer.cheese.entity.State;
import beer.cheese.entity.Type;

@Component
public class InitData {

    @Autowired
    EmployeeRepository employeeRepository;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    TypeRepository typeRepository;
    @Autowired
    StateRepository stateRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    ProductCommentRepository commentRepository;

    static String[] areas = {"华东", "华西", "华南", "华北"};
    String[] addresses = {"上饶", "深圳", "杭州", "北京", "厦门", "上海", "南昌"};
    String[] gender = {"男", "女"};
    String[] states = {"实习", "在职", "请假中", "调休中", "离职"};
    Random random = new Random();

    static Product[] products;
    static Customer[] customers;
    static ProductComment[] productComments;

    static {
        products = new Product[6];
        products[0] = new Product(1L,
                "IDEA企业版",
                "IntelliJ IDEA的每个方面都是为了最大化开发人员的生产力而设计的。智能编码辅助和人体工程学设计使开发不仅富有成效，而且令人愉快。",
                "http://www.cheese.beer/img/Idea.png",
                1000,
                888,
                4,
                new Date(18, 3, 23));
        products[1] = new Product(2L,
                "Office办公",
                "Office是基于云的生产力方面的领军应用，可助你的企业更上一层楼。了解集成云平台的优势，该平台提供了行业领先的生产力应用（例如 Microsoft Teams、Word、Excel 和 PowerPoint）以及智能云服务和一流的安全性。",
                "http://www.cheese.beer/img/office365.png",
                2000,
                1988,
                5,
                new Date(26, 2, 3));
        products[2] = new Product(3L,
                "GHelper",
                "这是一个浏览器插件，为开发者，跨境工作人员，和研究机构，以确保和加快互联网冲浪。",
                "http://www.cheese.beer/img/Ghelper.png",
                200,
                156,
                3,
                new Date(23, 7, 12));
        products[3] = new Product(4L,
                "Clion",
                "一个强大语言的强大工具, 智能的c和c++编辑器, CLion运行它的代码分析、数据流分析、其他基于clang的检查和Clang-Tidy，以检测未使用和无法到达的代码、悬空指针、缺少类型转换、没有匹配的函数重载，以及许多其他问题。",
                "http://www.cheese.beer/img/Clion.png",
                200,
                156,
                3,
                new Date(22, 7, 12));
        products[4] = new Product(5L,
                "堡垒机",
                "堡垒机设备支持统一账户管理策略，能够实现对所有服务器、网络设备、安全设备等账号进行集中管理，完成对账号整个生命周期的监控，并且可以对设备进行特殊角色设置如：审计巡检员、运维操作员、设备管理员等自定义设置，以满足审计需求。",
                "http://www.cheese.beer/img/shterm.png",
                30000,
                28888,
                5,
                new Date(24, 2, 12));
        products[5] = new Product(6L,
                "Webstorm",
                "使用现代JavaScript生态系统的全部力量，WebStorm让你覆盖!享受智能代码完成、实时错误检测、强大的导航和JavaScript、TypeScript、样式表语言以及所有最流行框架的重构吧。",
                "http://www.cheese.beer/img/Webstorm.png",
                1299,
                1199,
                5,
                new Date(29, 7, 12));

        customers = new Customer[6];
        customers[0] = new Customer(
                "北京网讯有限公司",
                areas[0],
                "王中磊",
                "A123456",
                32L,
                "男",
                "18823228921",
                "北京市海淀区上地十街");
        customers[1] = new Customer(
                "广州亚德有限公司",
                areas[2],
                "刘全",
                "A123456",
                36L,
                "男",
                "17790986921",
                "广州市天河区岑村松岗大街");
        customers[2] = new Customer(
                "杭州烈米网络有限公司",
                areas[2],
                "韩坤",
                "A123456",
                28L,
                "男",
                "1382322921",
                "杭州市江干去新加坡科技园");
        customers[3] = new Customer(
                "海康视有限公司",
                areas[3],
                "夏浩飞",
                "A123456",
                22L,
                "男",
                "18823228921",
                "杭州市滨江区阡陌路");
        customers[4] = new Customer(
                "夏门寻梦有限公司",
                areas[1],
                "罗学军",
                "A123456",
                32L,
                "男",
                "18823228921",
                "厦门市石狮南京西路");
        customers[5] = new Customer(
                "南昌视界有限公司",
                areas[1],
                "华之远",
                "A123456",
                44L,
                "男",
                "18823228921",
                "南昌市红谷滩区天祥大道");

        productComments = new ProductComment[6];

    }

    @PostConstruct
    public void init() {
        initState();
        initType();
        initProduct();
        initEmployee();
        initCustomer();
        mockPurchaseProduct();
    }

    public void mockPurchaseProduct() {
        Customer wang = customerRepository.findByUsername("王中磊");
        Product one = productRepository.getOne(1L);
        Order order = new Order();
        order.setCustomer(wang);
        order.setProduct(one);
        order.setStartTime(new Date());
        order.setEndTime(new Date());
        order.setFinalPrice(800);
        ProductComment comment = new ProductComment();
        comment.setProduct(one);
        comment.setCustomer(wang);
        comment.setRating(4);
        comment.setReview("IDEA企业版非常好用, 公司程序员嘴都笑歪了");
        comment.setReviewDate(new Date());
        order.setCommented(true);

        Customer liu = customerRepository.findByUsername("刘全");
        Product two = productRepository.getOne(2L);
        Order order2 = new Order();
        order2.setCustomer(liu);
        order2.setProduct(two);
        order2.setStartTime(new Date());
        order2.setEndTime(new Date());
        order2.setFinalPrice(800);
        order2.setCommented(true);
        ProductComment comment2 = new ProductComment();
        comment2.setProduct(two);
        comment2.setCustomer(liu);
        comment2.setRating(5);
        comment2.setReview("公司员工非常喜欢Office, 极大了增加了公司的生产力");
        comment2.setReviewDate(new Date());


        Customer han = customerRepository.findByUsername("韩坤");
        Product three = productRepository.getOne(3L);
        Order order3 = new Order();
        order3.setCustomer(han);
        order3.setProduct(three);
        order3.setStartTime(new Date());
        order3.setEndTime(new Date());
        order3.setFinalPrice(800);
        order3.setCommented(true);
        ProductComment comment3 = new ProductComment();
        comment3.setProduct(three);
        comment3.setCustomer(han);
        comment3.setRating(4);
        comment3.setReview("Ghelper用来访问国外高质量学习网站非常快速,从此知识没有围墙");
        comment3.setReviewDate(new Date());

        Customer xia = customerRepository.findByUsername("夏浩飞");
        Product four = productRepository.getOne(4L);
        Order order4 = new Order();
        order4.setCustomer(xia);
        order4.setProduct(four);
        order4.setStartTime(new Date());
        order4.setEndTime(new Date());
        order4.setFinalPrice(800);
        order4.setCommented(true);
        ProductComment comment4 = new ProductComment();
        comment4.setProduct(four);
        comment4.setCustomer(xia);
        comment4.setRating(3);
        comment4.setReview("非常好用");
        comment4.setReviewDate(new Date());

        Customer luo = customerRepository.findByUsername("罗学军");
        Product five = productRepository.getOne(5L);
        Order order5 = new Order();
        order5.setCustomer(luo);
        order5.setProduct(five);
        order5.setStartTime(new Date());
        order5.setEndTime(new Date());
        order5.setFinalPrice(800);
        order5.setCommented(true);
        ProductComment comment5 = new ProductComment();
        comment5.setProduct(five);
        comment5.setCustomer(luo);
        comment5.setRating(3);
        comment5.setReview("非常好用");
        comment5.setReviewDate(new Date());

        Customer hua = customerRepository.findByUsername("华之远");
        Product six = productRepository.getOne(6L);
        Order order6 = new Order();
        order6.setCustomer(hua);
        order6.setProduct(six);
        order6.setStartTime(new Date());
        order6.setEndTime(new Date());
        order6.setFinalPrice(800);
        order6.setCommented(true);
        ProductComment comment6 = new ProductComment();
        comment6.setProduct(six);
        comment6.setCustomer(hua);
        comment6.setRating(3);
        comment6.setReview("非常好用");
        comment6.setReviewDate(new Date());

        orderRepository.save(order);
        orderRepository.save(order2);
        orderRepository.save(order3);
        orderRepository.save(order4);
        orderRepository.save(order5);
        orderRepository.save(order6);

        commentRepository.save(comment);
        commentRepository.save(comment2);
        commentRepository.save(comment3);
        commentRepository.save(comment4);
        commentRepository.save(comment5);
        commentRepository.save(comment6);
    }

    public void initState() {
        List<State> statesList = Arrays.stream(states)
                .map(state -> {
                    State stat = new State();
                    stat.setName(state);
                    return stat;
                }).collect(Collectors.toList());
        stateRepository.saveAll(statesList);
    }

    public void initType() {
        HashMap<String, String> types = new HashMap<>();
        types.put("PERSONAL", "个人的");
        types.put("INDIVIDUAL", "私企");
        types.put("STATE-OWNED", "国企");
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

    public void initProduct() {
        IntStream.rangeClosed(0, 5)
                .forEach(i -> {
                    productRepository.save(buildProduct(i));
                });
    }

    public Product buildProduct(int i) {

        return products[i];
    }

    public void initEmployee() {
        IntStream.rangeClosed(1, 10)
                .forEach(i -> {
                    Employee employee = buildEmployee(i);
                    employeeRepository.save(employee);
                });
    }

    private Employee buildEmployee(int stepNum) {
        Employee employee = new Employee();
        employee.setUsername("员工" + stepNum + "号");
        employee.setJobNum("12312" + stepNum);
        employee.setPassword("password" + stepNum);
        employee.setTel("1877777232" + stepNum);
        employee.setAvatarUrl("http://www.cheese.beer/img/img" + stepNum + ".jpg");
        employee.setEntryDate(new Date());
        employee.setAge(20L + stepNum);

        employee.setGender(stepNum % 2 == 0 ? "男" : "女");
        employee.setState(stateRepository.findByName("实习"));
        employee.setPermission(0x01 << 1);
        employee.setArea(areas[random.nextInt(4)]);
        return employee;
    }

    public void initCustomer() {
        IntStream.rangeClosed(0, 5)
                .forEach(i -> {
                    customerRepository.save(buildCustomer(i));
                });

    }

    private Customer buildCustomer(int stepNum) {
        Type type = typeRepository.findByTypeName("INDIVIDUAL");
        customers[stepNum].setType(type);
        return customers[stepNum];
    }
}

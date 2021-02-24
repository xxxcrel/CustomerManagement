package beer.cheese.entity;


import org.springframework.web.bind.annotation.GetMapping;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AddressCount {

    String address;

    Long value;

//    public AddressCount(String address, String value){
//        this.address = address;
//        this.value = value;
//    }
}

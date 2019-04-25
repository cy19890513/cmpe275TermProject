package hello;//modify this

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class EmployeeController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    //employee?name=XX&email=ZZ&title=UU&street=VV...manageId=WW&employerId=BB&format={json | xml }
    @PostMapping("/employee")
    public Greeting greeting(@RequestParam String name, @RequestParam String employerId, @RequestParam String email
    ) {

        //name, employer ID, and email are required. Anything else is optional

        //Collaborators or reports are not allowed to be passed in as a parameter


        return new Employee(name, employerId, email);


    }
}
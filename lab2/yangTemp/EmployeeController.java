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
    @RequestMapping("/greeting")
    public Greeting greeting(@RequestParam(value="name", defaultValue="World") String name) {
        return new Greeting(counter.incrementAndGet(),
                            String.format(template, name));
    }
}
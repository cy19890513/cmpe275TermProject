package edu.cmpe275.group275.openhack.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import edu.cmpe275.group275.openhack.service.*;
import edu.cmpe275.group275.openhack.model.*;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.server.ResponseStatusException;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Aspect
@Component
@Order(2)
public class UserRoleCheckAspect {

    private UserService userService;

    public UserRoleCheckAspect(UserService userService) {
        this.userService = userService;
    }

    //hacker
    // public ResponseEntity<?> joinHackathon


    // @Before("execution(public * edu.cmpe275.group275.openhack.controller.HackathonController.*(..))")
    // public void dummyAdvice(JoinPoint joinPoint) {
    //     System.out.printf("Doing validation prior to the executuion of the metohd %s\n", joinPoint.getSignature().getName());
    // }




    // //admin hackathon create edit judge assign
    // public ResponseEntity<?> createHackathon
    // public ResponseEntity<?> closeHackathon
    // public ResponseEntity<?> openHackathon
    // public ResponseEntity<?> finalizeHackathon


    @Before("execution(public * edu.cmpe275.group275.openhack.controller.HackathonController.*(..))")
    public void checkIsAdmin(JoinPoint joinPoint) {

        String methodName = joinPoint.getSignature().getName();
System.out.println("checkIsAdmin "+methodName);

        if(!methodName.equals("createHackathon") && !methodName.equals("closeHackathon")
           && !methodName.equals("openHackathon") && !methodName.equals("finalizeHackathon")
        ){
            return;
        }

        try{
            Map<String, Object> payload = (Map)joinPoint.getArgs()[0];
            long uid = Long.parseLong(String.valueOf(payload.get("uid")));
            User user = userService.getUser(uid);
            String role = user.getRole();
            if(!role.equalsIgnoreCase("Admin"))
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "user have to be admin to edit it.");
        }catch(Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "user have to be admin to edit it.");
        }
    }

}
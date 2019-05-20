package edu.cmpe275.group275.openhack.aspect;


import edu.cmpe275.group275.openhack.controller.TestAuth;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpSession;
import java.util.Map;

@Aspect
@Component
@Order(0)
public class TestAspect {
    private TestAuth testAuth;

    public TestAspect(TestAuth testAuth) {
        this.testAuth = testAuth;
    }

    @Around("execution(* edu.cmpe275.group275.openhack.controller.TestAuth.*(..))")
    public ResponseEntity<?> testSession(ProceedingJoinPoint pjp) {
        Object[] args = pjp.getArgs();
        Map<String, Object> payload = (Map<String, Object>) args[0];
        HttpSession session = (HttpSession) args[1];

        if (!payload.containsKey("uid")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("uid required");
        }

        for (Object arg : args) {
            System.out.println(arg.getClass().getName());
        }
        ResponseEntity result = null;
        try {
            result = (ResponseEntity) pjp.proceed();
        } catch (Throwable e) {
            System.out.println(e.getMessage());
        }
        return result;
    }
}

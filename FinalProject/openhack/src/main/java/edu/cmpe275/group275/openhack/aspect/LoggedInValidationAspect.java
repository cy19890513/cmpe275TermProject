package edu.cmpe275.group275.openhack.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpSession;
import java.util.Map;
import java.util.Set;

@Aspect
@Component
@Order(0)
public class LoggedInValidationAspect {

    @Around("@annotation(PostLoggedInRequired)")
    public ResponseEntity<?> isLoggedInPost(ProceedingJoinPoint pjp) {
        Object[] args = pjp.getArgs();
        Map<String, Object> payload = (Map<String, Object>) args[0];
        HttpSession session = (HttpSession) args[1];
        Set<Long> uidSet = (Set<Long>) session.getAttribute("uid");

        long uid = Long.valueOf(String.valueOf(payload.get("uid")));

        if (uidSet == null || !uidSet.contains(uid)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Logged in required");
        }
        ResponseEntity res = null;
        try {
            res = (ResponseEntity) pjp.proceed();
        } catch (Throwable e) {
            System.out.println(e.getMessage());
        }

        return res;
    }


    @Around("@annotation(GetLoggedInRequired)")
    public ResponseEntity<?> isLoggedInGet(ProceedingJoinPoint pjp) {
        Object[] args = pjp.getArgs();
        HttpSession session = (HttpSession) args[0];
        Long uid = (Long) args[1];
        Set<Long> uidSet = (Set<Long>) session.getAttribute("uid");

        if (uidSet == null || !uidSet.contains(uid)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Logged in required");
        }
        ResponseEntity res = null;
        try {
            res = (ResponseEntity) pjp.proceed();
        } catch (Throwable e) {
            System.out.println(e.getMessage());
        }
        return res;
    }
}

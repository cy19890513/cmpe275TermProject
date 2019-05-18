package edu.cmpe275.group275.openhack.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.core.annotation.Order;

@Aspect
@Order(1)

public class ValidationAspect {

    @Before("execution(public * edu.cmpe275.group275.openhack.controller.HackathonController.*(..))")
    public Object idValidation(JoinPoint joinPoint) {
        System.out.printf("Doing validation prior to the executuion of the metohd %s\n", joinPoint.getSignature().getName());
        Object res = null;

        String methodName = joinPoint.getSignature().getName();

        Object[] args = joinPoint.getArgs();

        return null;
    }

}

package edu.cmpe275.group275.openhack.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.core.annotation.Order;
import edu.cmpe275.group275.openhack.service.*;
import edu.cmpe275.group275.openhack.model.*;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Aspect
@Component
@Order(1)
public class AccessControlAspect {

    private HackathonService hackathonService;
    private HackerUserService hackerUserService;
    public AccessControlAspect(HackathonService hackathonService, HackerUserService hackerUserService){
        this.hackathonService = hackathonService;
        this.hackerUserService = hackerUserService;
    }




    @Before("execution(public * edu.cmpe275.group275.openhack.controller.HackathonController.*(..))")
    public void dummyAdvice(JoinPoint joinPoint) {
        System.out.printf("Doing validation prior to the executuion of the metohd %s\n", joinPoint.getSignature().getName());
    }

    @Before("execution(public * edu.cmpe275.group275.openhack.controller.HackathonController.*(..))")
    public void access(JoinPoint joinPoint) {

        String methodName = joinPoint.getSignature().getName();
        if(methodName.equals("getEvaluation")){
            long uid = (long)joinPoint.getArgs()[0];
            long hid = (long) joinPoint.getArgs()[1];
            boolean isJudge = false;
            System.out.println(isJudge);
            Hackathon hackathon = hackathonService.getHackathon(hid);
            List<HackerUser> judges =hackathon.getJudges();
            for(HackerUser judge: judges){
                if(judge.getId() == uid){
                    isJudge = true;
                }

            }
            if(!isJudge){
                System.out.println(" isJudge is false");
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "uid is not the judge of this hid");
            }
        }

        if(methodName.equals("createTeam")){
            Map<String, Object> payload = (Map)joinPoint.getArgs()[0];
            long uid = Long.parseLong(String.valueOf(payload.get("uid")));
            HackerUser hackerUser = hackerUserService.getHackerUser(uid);
            String leadEmail = hackerUser.getEmail();
            long hid= Long.parseLong(String.valueOf(payload.get("hid")));
            Hackathon hackathon = hackathonService.getHackathon(hid);
            List<HackerUser> judges = hackathon.getJudges();
            List<String> judgesEmail = new ArrayList<>();
            for(HackerUser judge: judges){
                String email = judge.getEmail();
                judgesEmail.add(email);
            }
            if(judgesEmail.contains(leadEmail) ){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "the lead: "+ leadEmail + " is already a judge, can not create a team in this hackathon");
            }
            List<Map<String, String>> list = (List<Map<String, String>>) payload.get("members");
            for(Map<String, String> entry: list){
                String email = entry.get("email");
                if(judgesEmail.contains(email)){
                    throw new ResponseStatusException ( HttpStatus.BAD_REQUEST,"the member: "+ email + " is already a judge, please choose again");
                }

            }
        }



    }

}

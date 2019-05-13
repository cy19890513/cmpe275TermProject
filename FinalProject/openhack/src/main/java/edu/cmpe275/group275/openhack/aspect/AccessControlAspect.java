package edu.cmpe275.group275.openhack.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.core.annotation.Order;
import edu.cmpe275.group275.openhack.service.*;
import edu.cmpe275.group275.openhack.model.*;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Aspect
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

    @Around("execution(public * edu.cmpe275.group275.openhack.controller.HackathonController.*(..))")
    public Object access(JoinPoint joinPoint) {
        Object res = null;
        String methodName = joinPoint.getSignature().getName();
        if(methodName.equals("getEvaluation")){
            long uid = (long)joinPoint.getArgs()[0];
            long hid = (long) joinPoint.getArgs()[1];
            boolean isJudge = false;
            Hackathon hackathon = hackathonService.getHackathon(hid);
            List<HackerUser> judges =hackathon.getJudges();
            for(HackerUser judge: judges){
                if(judge.getId() == uid){
                    isJudge = true;
                }

            }
            if(!isJudge){
                res = new ResponseEntity<>(" you are not a judge of this hackathon", HttpStatus.BAD_REQUEST);
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
                res = new ResponseEntity<>("the lead: "+ leadEmail + " is already a judge, can not create a team in this hackathon", HttpStatus.BAD_REQUEST);
            }
            List<Map<String, String>> list = (List<Map<String, String>>) payload.get("members");
            for(Map<String, String> entry: list){
                String email = entry.get("email");
                if(judgesEmail.contains(email)){
                    res = new ResponseEntity<>("the member: "+ email + " is already a judge, please choose again", HttpStatus.BAD_REQUEST);
                }

            }
        }
        return res;


    }

}

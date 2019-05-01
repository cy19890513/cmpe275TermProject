package edu.cmpe275.group275.openhack.controller;

import edu.cmpe275.group275.openhack.model.Hackathon;
import edu.cmpe275.group275.openhack.model.Team;
import edu.cmpe275.group275.openhack.model.Member;

import edu.cmpe275.group275.openhack.service.HackathonService;
import edu.cmpe275.group275.openhack.service.MemberService;
import edu.cmpe275.group275.openhack.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;
import java.util.ArrayList;

@XmlRootElement
@RestController
public class HackathonController {
    private final MemberService memberService;
    private final TeamService teamService;
    private final HackathonService hackathonService;

    //@Autowired
    //MemberService memberService;

    public HackathonController(MemberService memberService, TeamService teamService, HackathonService hackathonService) {
        this.memberService = memberService;
        this.teamService = teamService;
        this.hackathonService = hackathonService;
    }

    /**
     * Sample test
     * POST: hackathon/team?hackathonId=PP&&teamName=XX&teamLeadId=ZZ&
     * Description: create an team
     */
    @RequestMapping(value="/hackathon/team",method = RequestMethod.POST, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<?> createTeam(@RequestParam long hackathonId,
                                        @RequestParam long teamLeadId,
                                        @RequestParam String teamName){

        Hackathon h = hackathonService.getHackathon(hackathonId);
        Member teamLead = memberService.getMember(teamLeadId);
        List<Member> members = new ArrayList<Member>();
        Team t = hackathonService.createTeam(teamLead, "SPARTAN",members);

        return null;
    }
    /**
     * Sample test
     * PUT: hackathon/teamPayment?teamId=XX&teamMemberId=YY&IsPaid=ZZ
     * Description: update payment
     */

    /**
     * Sample test
     * PUT: hackathon/teamInfo?teamId=XX&grade=YY&submitUrl=ZZ
     * Description: update grade
     */


}

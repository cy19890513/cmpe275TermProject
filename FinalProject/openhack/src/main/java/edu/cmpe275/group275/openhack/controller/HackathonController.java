package edu.cmpe275.group275.openhack.controller;

import edu.cmpe275.group275.openhack.model.*;

import edu.cmpe275.group275.openhack.service.HackathonService;
import edu.cmpe275.group275.openhack.service.MemberService;
import edu.cmpe275.group275.openhack.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.xml.bind.annotation.XmlRootElement;
import java.sql.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;

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
    @PutMapping(value="/hackathon/teamInfo", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<?> updateTeamInfo(@RequestParam long teamId,
                                            @RequestParam(required = false) Double grade,
                                            @RequestParam(required = false) String submitUrl){

        Team t = teamService.getTeam(teamId);
        if(grade != null)
            t.setGrade(grade);
        if(submitUrl != null)
            t.setUrl(submitUrl);

        return null;
    }

    @GetMapping(value="/hackathon")
    public ResponseEntity<?> getHackathonList() {
        List<Map<String, Object>> responseList = new ArrayList<>();
        List<Hackathon> hackathons = hackathonService.getHackathonList();
        for (Hackathon h : hackathons) {
            responseList.add(filterHackathon(h));
        }
        return ResponseEntity.status(HttpStatus.OK).body(responseList);
    }

    @PostMapping(value="/hackathon")
    public ResponseEntity<?> createHackathon(@RequestParam String name,
                                             @RequestParam String startDate,
                                             @RequestParam String endDate,
                                             @RequestParam String description,
                                             @RequestParam Double fee,
                                             @RequestParam List<HackerUser> judges,
                                             @RequestParam Integer minSize,
                                             @RequestParam Integer maxSize,
                                             @RequestParam(required = false) List<Organization> sponsors,
                                             @RequestParam(required = false) Double discount) {
        if (name == null || name.isEmpty() || startDate == null || startDate.isEmpty() ||
                endDate == null || endDate.isEmpty() || description == null || description.isEmpty() ||
                fee == null || judges == null || judges.isEmpty() ||
                minSize == null || minSize < 1 || maxSize == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Date start;
        Date end;
        try {
            start = Date.valueOf(startDate);
            end = Date.valueOf(endDate);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Hackathon hackathon = new Hackathon(name, start, end, description, fee, judges, minSize, maxSize);
        if (sponsors != null) {
            hackathon.setSponsors(sponsors);
        }
        if (discount != null) {
            hackathon.setDiscount(discount);
        }
        hackathonService.createHackathon(hackathon);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping(value="/hackathon/search")
    public ResponseEntity<?> getHackathonById(@RequestParam(required = false) Long id,
                                              @RequestParam(required = false) String name) {
        Hackathon hackathon = hackathonService.getHackathon(id);
        if (hackathon != null) {
            return ResponseEntity.status(HttpStatus.OK).body(filterHackathon(hackathon));
        }
        List<Hackathon> hackathons = hackathonService.getHackathonsByName(name);
        List<Map<String, Object>> res = new ArrayList<>();
        for (Hackathon h : hackathons) {
            res.add(filterHackathon(h));
        }
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    private Map<String, Object> filterHackathon(Hackathon h) {
        Map<String, Object> map = new LinkedHashMap<>();
        if (h == null) {
            return map;
        }
        map.put("id", h.getId());
        map.put("name", h.getName());
        map.put("startDate", h.getStartDate());
        map.put("endDate", h.getEndDate());
        map.put("description", h.getDescription());
        map.put("fee", h.getFee());
        map.put("minSize", h.getMinSize());
        map.put("maxSize", h.getMaxSize());
        map.put("sponsors", h.getSponsors());
        map.put("isClosed", h.getClosed());
        map.put("isFinalized", h.getFinalized());
        return map;
    }
}

package edu.cmpe275.group275.openhack.controller;

import edu.cmpe275.group275.openhack.model.*;

import edu.cmpe275.group275.openhack.service.*;
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
    private final UserService userService;

    @Autowired
    private HackerUserService hackerUserService;
    @Autowired
    private OrganizationService organizationService;

    //@Autowired
    //MemberService memberService;

    public HackathonController(MemberService memberService, TeamService teamService,
                               HackathonService hackathonService, UserService userService) {
        this.memberService = memberService;
        this.teamService = teamService;
        this.hackathonService = hackathonService;
        this.userService = userService;
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


    /**
     * Sample test
     * GET: hackathon/teamInfo?uid=9
     * Description: get team info
     */
    @GetMapping(value="/hackathon/teamInfo", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<?> getTeamInfo(@RequestParam long uid){
        Team t = memberService.getTeam(uid);
        if(t == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(t, HttpStatus.OK);
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

    /**
     * Sample test
     * POST: http://localhost:8080/hackathon?uid=8
     * payload: {
     *  "name": "FakeHackathon",
     * 	"startDate": "2019-04-30",
     * 	"endDate": "2019-06-30",
     * 	"description": "hackathon event",
     * 	"fee": 20.0,
     * 	"judges": [
     * 		"jam@gmail.com",
     * 		"wang@test.com"
     * 	],
     * 	"minSize": 3,
     * 	"maxSize": 5
     * }
     * Description: create a hackathon event
     */
    @PostMapping(value="/hackathon")
    public ResponseEntity<?> createHackathon(@RequestParam String uid,
                                             @RequestBody Map<String, Object> payload) {
        // AOP
        if(uid == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (!payload.containsKey("name")  || !payload.containsKey("startDate") || !payload.containsKey("endDate")
                || !payload.containsKey("description") || !payload.containsKey("fee") ||
                !payload.containsKey("judges") || !payload.containsKey("minSize") || !payload.containsKey("maxSize")
        ) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Hackathon h = new Hackathon();
        h.setName(String.valueOf(payload.get("name")));
        h.setStartDate(Date.valueOf((String)payload.get("startDate")));
        h.setEndDate(Date.valueOf((String)payload.get("endDate")));
        h.setDescription(String.valueOf(payload.get("description")));
        List<String> list = (List<String>) payload.get("judges");
        List<HackerUser> judges = new ArrayList<>();
        for(String s: list){
            if(hackerUserService.getHackerByEmail(s) != null)
                judges.add(hackerUserService.getHackerByEmail(s));
        }
        h.setJudges(judges);
        h.setMinSize((int) payload.get("minSize"));
        h.setFee((double) payload.get("fee"));
        h.setMaxSize((int) payload.get("maxSize"));

        if(payload.containsKey("sponsors")){
            List<String> sList = (List<String>) payload.get("sponsors");
            List<Organization> sponsorsList = new ArrayList<>();
            for(String org: sList){
                if(organizationService.getByName(org) != null){
                    sponsorsList.add(organizationService.getByName(org));
                    h.setSponsors(sponsorsList);
                }
            }
        }
        if(payload.containsKey("discount")){
            h.setDiscount((double) payload.get("discount"));
        }
        hackathonService.createHackathon(h);
        return new ResponseEntity<>(filterHackathon(h), HttpStatus.CREATED);
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

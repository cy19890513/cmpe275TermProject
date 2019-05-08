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

//@XmlRootElement
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
     * POST: hackathon/team?hackathonId=1&uid=9
     * payload: {
     *  "teamName": "Super",
     * 	"members": [
     *                {
     * 			"email": "jam@gmail.com",
     * 			"role": "Engineer"
     *        },
     *        {
     * 			"email": "wang@test.com",
     * 			"role": "Data Engineer"
     *        }
     * 	]
     * }
     * Description: create an team
     */
    @RequestMapping(value="/hackathon/team",method = RequestMethod.POST)
    public ResponseEntity<?> createTeam(@RequestParam long hackathonId,
                                        @RequestParam long uid,
                                        @RequestBody Map<String, Object> payload){

        Hackathon h = hackathonService.getHackathon(hackathonId);
        HackerUser hacker = hackerUserService.getHackerUser(uid);
        String teamName = (String) payload.get("teamName");
        Member lead = new Member();
        lead.setHacker(hacker);
        lead.setRole("Team Lead");
        memberService.createMember(lead);
        List<Map<String, String>> list = (List<Map<String, String>>) payload.get("members");
        List<Member> members = new ArrayList<>();
        for(Map<String, String> entry: list){
            String email = entry.get("email");
            String role = entry.get("role");
            HackerUser hackerUser = hackerUserService.getHackerByEmail(email);
            Member member = new Member();
            member.setHacker(hackerUser);
            member.setRole(role);
            memberService.createMember(member);
            members.add(member);
        }
        Team team = new Team();
        team.setTeamName(teamName);
        team.setTeamLead(lead);
        team.setMembers(members);
        team.setHackathon(h);
        teamService.createTeam(team);
        teamService.updateMembers(team);

        return new ResponseEntity<>(memberService.convertToMap(team), HttpStatus.OK);
    }
    /**
     * Sample test
     * GET: hackathon/payment?teamId=1&uid=9
     * Description: update payment
     */
    @GetMapping(value="/hackathon/payment")
    public ResponseEntity<?> processPayment(@RequestParam long teamId,
                                            @RequestParam long uid){
        teamService.processPayment(teamId, uid);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Sample test
     * POST: hackathon/teamInfo/submit?hackathonId=1&teamId=XX&submitUrl=ZZ
     * Description: code submit
     */
    @PostMapping(value="/hackathon/teamInfo/submit")
    public ResponseEntity<?> updateTeamInfo(@RequestParam long teamId,
                                            @RequestParam long hackathonId,
                                            @RequestParam(required = false) Double grade,
                                            @RequestParam(required = false) String submitUrl){

        //TODO
//        Team t = teamService.getTeam(teamId);
//        if(grade != null)
//            t.setGrade(grade);
//        if(submitUrl != null)
//            t.setUrl(submitUrl);

        return null;
    }


    /**
     * Sample test
     * GET: hackathon/teamInfo?uid=9
     * Description: get team info by hacker id
     */
    @GetMapping(value="/hackathon/teamInfo")
    public ResponseEntity<?> getTeamInfo(@RequestParam long uid){
        Team t = teamService.getTeam(uid);
        if(t == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(memberService.convertToMap(t), HttpStatus.OK);
    }

    /**
     * Sample test
     * GET: hackathon/team?teamId=1
     * Description: get team info by team id
     */
    @GetMapping(value="/hackathon/team")
    public ResponseEntity<?> getTeam(@RequestParam long teamId){
        Team t = teamService.getTeam(teamId);
        if(t == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(memberService.convertToMap(t), HttpStatus.OK);
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
        h.setFinalized(false);
        h.setClosed(false);

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

    /**
     * Sample test
     * GET: hackathon/search?id=9
     * Description: get a hackathon info
     */
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

    /**
     * Sample test
     * POST: hackathon/join?id=1&teamId=1
     * Description: join a hackathon
     */
    @PostMapping(value="/hackathon/join")
    public ResponseEntity<?> joinHackathon(@RequestParam Long id,
                                           @RequestParam long teamId) {
        Team team = teamService.getTeam(teamId);
        hackathonService.joinHackathon(id, team);
        return new ResponseEntity(HttpStatus.OK);
    }


    /**
     * Sample test
     * POST: hackathon/close?id=1
     * Description: close a hackathon
     */
    @PostMapping(value="/hackathon/close")
    public ResponseEntity<?> closeHackathon(@RequestParam Long id) {
        Hackathon hackathon = hackathonService.getHackathon(id);
        hackathon.setClosed(true);
        hackathonService.update(hackathon);
        return new ResponseEntity(HttpStatus.OK);
    }

    /**
     * Sample test
     * POST: hackathon/close?id=1
     * Description: finalize a hackathon
     */
    @PostMapping(value="/hackathon/finalize", consumes = "application/json")
    public ResponseEntity<?> finalizeHackathon(@RequestParam Long id) {
        Hackathon hackathon = hackathonService.getHackathon(id);
        hackathon.setFinalized(true);
        hackathonService.update(hackathon);
        return new ResponseEntity(HttpStatus.OK);
    }

<<<<<<< HEAD
=======



>>>>>>> parent of cd305c5... profile axios url error
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
        if(h.getSponsors() != null){
            List<String> sp = new ArrayList<>();
            for(Organization org: h.getSponsors()){
                sp.add(org.getName());
            }
            map.put("sponsors", sp);
        }
        map.put("isClosed", h.getClosed());
        map.put("isFinalized", h.getFinalized());
        if(h.getTeams() != null){
            List<String> res = new ArrayList<>();
            for(Team t: h.getTeams()){
                res.add(t.getTeamName());
            }
            map.put("teams", res);
        }
        return map;
    }
}

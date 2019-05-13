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
     * POST: hackathon/team
     * payload: {
     * "hid": 1,
     * "uid": 9,
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
    public ResponseEntity<?> createTeam(@RequestBody Map<String, Object> payload){

        long hackathonId = Long.valueOf(String.valueOf(payload.get("hid")));
        long uid = Long.valueOf(String.valueOf(payload.get("uid")));
        Hackathon h = hackathonService.getHackathon(hackathonId);
        HackerUser hacker = hackerUserService.getHackerUser(uid);
        //check if member joins the hackathon already
        if(hackerUserService.joinedHackathon(hacker, hackathonId)){
            return new ResponseEntity<>("Member has joined the hackathon", HttpStatus.BAD_REQUEST);
        }
        List<Map<String, String>> list = (List<Map<String, String>>) payload.get("members");
        List<Member> members = new ArrayList<>();
        for(Map<String, String> entry: list){
            String email = entry.get("email");
            String role = entry.get("role");
            HackerUser hackerUser = hackerUserService.getHackerByEmail(email);
            //check hacker exists
            if(hackerUser == null){
                return new ResponseEntity<>("Member not exist", HttpStatus.NOT_FOUND);
            }
            //check member joined hackathon
            if(hackerUserService.joinedHackathon(hackerUser, hackathonId)){
                return new ResponseEntity<>("Member has joined the hackathon", HttpStatus.BAD_REQUEST);
            }
            if(hackerUser.getId() == hacker.getId()){
                return new ResponseEntity<>("Team member is the same as team lead", HttpStatus.BAD_REQUEST);
            }
            Member member = new Member();
            member.setHacker(hackerUser);
            member.setRole(role);
            members.add(member);
        }
        //check teamName unique
        String teamName = String.valueOf(payload.get("teamName"));
        if(hackathonService.existName(h, teamName)){
            return new ResponseEntity<>("Team name not unique", HttpStatus.BAD_REQUEST);
        }
        Member lead = new Member();
        lead.setHacker(hacker);
        lead.setRole("Team Lead");
        memberService.createMember(lead);
        //add members to database
        memberService.addMemberList(members);
        //create team
        Team team = new Team();
        team.setTeamName(teamName);
        team.setTeamLead(lead);
        team.setMembers(members);
        team.setHackathon(h);
        team.setIfAllPaid(false);
        teamService.createTeam(team);
        teamService.updateMembers(team);
        System.out.println(team.toString());
        return new ResponseEntity<>(memberService.convertToMap(team), HttpStatus.OK);
    }
    /**
     * Sample test
     * GET: hackathon/payment?tid=1&uid=9
     * Description: update payment
     */
    @GetMapping(value="/hackathon/payment")
    public ResponseEntity<?> processPayment(@RequestParam long tid,
                                            @RequestParam long uid){
        //aop tid and uid
        teamService.processPayment(tid, uid);
        return new ResponseEntity<>("Paid successfully.", HttpStatus.OK);
    }

    /**
     * Sample test
     * POST: hackathon/submit
     * payload: {
     *     tid: 1,
     *     date: 2019-05-06,
     *     submitUrl: XX
     * }
     * Description: code submit
     */
    @PostMapping(value="/hackathon/submit")
    public ResponseEntity<?> submitCode(@RequestBody Map<String, Object> payload){

        long tid = Long.valueOf(String.valueOf(payload.get("tid")));
        String date = String.valueOf(payload.get("date"));
        String submitUrl = String.valueOf(payload.get("submitUrl"));
        Team team = teamService.getTeam(tid);
        if(team == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if(team.getIfAllPaid() != null && !team.getIfAllPaid()){
            return new ResponseEntity<>("Please pay the registration fee first!", HttpStatus.BAD_REQUEST);
        }
        Hackathon h = team.getHackathon();
        Date d = Date.valueOf(date);
        if(d.before(h.getStartDate())){
            return new ResponseEntity<>("The hackathon is not opened for submission", HttpStatus.BAD_REQUEST);
        }
        if(h.getClosed()){
            return new ResponseEntity<>("The hackathon is closed for submission", HttpStatus.BAD_REQUEST);
        }
        team.setUrl(submitUrl);
        teamService.update(team);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    /**
     * Sample test
     * GET: hackathon/teamInfo?uid=9
     * Description: get team info by hacker id
     */
    @GetMapping(value="/hackathon/teamInfo")
    public ResponseEntity<?> getTeamInfo(@RequestParam long uid){
        HackerUser hacker = hackerUserService.getHackerUser(uid);
        System.out.println(hacker.toString());
        List<Team> t = memberService.getTeam(hacker);
        if(t == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Map<String, Object>> res = new ArrayList<>();
        for(Team team: t){
            Map<String, Object> temp = memberService.convertToMap(team);
            if(!temp.isEmpty()){
                res.add(temp);
            }
        }

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    /**
     * Sample test
     * GET: hackathon/team?tid=1
     * Description: get team info by team id
     */
    @GetMapping(value="/hackathon/team")
    public ResponseEntity<?> getTeam(@RequestParam long tid){
        Team t = teamService.getTeam(tid);
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
     * GET: http://localhost:8080/hackathons?uid=1
     * Description: get list of hackathons by uid
     */
    @GetMapping(value="/hackathons")
    public ResponseEntity<?> getHackathonListById(@RequestParam long uid){
        //aop check uid
        HackerUser hackerUser = hackerUserService.getHackerUser(uid);
        List<Hackathon> hList = hackerUser.getJoinedHacks();
        List<Map<String, Object>> res = new ArrayList<>();
        for(Hackathon h: hList){
            res.add(hackathonService.convert(h, hackerUser));
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
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
    public ResponseEntity<?> createHackathon(@RequestBody Map<String, Object> payload) {
        // AOP

        if (!payload.containsKey("name")  || !payload.containsKey("startDate") || !payload.containsKey("endDate")
                || !payload.containsKey("description") || !payload.containsKey("fee") ||
                !payload.containsKey("judges") || !payload.containsKey("minSize") || !payload.containsKey("maxSize")
        ) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Hackathon h = new Hackathon();
        h.setName(String.valueOf(payload.get("name")));
        h.setStartDate(Date.valueOf(String.valueOf(payload.get("startDate"))));
        h.setEndDate(Date.valueOf(String.valueOf(payload.get("endDate"))));
        h.setDescription(String.valueOf(payload.get("description")));
        List<String> list = (List<String>) payload.get("judges");
        List<HackerUser> judges = new ArrayList<>();
        if(list != null && !list.isEmpty()) {
            for (String s : list) {
                if (hackerUserService.getHackerByEmail(s) != null)
                    judges.add(hackerUserService.getHackerByEmail(s));
            }
        }
        h.setJudges(judges);
        h.setMinSize((Integer.valueOf(String.valueOf(payload.get("minSize")))));
        h.setFee((Double.valueOf(String.valueOf(payload.get("fee")))));
        h.setMaxSize((Integer.valueOf(String.valueOf(payload.get("maxSize")))));
        h.setFinalized(false);
        h.setClosed(true);

        if(payload.containsKey("sponsors")){
            List<String> sList = (List<String>) payload.get("sponsors");
            List<Organization> sponsorsList = new ArrayList<>();
            if(sList != null && !sList.isEmpty()) {
                for (String org : sList) {
                    if (organizationService.getByName(org) != null) {
                        sponsorsList.add(organizationService.getByName(org));
                    }
                }
                h.setSponsors(sponsorsList);
            }
        }
        if(payload.containsKey("discount")){
            h.setDiscount(Double.valueOf(String.valueOf(payload.get("discount"))));
        }
        System.out.println(h.toString());
        hackathonService.createHackathon(h);
        return new ResponseEntity<>(filterHackathon(h), HttpStatus.CREATED);
    }

    /**
     * Sample test
     * GET: hackathon/search?hid=13
     * Description: get a hackathon info
     */
    @GetMapping(value="/hackathon/search")
    public ResponseEntity<?> getHackathonById(@RequestParam(required = false) Long hid,
                                              @RequestParam(required = false) String name) {
        Hackathon hackathon = hackathonService.getHackathon(hid);
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
     * POST: hackathon/join
     * payload: {
     *     hid: 1,
     *     tid: 1
     * }
     * Description: join a hackathon
     */
    @PostMapping(value="/hackathon/join")
    public ResponseEntity<?> joinHackathon(@RequestBody Map<String, Object> payload) {

        long hid = Long.valueOf(String.valueOf(payload.get("hid")));
        long teamId = Long.valueOf(String.valueOf(payload.get("tid")));
        System.out.println("tid: "+teamId);
        Team team = teamService.getTeam(teamId);
        if(team.getHackathon() != null && team.getHackathon().getId() != hid){
            return new ResponseEntity<>("Team has joined other hackathon event.", HttpStatus.BAD_REQUEST);
        }
        hackathonService.joinHackathon(hid, team);
        return new ResponseEntity(HttpStatus.OK);
    }


    /**
     * Sample test
     * POST: hackathon/close
     * payload: {
     *     hid: 1
     * }
     * Description: close a hackathon
     */
    @PostMapping(value="/hackathon/close")
    public ResponseEntity<?> closeHackathon(@RequestBody Map<String, Object> payload) {
        long hid = Long.valueOf(String.valueOf(payload.get("hid")));
        Hackathon hackathon = hackathonService.getHackathon(hid);
        List<HackerUser> judges= hackathon.getJudges();
        for(HackerUser judge: judges){
            hackathonService.informClose(hackathon, judge);
        }
        hackathon.setClosed(true);
        hackathonService.update(hackathon);
        return new ResponseEntity(HttpStatus.OK);
    }


    /**
     * Sample test
     * POST: hackathon/open
     *  payload: {
     *          hid: 1,
     *          date: 2019-05-06
     *       }
     * Description: open a hackathon
     */
    @PostMapping(value="/hackathon/open")
    public ResponseEntity<?> openHackathon(@RequestBody Map<String, Object> payload) {
        long hid = Long.valueOf(String.valueOf(payload.get("hid")));
        String date = String.valueOf(payload.get("date"));
        Hackathon hackathon = hackathonService.getHackathon(hid);
        Date d = Date.valueOf(date);
        if(d.before(hackathon.getStartDate())){
            hackathon.setStartDate(d);
        }
        hackathonService.update(hackathon);
        return new ResponseEntity(HttpStatus.OK);
    }


    /**
     * Sample test
     * POST: hackathon/finalize
     * payload: {
     *                hid: 1,
     *            }
     * Description: finalize a hackathon
     */

    @PostMapping(value="/hackathon/finalize")
    public ResponseEntity<?> finalizeHackathon(@RequestBody Map<String, Object> payload) {
        boolean isAllGradeDone = true;
        long hid = Long.valueOf(String.valueOf(payload.get("hid")));
        Hackathon hackathon = hackathonService.getHackathon(hid);
        List<Team> teams = hackathon.getTeams();
        for(Team team: teams){
            if(team.getGrade() == null) {
                isAllGradeDone = false;
            }
        }
        if(!isAllGradeDone){
            return new ResponseEntity("Some grades is null ", HttpStatus.NOT_ACCEPTABLE);
        }
        hackathon.setFinalized(true);
        hackathonService.update(hackathon);
        return new ResponseEntity(HttpStatus.OK);
    }


    /**
     * Sample test
     * POST: hackathon/grade
     * payload: {
     *     tid: 1,
     *     grade: 80
     * }
     * Description: grade a team submission
     */
    @PostMapping(value="/hackathon/grade")
    public ResponseEntity<?> gradeHackathon(@RequestBody Map<String, Object> payload) {

        long tid = Long.valueOf(String.valueOf(payload.get("tid")));
        double grade = Double.valueOf(String.valueOf(payload.get("grade")));
        Team team = teamService.getTeam(tid);
        team.setGrade(grade);
        teamService.update(team);
        return new ResponseEntity(HttpStatus.OK);
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
        if(h.getSponsors() != null){
            List<String> sp = new ArrayList<>();
            for(Organization org: h.getSponsors()){
                sp.add(org.getName());
            }
            map.put("sponsors", sp);
        }
        if(h.getJudges() != null){
            List<String> judge = new ArrayList<>();
            for(HackerUser j: h.getJudges()){
                judge.add(j.getEmail());
            }
            map.put("judges", judge);
        }
        map.put("isClosed", h.getClosed());
        map.put("isFinalized", h.getFinalized());
        if(h.getTeams() != null){
            List<Map<String, Object>> res = new ArrayList<>();
            for(Team t: h.getTeams()){
                Map<String, Object> pair = new LinkedHashMap<>();
                pair.put("id", t.getId());
                pair.put("teamName", t.getTeamName());
                res.add(pair);
            }
            map.put("teams", res);
        }
        return map;
    }
}

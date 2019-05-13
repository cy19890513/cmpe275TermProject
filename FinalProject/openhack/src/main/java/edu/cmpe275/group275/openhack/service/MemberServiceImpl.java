package edu.cmpe275.group275.openhack.service;


import edu.cmpe275.group275.openhack.model.HackerUser;
import edu.cmpe275.group275.openhack.model.Member;
import edu.cmpe275.group275.openhack.model.Team;
import edu.cmpe275.group275.openhack.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class MemberServiceImpl implements MemberService{
    private final MemberRepository memberRepository;

    public MemberServiceImpl(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Transactional
    public Member createMember(Member member) {
        return memberRepository.save(member);
    }

    @Transactional
    public Member getMember(long id) {
        return memberRepository.getOne(id);
    }

    @Transactional
    public List<Team> getTeam(HackerUser hacker){

        List<Member> list = memberRepository.findByHacker(hacker);
        HashSet<Team> res = new HashSet<>();
        if(list != null) {
            for (Member m : list) {
                res.add(m.getTeam());
            }
        }
        List<Team> teamList = new ArrayList<>(res);
        return teamList;
    }

    @Transactional
    public void update(Member m){
        memberRepository.save(m);
    }

    @Transactional
    public void addMemberList(List<Member> list){
        for(Member m: list){
            createMember(m);
        }
    }

    public Map<String, Object> convertToMap(Team t){
        Map<String, Object> res = new LinkedHashMap<>();
        if(t != null) {
            res.put("id", t.getId());
            res.put("teamName", t.getTeamName());
            res.put("teamLead", t.getTeamLead().getHacker().getUsername());
            List<String> members = new ArrayList<>();
            if(t.getMembers() != null && !t.getMembers().isEmpty()) {
                for (Member m : t.getMembers()) {
                    if(m.getHacker() != null) {
                        members.add(m.getHacker().getUsername());
                    }
                }
            }
            res.put("members", members);
            if (t.getHackathon() != null && t.getHackathon().getFinalized()) {
                res.put("grade", t.getGrade());
            }
            res.put("url", t.getUrl());
            if (t.getHackathon() != null) {
                res.put("hid", t.getHackathon().getId());
                res.put("hackathon", t.getHackathon().getName());
            }
        }
        return res;
    }
}

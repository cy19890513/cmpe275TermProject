package edu.cmpe275.group275.openhack.service;


import edu.cmpe275.group275.openhack.model.Member;
import edu.cmpe275.group275.openhack.model.Team;
import edu.cmpe275.group275.openhack.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

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
    public Team getTeam(long uid){
        Member m = memberRepository.findByHacker(uid);
        return m.getTeam();
    }

    public Map<String, Object> convertToMap(Team t){
        Map<String, Object> res = new LinkedHashMap<>();
        res.put("id", t.getId());
        res.put("teamName", t.getTeamName());
        res.put("teamLead", t.getTeamLead().getHacker().getUsername());
        System.out.println("");
        List<String> members = new ArrayList<>();
        for(Member m: t.getMembers()){
            members.add(m.getHacker().getUsername());
        }
        res.put("members", members);
        res.put("grade", t.getGrade());
        res.put("url", t.getUrl());
        return res;
    }
}

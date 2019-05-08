package edu.cmpe275.group275.openhack.service;

import edu.cmpe275.group275.openhack.model.HackerUser;
import edu.cmpe275.group275.openhack.model.Member;
import edu.cmpe275.group275.openhack.model.Team;

import java.util.Map;

public interface MemberService {
    Member createMember(Member member);

    Member getMember(long id);

    Team getTeam(HackerUser hacker);

    Map<String, Object> convertToMap(Team t);

    void update(Member m);
}

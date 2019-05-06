package edu.cmpe275.group275.openhack.service;

import edu.cmpe275.group275.openhack.model.HackerUser;
import edu.cmpe275.group275.openhack.model.Member;
import edu.cmpe275.group275.openhack.model.Team;

public interface MemberService {
    Member createMember(Member member);

    Member getMember(long id);

    Team getTeam(long uid);
}

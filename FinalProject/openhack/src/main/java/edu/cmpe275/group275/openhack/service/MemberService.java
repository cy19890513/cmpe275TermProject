package edu.cmpe275.group275.openhack.service;

import edu.cmpe275.group275.openhack.model.Member;

public interface MemberService {
    Member createMember(Member member);

    Member getMember(long id);
}

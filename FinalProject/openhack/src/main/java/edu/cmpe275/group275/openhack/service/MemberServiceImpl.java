package edu.cmpe275.group275.openhack.service;


import edu.cmpe275.group275.openhack.model.Member;
import edu.cmpe275.group275.openhack.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}

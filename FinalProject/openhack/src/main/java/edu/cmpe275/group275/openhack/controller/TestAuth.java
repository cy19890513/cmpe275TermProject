package edu.cmpe275.group275.openhack.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class TestAuth {

    @PostMapping("/test")
    public ResponseEntity<?> testSessionStore(@RequestBody Map<String, Object> payload, HttpSession session) {
        List<String> msg = (List<String>) session.getAttribute("message");
        if (msg == null) {
            msg = new ArrayList<>();
        }
        String mm = (String) payload.get("msg");
        msg.add(mm);
        session.setAttribute("message", msg);
        return ResponseEntity.status(201).body("good");
    }

    @GetMapping("/test")
    public ResponseEntity<?> testGetSession(HttpSession session) {
        List<String> msg = (List<String>) session.getAttribute("message");
        if (msg == null) {
            return ResponseEntity.status(200).body("empty");
        }
        return ResponseEntity.status(200).body(msg);
    }
}

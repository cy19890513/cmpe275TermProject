package edu.cmpe275.group275.openhack.model;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Date;
import java.sql.Timestamp;


@Entity
    public class VerificationToken {
        private static final int EXPIRATION = 60 * 24;

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private Long id;

        private String token;

        @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
        @JoinColumn(nullable = false, name = "user_id")
        private User user;

        private Date expiryDate;

    public VerificationToken() {
    }

    private Date calculateExpiryDate(int expiryTimeInMinutes) {
            Calendar cal = Calendar.getInstance();
            cal.setTime(new Timestamp(cal.getTime().getTime()));
            cal.add(Calendar.MINUTE, expiryTimeInMinutes);
            return new Date(cal.getTime().getTime());
        }

        // standard constructors, getters and setters
    }


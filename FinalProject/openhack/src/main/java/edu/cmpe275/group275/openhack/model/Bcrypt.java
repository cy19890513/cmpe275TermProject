package edu.cmpe275.group275.openhack.model;

import org.mindrot.jbcrypt.BCrypt;

public class Bcrypt {

    public static String hashPassword(char[] password) {
        return BCrypt.hashpw(String.valueOf(password), BCrypt.gensalt());
    }

    public static String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    public static boolean checkPassword(char[] plainPassword, String hashedPassword) {
        return BCrypt.checkpw(String.valueOf(plainPassword), hashedPassword);
    }

    public static boolean checkPassword(String plainPassword, String hashedPassword) {
        return BCrypt.checkpw(plainPassword, hashedPassword);
    }

}

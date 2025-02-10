package com.account.config;

import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import com.account.domain.Users;

public class SecurityUser extends User {
    private static final long serialVersionUID = 1L;
    private Users users;

    public SecurityUser(Users users) {
        super(users.getUsername(), users.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(users.getRole().toString())));
        this.users = users;
    }

    public Users getUsers() {
        return users;
    }

    // ✅ 비밀번호가 반드시 암호화된 상태로 반환되도록 유지
    @Override
    public String getPassword() {
        return users.getPassword();
    }
}

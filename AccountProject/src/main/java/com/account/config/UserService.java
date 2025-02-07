package com.account.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.account.dao.UserDao;
import com.account.domain.Role;
import com.account.domain.Users;

@Service
public class UserService {
    @Autowired
    UserDao dao;

    @Autowired
    private PasswordEncoder encoder;

    // ✅ 회원가입 시 비밀번호 암호화 적용
    public int insertUser(Users users) {
        users.setPassword(encoder.encode(users.getPassword())); // ✅ 비밀번호 암호화
        users.setRole(Role.ROLE_MEMBER); // ✅ 기본 역할 설정

        return dao.insertUser(users);
    }

    // ✅ 사용자 정보 조회 (로그인 시 사용)
    public Users getUserById(String userid) {
        return dao.findById(userid);
    }
}

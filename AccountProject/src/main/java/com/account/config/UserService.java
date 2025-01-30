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

	public int insertUser(Users users) {
		users.setPassword(encoder.encode(users.getPassword()));
		users.setRole(Role.ROLE_MEMBER);

		int i = dao.insertUser(users);

		return i;
	}
}

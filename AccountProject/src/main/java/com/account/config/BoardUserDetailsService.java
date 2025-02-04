package com.account.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.account.dao.UserDao;
import com.account.domain.Users;

@Service
public class BoardUserDetailsService implements UserDetailsService {
	@Autowired
	private UserDao userDao;

	@Override
	public UserDetails loadUserByUsername(String userid) throws UsernameNotFoundException {
		Users users = userDao.findById(userid);
		if (users == null) {
			throw new UsernameNotFoundException(userid + " 사용자 없음");
		} else {
			return new SecurityUser(users);
		}
	}
}

package com.account.config;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.account.dao.UserDao;
import com.account.domain.Role;
import com.account.domain.Users;

@Service
public class UserService implements UserDetailsService { // ✅ UserDetailsService 추가
	private final UserDao dao;
	private final PasswordEncoder encoder;

	public UserService(UserDao dao, PasswordEncoder encoder) {
		this.dao = dao;
		this.encoder = encoder;
	}

	// ✅ 로그인 시 사용되는 메서드 (Spring Security)
	@Override
	public UserDetails loadUserByUsername(String userid) throws UsernameNotFoundException {
		Users user = dao.findById(userid);
		if (user == null) {
			throw new UsernameNotFoundException(userid + " 사용자 없음");
		}
		return new SecurityUser(user);
	}

	// ✅ 회원가입 (비밀번호 암호화 + 기본 권한 설정)
	public int insertUser(Users user) {
		user.setPassword(encoder.encode(user.getPassword())); // 비밀번호 암호화
		user.setRole(Role.ROLE_MEMBER); // 기본 권한 설정
		return dao.insertUser(user);
	}

	// ✅ 사용자 정보 조회
	public Users getUserById(String userid) {
		return dao.findById(userid);
	}

	// ✅ 회원정보 수정
	public int updateUser(Users updatedUser) {
		Users existingUser = dao.findById(updatedUser.getUserid());
		if (existingUser == null) {
			throw new RuntimeException("사용자를 찾을 수 없습니다.");
		}

		if (updatedUser.getPassword() == null || updatedUser.getPassword().isEmpty()) {
			updatedUser.setPassword(existingUser.getPassword()); // 기존 비밀번호 유지
		} else {
			updatedUser.setPassword(encoder.encode(updatedUser.getPassword())); // 새 비밀번호 암호화
		}

		return dao.updateUser(updatedUser);
	}
}

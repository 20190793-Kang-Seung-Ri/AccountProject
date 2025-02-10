package com.account.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.account.config.SecurityUser;
import com.account.config.UserService;
import com.account.domain.Users;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
public class UserController {
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService userService; // ✅ UserService 사용

	// ✅ 회원가입 API
	@PostMapping("/users/register")
	public Map<String, String> registerUser(@RequestBody Users user) {
		user.setHiredate(new Date());
		int result = userService.insertUser(user);

		Map<String, String> response = new HashMap<>();
		if (result > 0) {
			response.put("message", "회원가입이 완료되었습니다.");
		} else {
			response.put("message", "회원가입에 실패했습니다.");
		}
		return response;
	}

	// ✅ 로그인된 사용자 정보 조회 (전체 정보 반환)
	@GetMapping("/userinfo")
	public Map<String, Object> getUserInfo(HttpSession session) { // ✅ 세션 객체 추가
		Map<String, Object> response = new HashMap<>();

		// ✅ 현재 로그인된 사용자 정보 가져오기
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Object principal = authentication.getPrincipal();

		logger.info("🔍 현재 Principal 객체: {}", principal);
		logger.info("🔍 현재 인증 상태: {}", authentication.isAuthenticated());

		if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(principal)) {
			logger.info("❌ 로그인되지 않은 사용자 요청");
			response.put("authenticated", false);
			return response;
		}

		if (!(principal instanceof SecurityUser)) {
			logger.warn("⚠ 예상치 못한 principal 객체: {}", principal);
			response.put("authenticated", false);
			return response;
		}

		SecurityUser securityUser = (SecurityUser) principal;
		String userid = securityUser.getUsers().getUserid();

		// ✅ 전체 사용자 정보 불러오기
		Users user = userService.getUserById(userid);
		
		if (user == null) {
			response.put("authenticated", false);
			response.put("message", "사용자를 찾을 수 없습니다.");
			return response;
		}

		logger.info("✅ API 응답 데이터 - 사용자 정보: {}", user);

		// ✅ 사용자 정보를 Map에 저장하여 반환
		response.put("userid", user.getUserid());
		response.put("username", user.getUsername());
		response.put("email", user.getEmail());
		response.put("hiredate", user.getHiredate());
		response.put("role", user.getRole().toString());
		response.put("authorities", securityUser.getAuthorities().stream().map(GrantedAuthority::getAuthority)
				.collect(Collectors.toList()));
		response.put("authenticated", true);

		return response;
	}

	// ✅ 회원정보 수정 API (PUT /api/users/{id})
	@PutMapping("/users/{id}")
	public Map<String, String> updateUser(@PathVariable("id") String userid, @RequestBody Users updatedUser) {
		Map<String, String> response = new HashMap<>();

		// ✅ 현재 로그인된 사용자 확인
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication == null || !authentication.isAuthenticated()) {
			logger.info("❌ 로그인되지 않은 사용자 요청");
			response.put("message", "로그인이 필요합니다.");
			return response;
		}

		Object principal = authentication.getPrincipal();
		if (!(principal instanceof SecurityUser)) {
			logger.warn("⚠ 예상치 못한 principal 객체: {}", principal);
			response.put("message", "권한이 없습니다.");
			return response;
		}

		SecurityUser currentUser = (SecurityUser) principal;

		// ✅ 본인 정보만 수정 가능하도록 제한
		if (!currentUser.getUsers().getUserid().equals(userid)) {
			logger.warn("⚠ 본인이 아닌 사용자가 정보를 수정하려고 시도함: {}", currentUser.getUsername());
			response.put("message", "다른 사용자의 정보를 수정할 수 없습니다.");
			return response;
		}

		// ✅ 기존 사용자 정보 가져오기
		Users existingUser = userService.getUserById(userid);
		if (existingUser == null) {
			response.put("message", "사용자를 찾을 수 없습니다.");
			return response;
		}

		// ✅ 비밀번호가 입력되지 않은 경우 기존 비밀번호 유지
		if (updatedUser.getPassword() == null || updatedUser.getPassword().isEmpty()) {
			updatedUser.setPassword(existingUser.getPassword());
		}

		// ✅ 사용자 정보 업데이트
		updatedUser.setUserid(userid); // 사용자 ID 유지
		int result = userService.updateUser(updatedUser);

		if (result > 0) {
			response.put("message", "회원정보가 수정되었습니다.");
		} else {
			response.put("message", "회원정보 수정에 실패했습니다.");
		}

		return response;
	}
}

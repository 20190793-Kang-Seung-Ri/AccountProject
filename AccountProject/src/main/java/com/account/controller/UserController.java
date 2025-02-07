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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.account.config.SecurityUser;
import com.account.config.UserService;
import com.account.domain.Users;

@RestController
@RequestMapping("/api")
public class UserController {
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService userService; // ✅ UserService 사용

	// ✅ 회원가입 API (UserService를 사용하도록 수정)
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

	// ✅ 사용자 정보 조회 API (로그인된 사용자 정보 반환)
	@GetMapping("/userinfo")
	public Map<String, Object> getUserInfo() {
		Map<String, Object> response = new HashMap<>();

		// ✅ 현재 로그인된 사용자 정보 가져오기
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Object principal = authentication.getPrincipal();
		SecurityUser user = (SecurityUser) principal;

		logger.info("✅ 현재 로그인된 사용자: {}", user.getUsername());
		logger.info("✅ 사용자 권한: {}", user.getAuthorities());

		logger.info("🔍 principal 객체 유형: {}", principal.getClass().getName());

		// ✅ 인증되지 않은 경우 처리
		if (authentication == null || !authentication.isAuthenticated()) {
			logger.info("❌ 로그인되지 않은 사용자 요청");
			response.put("authenticated", false);
			return response;
		}

		// ✅ SecurityUser인지 확인 후 변환
		if (principal instanceof SecurityUser) {
			logger.info("✅ 현재 로그인된 사용자: {}", user.getUsername());
			logger.info("✅ 사용자 권한: {}", user.getAuthorities());

			response.put("username", user.getUsername());
			response.put("authorities",
					user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList())); // ✅
																														// 문자열
																														// 리스트로
																														// 변환
			response.put("authenticated", true);

			return response;
		}

		// ✅ 예상치 못한 principal 객체일 경우
		logger.warn("⚠ 예상치 못한 principal 객체: {}", principal);
		response.put("authenticated", false);
		return response;
	}
}

package com.account.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private final AuthenticationManager authenticationManager;
	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

	public AuthController(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}

	@PostMapping("/login")
	public Map<String, Object> login(@RequestBody Map<String, String> loginRequest, HttpSession session) {
		Map<String, Object> response = new HashMap<>();
		String userid = loginRequest.get("userid");
		String password = loginRequest.get("password");

		try {
			logger.info("🔍 로그인 시도: {}", userid);

			// ✅ 인증 처리 (Spring Security가 내부적으로 비밀번호 검증)
			Authentication authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(userid, password));

			// ✅ 인증 정보 저장
			SecurityContextHolder.getContext().setAuthentication(authentication);
			
			// ✅ 현재 로그인된 사용자 정보 가져오기
	        Object principal = authentication.getPrincipal();
	        
			logger.info("✅ 로그인 성공: {}", userid);
			logger.info("🔍 principal 객체: {}", principal);
			
			// ✅ 인증 정보를 세션에도 저장
			session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());
			session.setAttribute("PRINCIPAL", principal); // ✅ principal 객체 저장

			// ✅ 응답 생성
			response.put("message", "Login successful");
			response.put("username", authentication.getName());
			response.put("authenticated", true);
			
			logger.info("✅ 생성된 세션 ID: {}", session.getId());

		} catch (BadCredentialsException e) {
			logger.warn("❌ 로그인 실패 - 아이디 또는 비밀번호 불일치: {}", userid);
			response.put("message", "아이디 또는 비밀번호가 일치하지 않습니다.");
			response.put("authenticated", false);
		} catch (Exception e) {
			logger.error("🚨 로그인 중 오류 발생: {}", e.getMessage());
			response.put("message", "로그인 처리 중 오류가 발생했습니다.");
			response.put("authenticated", false);
		}

		return response;
	}
}

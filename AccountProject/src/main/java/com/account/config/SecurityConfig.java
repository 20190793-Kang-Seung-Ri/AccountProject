package com.account.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	@Autowired
	private BoardUserDetailsService boardUserDetailsService;

	@Bean
	SecurityFilterChain filterChain(HttpSecurity security) throws Exception {
		security.cors(cors -> cors.configurationSource(corsConfigurationSource())) // ✅ CORS 설정
				.csrf(csrf -> csrf.disable()) // ✅ CSRF 비활성화 (REST API 환경에서는 필요 없음)
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)) // ✅ 세션
																												// 유지
				.authorizeHttpRequests(
						auth -> auth.requestMatchers("/api/auth/login", "/api/users/register").permitAll() // ✅ 로그인 &
																											// 회원가입은 누구나
																											// 접근 가능
								.requestMatchers("/api/userinfo").permitAll() // ✅ 로그인한 사용자만 접근 가능
								.anyRequest().permitAll() // ✅ 그 외 모든 요청 허용 (필요에 따라 수정 가능)
				).logout(logout -> logout.logoutUrl("/logout") // ✅ 로그아웃 엔드포인트 설정
						.invalidateHttpSession(true) // ✅ 세션 무효화
						.clearAuthentication(true) // ✅ 인증 정보 삭제
						.deleteCookies("JSESSIONID") // ✅ 세션 쿠키 삭제
						.logoutSuccessHandler((request, response, authentication) -> {
							response.setStatus(HttpServletResponse.SC_OK);
							response.getWriter().flush();
						}))
				.exceptionHandling(exception -> exception.accessDeniedPage("/accessDenied") // ✅ 권한 없는 사용자의 접근 거부 페이지
				).userDetailsService(boardUserDetailsService) // ✅ 인증된 사용자 정보 유지
				.authenticationProvider(authenticationProvider()); // ✅ 인증 프로바이더 추가

		return security.build();
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(List.of("http://localhost:3000", "http://127.0.0.1:3000"));
		configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
		configuration.setAllowedHeaders(List.of("*"));
		configuration.setExposedHeaders(List.of("Authorization", "Content-Type"));
		configuration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(boardUserDetailsService);
		authProvider.setPasswordEncoder(passwordEncoder()); // ✅ 비밀번호 암호화 설정
		return authProvider;
	}

	// ✅ AuthenticationManager 빈 등록
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
			throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}

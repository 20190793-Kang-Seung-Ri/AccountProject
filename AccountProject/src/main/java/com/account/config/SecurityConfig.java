package com.account.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
public class SecurityConfig {
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity security) throws Exception {
		security.csrf(AbstractHttpConfigurer::disable).authorizeHttpRequests(auth -> {
			auth.requestMatchers(new AntPathRequestMatcher("/member/**"), new AntPathRequestMatcher("/js/**"))
					.authenticated().requestMatchers(new AntPathRequestMatcher("/admin/**")).hasRole("ADMIN")
					.requestMatchers(new AntPathRequestMatcher("/manager/**")).hasAnyRole("MANAGER", "ADMIN")
					.anyRequest().permitAll();
		});

		security.formLogin((formLogin) -> formLogin.loginPage("/login").defaultSuccessUrl("/loginSuccess", true))
				.logout((logout) -> {
					logout.logoutRequestMatcher(new AntPathRequestMatcher("/logout")).invalidateHttpSession(true)
							.logoutSuccessUrl("/");
				}).exceptionHandling((exception) -> exception.accessDeniedPage("/accessDenied"));

		return security.build();
	}
}

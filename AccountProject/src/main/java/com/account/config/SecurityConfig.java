package com.account.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	@Autowired
	private BoardUserDetailsService boardUserDetailsService;
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity security) throws Exception {
	    security.csrf(AbstractHttpConfigurer::disable)
	            .authorizeHttpRequests(auth -> {
	                auth.requestMatchers(new AntPathRequestMatcher("/member/**"), new AntPathRequestMatcher("/js/**"))
	                    .authenticated()
	                    .requestMatchers(new AntPathRequestMatcher("/admin/**"))
	                    .hasRole("ADMIN")
	                    .requestMatchers(new AntPathRequestMatcher("/manager/**"))
	                    .hasAnyRole("MANAGER", "ADMIN")
	                    .anyRequest()
	                    .permitAll();
	            })
	            .formLogin(formLogin -> 
	                formLogin.loginPage("/login")
	                         .defaultSuccessUrl("/dashBoard", true))
	            .logout(logout -> 
	                logout.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
	                      .invalidateHttpSession(true)
	                      .logoutSuccessUrl("/"))
	            .exceptionHandling(exception -> 
	                exception.accessDeniedPage("/accessDenied"))
	            .userDetailsService(boardUserDetailsService);

	    return security.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}
}
	
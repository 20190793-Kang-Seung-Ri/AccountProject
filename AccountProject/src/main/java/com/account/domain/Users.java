package com.account.domain;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
public class Users {
	private String userid;
	private String password;
	private String username;
	private String email;
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")  // 날짜 형식 지정
	private Date hiredate;
	private Role role;
	private char enabled;
}

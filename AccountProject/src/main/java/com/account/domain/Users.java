package com.account.domain;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Users {
	private String userid;
	private String password;
	private String username;
	private String email;
	@DateTimeFormat(pattern = "yyyy-MM-dd")  // 날짜 형식 지정
	private Date hiredate;
	private Role role;
	private char enabled;
}

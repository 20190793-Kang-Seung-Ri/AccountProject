package com.account.domain;

import java.util.Date;

import lombok.Data;

@Data
public class User {
	private String userid;
	private String username;
	private String password;
	private String email;
	private Date hiredate;
	private Role role;
	private char enabled;
}

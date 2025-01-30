package com.account.domain;

import lombok.Data;

@Data
public class Users {
	private String id; 
	private String password;
	private String name;
	private Role role;
	private char enabled;
}

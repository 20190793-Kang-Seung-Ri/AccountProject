package com.account.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.account.config.UserService;
import com.account.domain.Users;

@Controller
public class SecurityController {
	@Autowired
	UserService service;
	
	@GetMapping("/")
	public String index() {
		System.out.println("index 요청입니다.");
		return "index";
	}

	@GetMapping("/member")
	public void forMember() {
		System.out.println("Member 요청입니다.");
	}

	@GetMapping("/manager")
	public void forManager() {
		System.out.println("Manager 요청입니다.");
	}

	@GetMapping("/admin")
	public void forAdmin() {
		System.out.println("Admin 요청입니다.");
	}

	@GetMapping("/login")
	public void login() {
		System.out.println("로그인");
	}

	@GetMapping("/dashBoard")
	public void dashBoard() {
		System.out.println("로그인석세스");
	}

	@GetMapping("/accessDenied")
	public void accessDenied() {
	}

	@GetMapping("/insert")
	public void insert() {
	}

	@PostMapping("/insert")
	public String insert(Users users) {
		service.insertUser(users);

		return "redirect:/";
	}
}

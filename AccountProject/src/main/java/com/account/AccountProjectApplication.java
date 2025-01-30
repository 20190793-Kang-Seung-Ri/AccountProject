package com.account;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.spring", "com.account"})
public class AccountProjectApplication {
	public static void main(String[] args) {
		SpringApplication.run(AccountProjectApplication.class, args);
	}
}

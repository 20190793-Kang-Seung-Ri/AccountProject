package com.example.springbootbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.example")  // 🔥 하위 패키지 모두 스캔
public class SpringbootBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringbootBackendApplication.class, args);
    }
}

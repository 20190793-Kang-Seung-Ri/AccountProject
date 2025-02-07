package com.account.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class SecurityController {
    @GetMapping
    public String index() {
        return "forward:/index.html";  // ✅ React로 포워딩
    }

    @GetMapping("/accessDenied")
    public String accessDenied() {
        return "forward:/index.html";  // ✅ React에서 처리
    }
}

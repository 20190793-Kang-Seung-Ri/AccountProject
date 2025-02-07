package com.example.springbootbackend.controller;

import com.example.springbootbackend.dto.UserDto;
import com.example.springbootbackend.dto.ExpenseDto;
import com.example.springbootbackend.entity.User;
import com.example.springbootbackend.entity.Expense;
import com.example.springbootbackend.repository.UserRepository;
import com.example.springbootbackend.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*") 
public class DataController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    @GetMapping("/data.json")
    public ResponseEntity<?> getData() {
        int userId = 1; // 예제에서는 사용자 id를 1로 고정
        Optional<User> userOpt = userRepository.findById(userId);
        if (!userOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        User user = userOpt.get();
        List<Expense> expenses = expenseRepository.findByUser_Id(userId);

        // 엔티티를 DTO로 변환
        UserDto userDto = new UserDto(user.getEmail(), user.getBudget());
        List<ExpenseDto> expenseDtos = expenses.stream()
            .map(expense -> new ExpenseDto(expense.getDate(), expense.getCategory(), expense.getAmount()))
            .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("user", userDto);
        response.put("expenses", expenseDtos);

        return ResponseEntity.ok(response);
    }
}

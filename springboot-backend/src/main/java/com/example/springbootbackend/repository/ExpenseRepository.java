package com.example.springbootbackend.repository;

import com.example.springbootbackend.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
    // 사용자 id로 지출 내역 조회
    List<Expense> findByUser_Id(Integer userId);
}

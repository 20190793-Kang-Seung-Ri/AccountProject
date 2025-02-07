package com.example.springbootbackend.dto;

import java.time.LocalDate;

public class ExpenseDto {
    private LocalDate date;
    private String category;
    private Integer amount;
    
    public ExpenseDto() {}
    
    public ExpenseDto(LocalDate date, String category, Integer amount) {
        this.date = date;
        this.category = category;
        this.amount = amount;
    }
    
    // Getters & Setters
    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    public Integer getAmount() {
        return amount;
    }
    public void setAmount(Integer amount) {
        this.amount = amount;
    }
}

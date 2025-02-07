package com.example.springbootbackend.dto;

public class UserDto {
    private String email;
    private Integer budget;
    
    public UserDto() {}
    
    public UserDto(String email, Integer budget) {
        this.email = email;
        this.budget = budget;
    }
    
    // Getters & Setters
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public Integer getBudget() {
        return budget;
    }
    public void setBudget(Integer budget) {
        this.budget = budget;
    }
}

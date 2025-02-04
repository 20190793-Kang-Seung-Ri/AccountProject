package com.account.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.account.domain.Users;

@Mapper
public interface UserDao {
	@Select("select * from user where userid = #{ userid }")
	Users findById(String id);

	@Insert("insert into user values (#{ userid }, #{ password }, #{ username }, #{ email }, #{ hiredate }, #{ role }, 'T')")
	int insertUser(Users users);
}

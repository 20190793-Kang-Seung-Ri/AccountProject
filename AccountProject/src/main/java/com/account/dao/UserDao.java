package com.account.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.account.domain.Users;

@Mapper
public interface UserDao {
	// ✅ 사용자 조회 (ID 기반)
	@Select("SELECT * FROM user WHERE userid = #{userid}")
	Users findById(String userid);

	// ✅ 회원가입 (신규 사용자 추가)
	@Insert("INSERT INTO user (userid, password, username, email, hiredate, role, enabled) "
			+ "VALUES (#{userid}, #{password}, #{username}, #{email}, #{hiredate}, #{role}, 'T')")
	int insertUser(Users users);

	// ✅ 회원정보 수정 (비밀번호는 선택적 변경)
	@Update("<script>" +
	        "UPDATE user " +
	        "<set>" +
	        "   <if test='username != null'>username = #{username},</if>" +
	        "   <if test='email != null'>email = #{email},</if>" +
	        "   <if test='password != null and password != \"\"'>password = #{password},</if>" +
	        "   hiredate = #{hiredate} " +
	        "</set>" +
	        "WHERE userid = #{userid}" +
	        "</script>")
	int updateUser(Users users);

}

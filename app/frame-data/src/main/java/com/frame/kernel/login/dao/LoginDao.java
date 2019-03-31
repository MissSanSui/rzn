package com.frame.kernel.login.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.frame.kernel.menu.model.Menu;
import com.frame.kernel.user.model.User;

public interface LoginDao {
	
	public User getUserByUserName(String userName);

	public List<Menu> findByParentMenuId(@Param("userId") int userId, @Param("rootMenuId") int rootMenuId);

}

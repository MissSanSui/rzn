package com.frame.kernel.login.service;

import com.frame.kernel.menu.model.MenuNode;

import javax.servlet.http.HttpSession;
import java.util.List;

public interface LoginService {
	
	public String login(HttpSession session, String userName, String password);

	public List<MenuNode> getMenuNodeByUserId(int userId, int rootMenuId);



}

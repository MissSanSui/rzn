package com.frame.kernel.util;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class SecurityInterceptor implements HandlerInterceptor {

	private static final String LOGIN_URL = "/login";
	private static final String LOGOUT_URL = "/index";
	
	@Override
	public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
			throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public boolean preHandle(HttpServletRequest req, HttpServletResponse res, Object arg2) throws Exception {
		HttpSession session = req.getSession(true);
		if(session!=null){
			// 从session 里面获取用户名的信息
			//Object obj = session.getAttribute("currentUserId");
			Object obj = session.getAttribute("mainMenu");
			// 判断如果没有取到用户信息，就跳转到登陆页面，提示用户进行登陆  
	        if (obj == null) {  
	            res.sendRedirect(req.getContextPath()+LOGOUT_URL);  
	        } 
		}else{
			res.sendRedirect(req.getContextPath()+LOGIN_URL);
		}
        return true;  
	}

}

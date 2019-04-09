package com.frame.kernel.sso;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 单点登录测试实现类
 * @author
 * @date 2019年3月22日
 */
public class PccwAutoLogin implements AutoLogin{

	@Override
	public String getAccount(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// TODO Auto-generated method stub
		return "admin";
	}

	@Override
	public void preLogin(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void postLogin(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// TODO Auto-generated method stub
		
	}

}

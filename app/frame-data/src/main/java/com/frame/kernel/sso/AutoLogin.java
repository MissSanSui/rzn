package com.frame.kernel.sso;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 单点登录接口类
 * @author
 * @date 2019年3月22日
 */
public interface AutoLogin {
	
	/**
	 * 如果想中断方法传递请抛出异常
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public String getAccount(HttpServletRequest request, HttpServletResponse response) throws Exception;
	
	/**
	 * 如果想中断方法传递请抛出异常
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	public void preLogin(HttpServletRequest request, HttpServletResponse response) throws Exception;
	
	/**
	 * 如果想中断方法传递请抛出异常
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	public void postLogin(HttpServletRequest request, HttpServletResponse response) throws Exception;
	
}

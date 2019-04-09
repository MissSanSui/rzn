package com.frame.kernel.user.exception;

import org.apache.shiro.authc.AccountException;

/**
 * 账号锁定异常类
 * @author
 * @date 2019年3月28日
 */
public class WrongFlagException extends AccountException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6897223316382352775L;

	public WrongFlagException() {
		super();
	}

	public WrongFlagException(String msg) {
		super(msg);
	}

	public WrongFlagException(Throwable cause) {
		super(cause);
	}

	public WrongFlagException(String message, Throwable cause) {
		super(message, cause);
	}
}

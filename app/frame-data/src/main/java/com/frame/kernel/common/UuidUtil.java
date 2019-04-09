package com.frame.kernel.common;

import java.util.UUID;

/**
 * UUID生成器
 */
public class UuidUtil {
	public static String getUUID(){
		UUID uuid = UUID.randomUUID();
		String str = uuid.toString();
		str = str.replaceAll("-", "");
		return str;
	}
}

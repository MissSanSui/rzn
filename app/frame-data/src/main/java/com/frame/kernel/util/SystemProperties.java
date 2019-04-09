package com.frame.kernel.util;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Properties;

/**
 * 读取系统参数工具类
 * 
 * @author
 * @date 2019年3月22日
 */
public class SystemProperties {
	private static String resources = "/conf/config.properties";


	private static Properties properties = null;

	static {
		try {
			loadProperties(resources);
		} catch (Exception e) {
			// TODO: handle exception
//			e.printStackTrace();
		}

	}

	public static String get(String key) {
		return properties.getProperty(key, null);
	}
	
	public static String getFormRes(String key,String rescourse){
		loadProperties(rescourse);
		return properties.getProperty(key, null);
	}

	public static String get(String key, String defaultVal) {
		String val = properties.getProperty(key);
		if (val == null) {
			val = defaultVal;
		}
		return val;
	}

	public static boolean getBoolean(String val) {
		val = get(val);
		val = val.toLowerCase();
		if ("true".equals(val) || "y".equals(val) || "1".equals(val)) {
			return true;
		}
		return false;
	}
	
	public static Integer getInteger(String val) {
		val = get(val);
		Integer v = 0;
		 try {
			v = Integer.parseInt(val);
		} catch (Exception e) {
			// TODO: handle exception
		}
		return v;
	}
	
	
	public static Long getLong(String val) {
		val = get(val);
		Long v = 0L;
		 try {
			v = Long.parseLong(val);
		} catch (Exception e) {
			// TODO: handle exception
		}
		return v;
	}

	private static void loadProperties(String resources) {
		InputStream is = SystemProperties.class.getResourceAsStream(resources);
		InputStreamReader isr = null;
		try {
			isr = new InputStreamReader(is, "UTF-8");
			if (properties == null) {
				properties = new Properties();
			}
			// 加载配置文件
			properties.load(isr);
		} catch (IOException e) {
			throw new RuntimeException(e);
		} finally {
			try {
				isr.close();
			} catch (IOException e1) {
				throw new RuntimeException(e1);
			}
			try {
				is.close();
			} catch (IOException e2) {
				throw new RuntimeException(e2);
			}
		}
	}

}

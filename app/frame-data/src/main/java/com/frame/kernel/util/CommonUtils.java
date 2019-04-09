package com.frame.kernel.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Field;
import java.util.Collection;
import java.util.Map;

public class CommonUtils {

	private static Logger LOGGER = LoggerFactory.getLogger(CommonUtils.class);

	/**
	 * 验证字符串是否为空
	 *
	 * @param str
	 * @return
	 */
	public static boolean isNull(String str) {
		boolean result = false;
		if (str == null || "".equals(str.trim())) {
			result = true;
		}
		return result;
	}

	/**
	 * 判断对象或对象数组中每一个对象是否为空: 对象为null，字符序列长度为0，集合类、Map为empty
	 *
	 * @param obj
	 * @return
	 */
	public static boolean isEmpty(Object obj) {
		if (obj == null)
			return true;
		if (obj instanceof CharSequence)
			return ((CharSequence) obj).length() == 0;
		if ((obj instanceof Collection))
			return ((Collection) obj).isEmpty();
		if ((obj instanceof Map))
			return ((Map) obj).isEmpty();
		if (obj instanceof Object[]) {
			Object[] object = (Object[]) obj;
			if (object.length == 0)
				return true;
			boolean empty = true;
			for (int i = 0; i < object.length; i++) {
				if (!isEmpty(object[i])) {
					empty = false;
					break;
				}
			}
			return empty;
		}
		return false;
	}

	/**
	 * 通过反射获取某一对象私有变量的值
	 *
	 * @param d
	 * @param fieldName
	 * @return
	 */
	public static Object getField(Object d, String fieldName) {
		Field field;
		try {
			field = d.getClass().getDeclaredField(fieldName);// "table_name"
			// 设置访问权限（这点对于有过android开发经验的可以说很熟悉）
			field.setAccessible(true);
			// 得到私有的变量值
			Object f = field.get(d);
			// 输出私有变量的值
			// System.out.println(f);// sssstable
			return f;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * Creator: Johnny Wang<br>
	 * Create date: 2017-3-19 22:06:05<br>
	 * Description: 通用强制类型转换方法，包括unchecked声明和warn日志。
	 *
	 * @param obj 需要转换的对象
	 * @param <T> 强转的目标类型
	 * @return 强转后的对象
	 */
	@SuppressWarnings("unchecked")
	public static <T> T cast(Object obj) {
		T tObj = null;
		try {
			tObj = (T) obj;
		} catch (Exception e) {
			LOGGER.warn("类型转换失败：" + e.toString());
			e.printStackTrace();
		}
		return tObj;
	}


	public static String trim(String string) {

		return string.trim();
	}
}

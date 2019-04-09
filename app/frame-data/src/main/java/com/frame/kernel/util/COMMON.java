package com.frame.kernel.util;

import java.lang.reflect.Field;
import java.util.Collection;
import java.util.Map;

public class COMMON {

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
	 * @param d
	 * @param fieldName
	 * @return
	 */
	public static  Object  getField(Object d,String fieldName) {
		Field field;
		try {
			field = d.getClass().getDeclaredField(fieldName);//"table_name"
			// 设置访问权限（这点对于有过android开发经验的可以说很熟悉）
			field.setAccessible(true);
			// 得到私有的变量值
			Object f = field.get(d);
			// 输出私有变量的值
//			System.out.println(f);// sssstable
			return f;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
}

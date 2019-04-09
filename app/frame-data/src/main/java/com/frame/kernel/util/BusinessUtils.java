package com.frame.kernel.util;

import com.frame.kernel.common.Constants;
import org.apache.commons.lang3.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Johnny Wang on 2017/3/19.
 */
public class BusinessUtils {

	/**
	 * Creator: Johnny Wang<br>
	 * Create date: 2017-3-21 00:10:49<br>
	 * Description: 对输入的page list查询必备的4个参数进行非空校验，如果是空则传常量值，封装成map返回。
	 *
	 * @param offset 起始行数
	 * @param limit  查询条数
	 * @param sort   排序依据
	 * @param order  升序降序
	 * @return 封装成map。
	 */
	public static Map<String, Object> getQueryBasicConditions(String offset, String limit, String sort, String order) {
		Integer offsetInt = StringUtils.isBlank(offset) ? Constants.PAGE_OFFSET : Integer.parseInt(offset);
		Integer limitInt = StringUtils.isBlank(limit) ? Constants.PAGE_LIMIT : Integer.parseInt(limit);
		String retSort = StringUtils.isBlank(sort) ? Constants.SORT_NAME : sort;
		String retOrder = StringUtils.isBlank(order) ? Constants.SORT_ORDER : order;

		Map<String, Object> retMap = new HashMap<>();
		retMap.put(Constants.OFFSET_KEY, offsetInt);
		retMap.put(Constants.LIMIT_KEY, limitInt);
		retMap.put(Constants.SORT_KEY, retSort);
		retMap.put(Constants.ORDER_KEY, retOrder);

		return retMap;
	}

	public static Integer getUserId(HttpServletRequest request) {
		HttpSession session = request.getSession(); // 当前session
		return (Integer) session.getAttribute("currentUserId"); // 当前登录人id
	}

	public static Integer getUserId(HttpSession session) {
		return (Integer) session.getAttribute("currentUserId"); // 当前登录人id
	}

	public static Timestamp getTimestamp() {
		return new Timestamp(System.currentTimeMillis());
	}
}

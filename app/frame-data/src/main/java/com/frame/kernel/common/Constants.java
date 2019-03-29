package com.frame.kernel.common;

/**
 * Constants
 */
public class Constants {

	public static final String FLAG = "flag";// 返回成功与否的key

	public static final String DATA = "data";// 返回data的key

	public static final String VALID = "valid";// 前台校验返回标识

	public static final String FLAG_SUC = "0";// 成功

	public static final String FLAG_FAIL = "1";// 失败

	public static final boolean FLAG_TRUE = true;// 成功

	public static final boolean FLAG_FALSE = false;// 失败

	public static final String MSG = "msg";// 返回信息

	public static final String MSG_SUC = "成功";// 返回信息

	public static final String MSG_FAIL = "失败";// 返回信息

	public static final int PAGE_OFFSET = 0;// 默认排序依据

	public static final int PAGE_LIMIT = 10;// 默认排序依据

	public static final String SORT_NAME = "created_date";// 默认排序依据

	public static final String SORT_ORDER = "ASC";// 默认排序顺序

	public static final String OFFSET_KEY = "offset";

	public static final String LIMIT_KEY = "limit";

	public static final String SORT_KEY = "sort";

	public static final String ORDER_KEY = "order";

	public static final String SPECIAL_SEPARATOR = "|";
	//流程状态  WTJ未提交 SPZ审批中 YSP已审批
	public static final String  FLOW_STATUS_WTJ= "WTJ";
	public static final String FLOW_STATUS_SPZ = "SPZ";
	public static final String FLOW_STATUS_YSP = "YSP";


	public static final String MODEL_ID = "modelId";
	public static final String MODEL_NAME = "name";
	public static final String MODEL_REVISION = "revision";
	public static final String MODEL_DESCRIPTION = "description";
}


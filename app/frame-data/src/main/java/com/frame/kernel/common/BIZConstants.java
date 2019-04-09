package com.frame.kernel.common;

public class BIZConstants {
	/**
	 * 用户状态
	 */
	public static final String USER_STATUES_CLOSE = "close"; // 离职
	public static final String USER_STATUES_OPEN = "open"; // 在职
	public static final String USER_STATUES_DELETE = "delete"; // 在职

	/**
	 * 菜单树顶层id
	 */
	public static final int MENU_LIST_NODE_ID = 0; // 菜单顶层id

	/**
	 * 顶层组织id
	 */
	public static final int TOP_ORG_ID = 10000; // 顶层组织id

	/**
	 * 根组织id
	 */
	public static final int ROOT_ORG_ID = -1; // 根组织id


	/**
	 * 启用标识
	 */
	public static final String ENABLE_Y = "Y"; // 启用
	public static final String ENABLE_N = "N"; // 禁用


	/**
	 * 项目状态
	 */
	public static final String PROJECT_STATU_WT = "WT";//未投项目
	public static final String PROJECT_STATU_YT = "YT";//未投项目

	/**
	 * 项目流程状态
	 */
	public static final String PROJECT_PHASE_START = "processing";//阶段办理中
	public static final String PROJECT_PHASE_END = "finish";//阶段结束
	public static final String PROJECT_PHASE_TERMINATION = "termination";//终止
	/**
	 * 项目类型状态
	 */
	public static final String PROJECT_STAGE_PRIVATE = "private";//项目转到基金负责人后阶段
	public static final String PROJECT_STAGE_OPEN = "open";//基金负责人把项目放入公共项目库项目状态
	/**
	 * 用户初始密码
	 */
	public static final String INIT_PASSWOD = "1234";
	/**
	 * 文件中间表类型：项目
	 */
	public static final String FILE_MANAGMENT_PROJECT = "file_managment_project";

	/**
	 * 任务类型和状态
	 */
	public static final String TASK_TYPE_NOTICE = "notice";//通知类
	public static final String TASK_TYPE_FEEDBACK = "feedback";//反馈类
	public static final String TASK_STATUS_D = "D";//起草中drafting
	public static final String TASK_STATUS_L = "L";//已发起launching
	public static final String TASK_STATUS_PF = "PF";//待反馈 Pending feedback
	public static final String TASK_STATUS_AF = "AF";//已反馈 Already feedback
	public static final String TASK_STATUS_C = "C";//已完成 completed
	public static final String TASK_MANAGMENT_MEETING = "MEETING";//会议调用任务
	/**
	 * 会议状态
	 */
	public static final String MEETING_TYPE_NN = "NN";//未通知Not notified
	public static final String MEETING_TYPE_AN = "AN";//已通知 Already notified

	/**
	 * 任务调用动能类型
	 */
	public static final String TASK_RELATED_TYPE_PROJECT = "task_related_project";

	/**
	 * 文件中间表类型：客户
	 */
	public static final String UPLOAD_BUSINESS_TYPE_CUSTOMER = "CUSTOMER";

	/**
	 * 机会状态
	 */
	public static final String OPPO_STATE_YLX = "YLX"; //已立项
	public static final String OPPO_STATE_WLX = "WLX"; //未立项
	public static final String OPPO_STATE_YFQ = "YFQ"; //已放弃
	/**
	 * 首页图片上传路径设置
	 */
	public static final String HOME_PHOTO_URL = "/resources/images/home";//首页图片上传地址


    /**
	 * 首页图片设置 图片名称  1-6
	 */

	public static final String HOME_PHOTO_ONE = "1";
	public static final String HOME_PHOTO_TWO = "2";
	public static final String HOME_PHOTO_THREE = "3";
	public static final String HOME_PHOTO_FOUR = "4";
	public static final String HOME_PHOTO_FIVE = "5";
	public static final String HOME_PHOTO_SIX = "6";
	public static final String HOME_PHOTO_NONE = "noimg";
	public static final String HOME_PHOTO_EXTENSION = "jpg";

	public static final String SHORTCUT_DISABLE="disable";
	public static final String SHORTCUT_ABLE="able";

}

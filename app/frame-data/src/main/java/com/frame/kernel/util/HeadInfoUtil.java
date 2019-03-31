package com.frame.kernel.util;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * 〈〉<br>
 * 〈头信息处理〉
 *
 * @author 80844988
 * @see [相关类/方法]（可选）
 * @since [产品/模块版本] （可选）
 */
public class HeadInfoUtil {


    /**
     * 设置头信息，使用最简单的方式，写一个功能baseController也可以，或者使用AOP也可以。
     *
     * @param response HttpServletResponse
     */
    public static void setHeadInfo(HttpServletResponse response) {
        response.setContentType("text/html;charset=UTF-8");
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Headers", "x-requested-with,content-type");
    }

    /**
     * 获取参数
     *
     * @param request HttpServletRequest
     * @return Map
     */
    public static Map<String, Object> getParameterMap(HttpServletRequest request) {
        Map<String, Object> params = new HashMap<>();
        Map temp = request.getParameterMap();
        Iterator entries = temp.entrySet().iterator();
        Map.Entry entry;
        String name;
        while (entries.hasNext()) {
            entry = (Map.Entry) entries.next();
            name = (String) entry.getKey();
            Object obj = entry.getValue();
            String value = null;
            if (null == obj) {
                value = "";
            } else if (obj instanceof String[]) {
                String[] values = (String[]) obj;
                for (String key : values) {
                    value = key.concat(",");
                }
                value = value != null ? value.substring(0, value.length() - 1) : null;
            } else {
                value = obj.toString();
            }
            params.put(name, value);
        }
        return params;

    }

    /**
     * 返回页面成功失败
     * @param isSuccess 成功还是失败
     * @param obj 返回内容
     * @param msg 错误信息
     * @return String
     */
    public static String returnPageFormatJson(boolean isSuccess,Object obj,String msg){

        Map<String,Object> returnMessage = new HashMap<>();
        returnMessage.put("isSuccess",isSuccess);
        returnMessage.put("obj",obj);
        returnMessage.put("msg",msg);
        return JSONUtil.ToFormatJson(returnMessage);
    }

}

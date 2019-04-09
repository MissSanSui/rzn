package com.frame.kernel.util;

import java.io.File;
import java.io.FileNotFoundException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.Scanner;
import java.util.Set;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class JSONUtil {

	public static String dfStr = "yyyyMMdd HH:mm:ss";
	public static DateFormat df = new SimpleDateFormat(dfStr);
	
	//精确到日的时间格式
	public static String df2Str = "yyyyMMdd";
	public static DateFormat df2 = new SimpleDateFormat(df2Str);
	
	public static String ToFormatJson(Object obj) {
		return ToFormatJson(obj ,true);
	}
	
	public static String ToFormatJson(Object obj,Boolean dateConverter) {
		// 按本地日期格式化日期
		// JSON.toJSONString(obj,SerializerFeature.WriteDateUseDateFormat);
		// 自定义日期输出格式
		JSON.DEFFAULT_DATE_FORMAT = dfStr;
		String jsonStr = "";
		try {
			if(dateConverter){
				jsonStr = JSON.toJSONString(obj, SerializerFeature.DisableCircularReferenceDetect,
						SerializerFeature.WriteDateUseDateFormat, SerializerFeature.WriteMapNullValue);
			}else{
				jsonStr = JSON.toJSONString(obj, SerializerFeature.DisableCircularReferenceDetect,
						 SerializerFeature.WriteMapNullValue);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonStr;
	}

	public static Date getFormatDate(Long srcDate) {
		Long ss = (srcDate / 1000) * 1000;
		return new Date(ss);
	}
	

	public static String getDateString(Date date) {
		return df.format(date);
	}
	
	//获取某个时间的当天的时间戳
	public static Long getOnlyDayMills(Date srcDate) {
		try {
			return df2.parse(df2.format(srcDate)).getTime();
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return 0L;
	}
	
	public static void fillMapFromJson(String json, Map<String, Object> map) {
		JsonObject jsonObject = JSONUtil.changeStringToJsonObject(json);
		JSONUtil.fillMapFromJsonObject(jsonObject, map);
	}

	public static JsonArray changeJsonToJsonArray(String json) {
		JsonParser parser = new JsonParser();
		return parser.parse(json).getAsJsonArray();
	}

	public static String getValueByKey(String json, String key) {
		JsonParser parser = new JsonParser();
		JsonObject jsonObject = parser.parse(json).getAsJsonObject();
		JsonElement jsonElement = jsonObject.get(key);
		return jsonElement.toString();	
	}
	
	public static void loadFromJsonToMap(String json, Map<String, Object> map) {
		JSONUtil.fillMapFromJson(json, map);
	}
	
	private static void fillMapFromJsonObject(JsonObject jsonObject, Map<String, Object> map) {
		Set<String> keyItems = map.keySet();
		for(String key : keyItems) {
			JsonElement jsonElement = jsonObject.get(key);
			if(jsonElement != null) {
				map.put(key, jsonElement.toString());
			}
		}
	}

	public static JsonObject changeStringToJsonObject(String json) {
		JsonParser parser = new JsonParser();
		JsonObject jsonObject = parser.parse(json).getAsJsonObject();
		return jsonObject;
	}

	public static boolean isJsonString(String value) {
		boolean isJson = true;
		try {
			new JsonParser().parse(value).getAsJsonObject();
		} catch(Exception e) {
			isJson = false;
		}
		return isJson;
	}
	
	public static String parseMapToJson(Map<String, Object> data) {
		Gson gson = new Gson();
		return gson.toJson(data);
	}
	
	public static String loadJsonFromFile(String jsonFile) {
		File file = new File(jsonFile);
		Scanner scanner = null;
		StringBuilder buffer = new StringBuilder();
		try {
			scanner = new Scanner(file, "utf-8");
			while (scanner.hasNextLine()) {
				buffer.append(scanner.nextLine().trim());
			}
		} catch (FileNotFoundException e) {
			System.out.println("[" + jsonFile + "]文件未找到");
		} finally {
			if (scanner != null) {
				scanner.close();
			}
		}
		return buffer.toString();
	}
	
	public static boolean isJsonArray(JsonElement jsonElement) {
		return jsonElement.isJsonArray();
	}
	
	public static boolean isJsonArray(String str) {
		JsonParser parser = new JsonParser();
		return isJsonArray(parser.parse(str));
	}
	
	public static boolean isEmptyForJsonArray(JsonElement jsonArray) {
		return jsonArray.getAsJsonArray().size() == 0;
	}
	
	public static void main(String[] args) throws Exception{
		SimpleDateFormat simpleDateFormat =new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	    Date date=simpleDateFormat.parse("2016-10-20 18:01:04");
	    long timeStemp = date.getTime();
	    System.out.println(timeStemp );
	}

	
}

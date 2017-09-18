package com.pobo.utils;

import com.pobo.exception.AmException;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

/**
 * Project: PoboAssetWS
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-8-16 17:47
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

public class JsonUtil {
	private static ObjectMapper om = new ObjectMapper();

	public static List<HashMap<String, Object>> getValueAsList(JsonNode jn) {
		try {
			return om.readValue(jn, new TypeReference<List<HashMap<String, Object>>>() {
			});
		} catch (IOException e) {
			throw new AmException("JsonNode to List<Map> Error");
		}
	}

	public static JsonNode str2jn(String json) {
		try {
			return om.readValue(json, JsonNode.class);
		} catch (IOException e) {
			throw new AmException("String to JsonNode Error");
		}
	}

	public static Object str2obj(String json, Class cls) {
		try {
			return om.readValue(json, cls);
		} catch (IOException e) {
			throw new AmException("String to Object Error");
		}
	}

	public static String obj2json(Object obj) {
		String json;
		try {
			json = om.writeValueAsString(obj);
		} catch (IOException e) {
			throw new AmException("Object to Json Error");
		}
		return json;
	}

	/******************************************/
	private static ObjectMapper getOM() {
		if (om == null) {
			om = new ObjectMapper();
		}
		return om;
	}

	public static void main(String[] args) {
		//List<Map<String, Object>> formparams = new ArrayList<>();
		HashMap<String, Object> map = new HashMap<>();
		map.put("arg2", "www");
		map.put("arg3", "1");
		map.put("arg4", "123");
		map.put("arg6", "0");
		map.put("arg9", "OS");
		//formparams.add(map);
		String str = obj2json(map);
	}
}

package com.pobo.constant;

import java.util.HashMap;

public class ParameterTranslator {
	public static HashMap<String, String> map = new HashMap<>();

	static {
		map.put("rtime", "C_RegTime");
		map.put("a", "asc");
		map.put("de", "desc");
		map.put("btime", "C_BookingTime");
	}

	public static String getRealParameter(String input) {
		return map.get(input);
	}
}

package com.pobo.constant;

import java.util.HashMap;

/**
 * Project: GmHall
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/6/12 18:08
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

public class FuncCode {
	public static HashMap<String, String> map = new HashMap<>();

	static {
		map.put("C2001", "CRM 登录");
		map.put("C2101", "普通客户注册");
		map.put("C2102", "经纪人注册");
		map.put("C2103", "理财师注册");
		map.put("C2104", "客户重新绑定推荐人");
		map.put("C2105", "投资者对应经纪人查询");
		map.put("C2106", "投资者对应理财师查询");
		map.put("C2107", "投资者基本信息查询");

		map.put("W1001", "账户预登录");
		map.put("W1010", "生成图片验证码");
		map.put("W1011", "校验图片验证码");
		map.put("W1012", "生成手机验证码");
		map.put("W1013", "校验手机验证码");
		map.put("W1024", "云认证-账户登录");
		map.put("W1028", "云认证-注册生成手机验证码");
		map.put("W1029", "云认证-校验手机验证码");
		map.put("W1030", "云认证-设置密码并登录");
		map.put("W1031", "云认证-修改密码并登录");
		map.put("W1032", "云认证-获取手机验证码找回密码");
		map.put("W1099", "账户登出");
	}

	public static String getDesc(int type, int func) {
		String desc;
		if (type == 1) {
			desc = map.get("T" + func);
		} else if (type == 2) {
			desc = map.get("C" + func);
		} else {
			desc = map.get("W" + func);
		}
		return desc;
	}
}

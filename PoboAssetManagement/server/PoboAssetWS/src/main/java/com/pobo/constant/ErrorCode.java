package com.pobo.constant;

import java.util.HashMap;

/**
 * Project: PoboAssetWS
 * Comments: 错误码表
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/6/12 17:20
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

public class ErrorCode {
	public static HashMap<Integer, String> map = new HashMap<>();

	static {
		map.put(1, "OK");

		map.put(-1, "程序异常");

		map.put(-11, "系统内参数传递错误");
		map.put(-12, "AOP 异常，ProceedingJoinPoint proceed 执行失败");
		map.put(-13, "后台服务网络连接错误");
		map.put(-17, "IO 异常，JsonNode 转换失败");
		map.put(-20, "数据库操作错误");
		map.put(-21, "数据库返回数据错误");

		map.put(-101, "无效的报文格式");
		map.put(-102, "用户登录令牌校验失败");
		map.put(-103, "已存在该客户！");
		map.put(-104, "错误的注册步骤！");
		map.put(-105, "不存在该产品");
		map.put(-106, "不存在该客户！");
		map.put(-107, "无净值记录");
		map.put(-108, "错误的风险测评答案");
	}

	public static String getDesc(int errorCode) {
		return map.get(errorCode);
	}
}

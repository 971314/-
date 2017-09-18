package com.pobo.constant;

import java.util.HashMap;

/**
 * Project: GmHall
 * Comments: <对此类的描述，可以引用系统设计中的描述>
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

public class RetCode {
	public static HashMap<Integer, String> map = new HashMap<>();

	static {
		map.put(1, "OK");

		map.put(-1, "程序异常");

		map.put(-11, "IO 异常，JsonNode 转换失败");
		map.put(-12, "AOP 异常，ProceedingJoinPoint proceed 执行失败");
		map.put(-13, "后台服务网络连接错误");

		map.put(-101, "功能码缺失或为0");
		map.put(-102, "无法解析该功能码");
		map.put(-103, "请求类型错误");
		map.put(-104, "系统内参数传递错误");
		map.put(-105, "缺少参数 data");
		map.put(-106, "缺少参数 account");
		map.put(-107, "缺少参数 session id");
		map.put(-108, "token 校验错误");
		map.put(-109, "客户账号必须全都为数字");
		map.put(-301, "交易 HttpClient 创建失败");
		map.put(-302, "无法连接至交易网关地址");
		map.put(-303, "交易 Post 请求创建失败");
		map.put(-304, "至交易网关的 HTTP 请求失败");

		map.put(-1001, "客户未登录");
		map.put(-1101, "验证码为空");
		map.put(-1102, "验证码错误");
		map.put(-1103, "手机验证码为空");
		map.put(-1104, "手机验证码错误");
		map.put(-1105, "验证码已过期");

		map.put(-2001, "无法连接到 CRM 系统");
		map.put(-2002, "");
		map.put(-2003, "CRM 返回结果为 NULL");
		map.put(-2004, "CRM 返回结果为空");
		map.put(-2011, "身份证图片上传失败");
		map.put(-2012, "身份证图片名称不得为空");
		map.put(-2013, "身份证图片不得为空");
		map.put(-2101, "实时可用资金小于1001元，不可发起激活流程");
		map.put(-2102, "输入姓名或手机与资金账户不匹配");
		map.put(-2103, "当前状态不可发起激活流程");
		map.put(-2104, "不存在该资金账户");
		map.put(-2105, "休眠账户激活业务目前只能用于只有商品交易编码的客户, 中金所账户，请通过纸质材料申请中金所激活");
		map.put(-2106, "记录客户登录信息失败");
		map.put(-2107, "类型输入错误，记录客户信息失败");
		map.put(-2201, "当日成交不为空，取消保底限制失败");
		map.put(-2202, "当前持仓不为空，取消保底限制失败");

		map.put(-3001, "请求业务失败");
		map.put(-3002, "关闭客户端连接");
		map.put(-3003, "与后台连接失败");
		map.put(-3004, "没有实现的功能");
		map.put(-3005, "帐号或者密码错误");
		map.put(-3006, "交易网关没有返回数据");
		map.put(-3007, "交易网关返回结果集有问题");
		map.put(-3008, "令牌失效");

		map.put(-3101, "后台连接已关闭！");
		map.put(-3201, "交易返回数据为空");
		map.put(-3202, "交易返回数据错误,无法解析为正确 Json");
		map.put(-3301, "银行流水查询失败");
		map.put(-3302, "请选择合适日期，最多只能查询5日明细");

	}

	public static String getDesc(int errorCode) {
		return map.get(errorCode);
	}
}

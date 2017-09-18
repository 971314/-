package com.pobo.protocol;

import java.util.HashMap;

/**
 * Project: GmHall
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/6/2 17:58
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

public class TradeProtocolUtil {
	public static HashMap<String, String> getSetp(int func) {
		HashMap<String, String> map = new HashMap<>();

		if (func == 6011) {
			map.put("62", "");   // 营业部代码
			map.put("61", "");   // 券商代码
			map.put("70", "");   // 硬盘编号
			map.put("71", "");   // 客户端本机 IP 地址
			map.put("72", "");   // 客户端 MAC 地址
			map.put("73", "");   // 客户端版本号
			map.put("67", "");   // 登录类别
			map.put("69", "");   // 动态密码
			map.put("68", "");   // 动态密码类别
			map.put("53", "");   // 账户类别
			map.put("249", "");  // 登录账号
			map.put("355", "");  // 获取短信口令标志
			map.put("349", "");  // 核心认证类别
			map.put("350", "");  // 核心密码
			map.put("359", "");  // CPU 序列号
			map.put("360", "");  // 主板时间
			map.put("445", "");  // 唯一识别码
			map.put("485", "");  // 硬盘分区
			map.put("486", "");  // 计算机名
			map.put("444", "");  // 经纪公司代码
			map.put("254", "");  // 产品
			map.put("255", "");  // 平台
			map.put("281", "");  // 手机号码
		} else if (func == 6012) {
			map.put("56", "");   // 币种
			map.put("347", "");   // 可取标志
		} else if (func == 6013) {
			map.put("54", "");   // 市场代码
			map.put("65", "");   // 委托编号
			map.put("66", "");   // 成交编号
		} else if (func == 6014) {
			map.put("54", "");   // 市场代码
			map.put("63", "");   // 合约代码
		} else if (func == 6019) {
			map.put("65", "");   // 委托编号
		} else if (func == 6040) {

		} else if (func == 6023) {
			map.put("253", "");     // 原密码
			map.put("166", "");     // 新密码
			map.put("167", "");     // 密码类别
		} else if (func == 6200) {
			map.put("220", "");   // 银行编码
		} else if (func == 6201) {
			map.put("59", "");      // 资金密码
			map.put("215", "");     // 银行编码
			map.put("214", "");     // 银行账号
			map.put("56", "");      // 货币代码
			map.put("220", "");     // 转账金额
			map.put("51", "");      // 资金账号
			map.put("60", "");      // 银行密码
			map.put("353", "");     // 银行分中心代码
		} else if (func == 6202) {
			map.put("60", "");      // 银行密码
			map.put("215", "");     // 银行编码
			map.put("214", "");     // 银行账号
			map.put("56", "");      // 货币代码
			map.put("220", "");     // 转账金额
			map.put("51", "");      // 资金账号
			map.put("59", "");      // 资金密码
			map.put("353", "");     // 银行分中心代码
		} else if (func == 6203) {
			map.put("215", "");   // 银行编码
			map.put("214", "");   // 银行账号
			map.put("60", "");   // 银行密码
			map.put("56", "");   // 货币代码
			map.put("51", "");   // 资金账户
			map.put("59", "");   // 资金密码
		} else if (func == 6205) {
			map.put("200", "");   // 银行流水
		}

		return map;
	}
}

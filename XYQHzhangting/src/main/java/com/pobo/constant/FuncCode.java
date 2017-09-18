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
		map.put("T6011", "资金账户登录");
		map.put("T6012", "今日资金查询");
		map.put("T6013", "今日成交查询");
		map.put("T6014", "今日持仓查询");
		map.put("T6019", "今日委托查询");
		map.put("T6023", "修改密码");
		map.put("T6040", "席位号查询");
		map.put("T6200", "银行账户查询");
		map.put("T6201", "证券（期货）转银行");
		map.put("T6202", "银行转证券（期货）");
		map.put("T6203", "银行余额查询");
		map.put("T6052", "历史委托查询");
		map.put("T6205", "银证转账流水查询");

		map.put("C2001", "客户信息查询");
		map.put("C2010", "客户最后一次登录信息查询");
		map.put("C2011", "记录客户最后一次登录信息");
		map.put("C2101", "客户流程办理进度查询");
		map.put("C2110", "客户联系方式变更");
		map.put("C2111", "客户通讯地址变更");
		map.put("C2112", "客户交易系统切换");
		map.put("C2113", "客户休眠账户激活");
		map.put("C2114", "客户身份证有效期变更");
		map.put("C2115", "客户密码重置");
		map.put("C2116", "验证客户休眠账户激活权限");
		map.put("C2117", "验证客户密码重置");

		map.put("C2130", "客户保底限制取消");
		map.put("C2131", "验证客户保底限制取消权限");
		map.put("C3001", "客户资金明细查询");
		map.put("C9001", "信息发布查询");

		map.put("W1001", "账户预登录");
		map.put("W1011", "校验图片验证码");
		map.put("W1012", "生成手机验证码");
		map.put("W1013", "校验手机验证码");
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

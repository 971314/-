package com.pobo.util;

import com.pobo.protocol.WsRequest;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ObjectNode;

import java.util.HashSet;

/**
 * Project: GmHall
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/6/14 18:42
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

public class PasswordCoverUtil {
	// 包含密码的交易功能码，需隐藏
	public static HashSet<Integer> funcHasPwd = new HashSet<>();

	static {
		funcHasPwd.add(6011);
		funcHasPwd.add(6023);
		funcHasPwd.add(6203);
		funcHasPwd.add(6201);
		funcHasPwd.add(6202);

		funcHasPwd.add(2114);
		funcHasPwd.add(2115);
	}

	public static JsonNode coverPassword(JsonNode jn) {
		if (jn.has("pwd")) {
			((ObjectNode) jn).put("pwd", "******");
		}

		if (jn.get("data").has("58")) { // 交易密码
			((ObjectNode) jn.get("58")).put("58", "******");
		}
		if (jn.get("data").has("59")) { // 资金密码
			((ObjectNode) jn.get("59")).put("59", "******");
		}
		if (jn.get("data").has("60")) { // 银行密码
			((ObjectNode) jn.get("60")).put("60", "******");
		}
		if (jn.get("data").has("253")) { // 原密码
			((ObjectNode) jn.get("253")).put("253", "******");
		}
		if (jn.get("data").has("166")) { // 新密码
			((ObjectNode) jn.get("166")).put("166", "******");
		}
		if (jn.get("data").has("225")) { // 新银行密码
			((ObjectNode) jn.get("225")).put("225", "******");
		}
		if (jn.get("data").has("406")) { // 提货密码
			((ObjectNode) jn.get("406")).put("406", "******");
		}

		if (jn.get("data").has("81")) { // 提货密码
			((ObjectNode) jn.get("81")).put("81", "*** Base64 图片 ***");
		}
		if (jn.get("data").has("82")) { // 提货密码
			((ObjectNode) jn.get("82")).put("82", "*** Base64 图片 ***");
		}

		return jn;
	}

	public static WsRequest coverPassword(WsRequest data) {
		data.getData().get(0).replace("58", "******");
		data.getData().get(0).replace("59", "******");
		data.getData().get(0).replace("60", "******");
		data.getData().get(0).replace("253", "******");
		data.getData().get(0).replace("166", "******");
		data.getData().get(0).replace("225", "******");
		data.getData().get(0).replace("406", "******");

		data.getData().get(0).replace("81", "*** Base64 图片 ***");
		data.getData().get(0).replace("82", "*** Base64 图片 ***");
		return data;
	}
}

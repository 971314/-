package com.pobo.model;

import com.pobo.dao.mapper.ILogMapper;
import com.pobo.entity.CustomerLog;
import com.pobo.exception.AmException;
import com.pobo.utils.JsonUtil;
import org.codehaus.jackson.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * Project: PoboAssetWS
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-10-28 16:59
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Component
public class LogAction {
	@Autowired
	private ILogMapper logMapper;

	public int insertCustomerLog(String loginName, String orgId, String content, String ip) {
		try {
			logMapper.insertCustomerOpInfo(loginName, orgId, content, ip);
		} catch (Exception e) {
			throw new AmException(-20);
		}
		return 0;
	}

	public int insertBookingLog(String loginName, String orgId, String productId, String bookingId, String ip) {
		Map<String, String> map = new HashMap<>();
		map.put("id", bookingId);
		map.put("status", "1");
		String content = JsonUtil.obj2json(map);
		try {
			logMapper.insertBookingLog(loginName, orgId, productId, bookingId, content, ip);
		} catch (Exception e) {
			throw new AmException(-20);
		}
		return 0;
	}
}

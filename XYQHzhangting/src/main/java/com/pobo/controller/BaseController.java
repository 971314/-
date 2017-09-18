package com.pobo.controller;

import com.pobo.cache.SessionCacheManager;
import com.pobo.cache.UserCacheManager;
import com.pobo.model.trade.TradeConn;
import com.pobo.protocol.TradeProtocolUtil;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Project: GmHall
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-7-22 19:42
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */
@Controller(value = "baseController")
public class BaseController {
	@Autowired
	public TradeConn tradeConn;

	public SessionCacheManager sessionCacheManager = SessionCacheManager.getInstance();
	public UserCacheManager userCacheManager = UserCacheManager.getInstance();

	public Logger logger = LoggerFactory.getLogger(getClass());

	public WsResponse tradeDoNothing(WsRequest data, WsResponse response) {
		String account = data.getAccount();

		// 发送至交易网关的报文组装
		HashMap<String, String> protocol = new HashMap<>();
		protocol.putAll(TradeProtocolUtil.getSetp(data.getFunc()));

		List<HashMap<String, String>> arr = new ArrayList<>();
		arr.add(protocol);

		List<HashMap<String, Object>> rdata = tradeConn.request(account, data.getFunc(), arr, response);

		if (rdata != null) {
			//if(data.getFunc()==6014)
			//{
			//	rdata.clear();
			//}
			return response.setCorrect(rdata);
		}

		return response;
	}
}

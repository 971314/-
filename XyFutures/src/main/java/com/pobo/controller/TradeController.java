package com.pobo.controller;

import com.pobo.interceptor.Loggable;
import com.pobo.interceptor.Validator;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpServletRequest;

/**
 * Project: GmHall
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/5/27 16:10
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Controller(value = "tradeController")
public class TradeController extends BaseController {

	// 6013 查今日成交
	@Loggable
	@Validator
	public WsResponse queryDayDeal(HttpServletRequest request, WsRequest data, WsResponse response) {
		return tradeDoNothing(data, response);
	}

	// 6014 查持仓
	@Loggable
	@Validator
	public WsResponse queryDayPosition(HttpServletRequest request, WsRequest data, WsResponse response) {
		return tradeDoNothing(data, response);
	}

	// 6019 查当日委托
	@Loggable
	@Validator
	public WsResponse queryDayOrder(HttpServletRequest request, WsRequest data, WsResponse response) {
		return tradeDoNothing(data, response);
	}

	// 1-6052 查历史委托
	@Loggable
	@Validator
	public WsResponse queryHistoryOrder(HttpServletRequest request, WsRequest data, WsResponse response) {
		return tradeDoNothing(data, response);
	}

	@Loggable
	@Validator
	public WsResponse queryHolderAccount(HttpServletRequest request, WsRequest data, WsResponse response) {
		return tradeDoNothing(data, response);
	}
}

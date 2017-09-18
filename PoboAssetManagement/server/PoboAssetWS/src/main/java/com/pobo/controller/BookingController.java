package com.pobo.controller;

import com.pobo.exception.AmException;
import com.pobo.model.BookingAction;
import com.pobo.model.LogAction;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;
import com.pobo.utils.HttpServletRequestUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * Project: PoboAssetWS
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-11-1 21:00
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Controller
public class BookingController {
	@Autowired
	private BookingAction bookingAction;

	@Autowired
	private LogAction logAction;

	public WsResponse newBooking(WsRequest data, WsResponse response, HttpServletRequest request) {
		String loginName = data.getLoginname();
		String orgId = data.getOrgid();

		String productId;
		String phone;

		try {
			productId = (String) data.getData().get(0).get("productid");
			phone = (String) data.getData().get(0).get("phone");
		} catch (Exception e) {
			throw new AmException(-101);
		}

		int bookingId = bookingAction.addBookingInfo(loginName, productId, phone, orgId);

		logAction.insertBookingLog(loginName, orgId, productId, String.valueOf(bookingId),
				HttpServletRequestUtil.getClientIP(request));

		List<HashMap<String, Object>> rdata = new LinkedList<>();
		HashMap<String, Object> rmap = new HashMap<>();
		rdata.add(rmap);
		response.setCorrect(rdata);
		return response;
	}

	public WsResponse getBookingInfo(WsRequest data, WsResponse response) {
		String loginName = data.getLoginname();
		String orgId = data.getOrgid();
		String status;
		String fromDate = "";
		String toDate = "";

		try {
			status = (String) data.getData().get(0).get("status");

			if (data.getData().get(0).containsKey("fromdate")) {
				fromDate = (String) data.getData().get(0).get("fromdate");
			}

			if (data.getData().get(0).containsKey("todate")) {
				toDate = (String) data.getData().get(0).get("todate");
			}
		} catch (Exception e) {
			throw new AmException(-101);
		}

		List<Map<String, Object>> list = bookingAction.getBookingInfo(loginName, orgId, status, fromDate, toDate);

		List<HashMap<String, Object>> rdata = new LinkedList<>();
		HashMap<String, Object> rmap = new HashMap<>();
		rmap.put("info", list);
		rmap.put("count", list.size());
		rdata.add(rmap);
		response.setCorrect(rdata);

		return response;
	}
}

package com.pobo.controller;

import com.apex.crm.wsclient.LbRecord;
import com.apex.crm.wsclient.QueryResult;
import com.pobo.interceptor.Loggable;
import com.pobo.interceptor.Validator;
import com.pobo.model.crm.GmCrmAction;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpServletRequest;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Project: GmHall
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/5/27 16:12
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Controller(value = "capitalController")
public class CapitalController extends BaseController {
	@Autowired
	private GmCrmAction crmAction;

	// 6012 查当日资金
	@Loggable
	@Validator
	public WsResponse queryDayCapital(HttpServletRequest request, WsRequest data, WsResponse response) {
		return tradeDoNothing(data, response);
	}

	// 2-3001 客户资金明细查询
	@Loggable
	@Validator
	public WsResponse queryCapitalDetails(HttpServletRequest request, WsRequest data, WsResponse response) {
		String account = data.getAccount();
		HashMap<String, String> map = data.getData().get(0);

		String days = map.get("49");

		if (Integer.valueOf(days) > 4) {
			return response.setError(-3302);
		}

		DateFormat df = new SimpleDateFormat("yyyyMMdd");

		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DATE, 0 - Integer.valueOf(days));
		String toDate = df.format(new Date());
		String fromDate = df.format(calendar.getTime());

		QueryResult result = crmAction.getKhcrjmx(account, fromDate, toDate);

		if (result == null) {
			return response.setError(-2003);
		}

		if (result.getResult() != 1) {
			return response.setError(-2002, result.getMessage());
		}

		List<HashMap<String, Object>> detailInfoList = new ArrayList<>();

		List records = result.getRecords();
		for (LbRecord record : (Iterable<LbRecord>) records) {
			HashMap<String, Object> hmap = new HashMap<>();
			List tmp = record.getValues();
			hmap.put("21", tmp.get(0));
			hmap.put("50", tmp.get(1));
			hmap.put("51", tmp.get(2));
			hmap.put("90", tmp.get(3));
			hmap.put("91", tmp.get(4));
			hmap.put("92", tmp.get(5));
			//hmap.put("21", (String) tmp.get(6));

			detailInfoList.add(hmap);
		}

		response.setCorrect(detailInfoList);
		return response;
	}
}

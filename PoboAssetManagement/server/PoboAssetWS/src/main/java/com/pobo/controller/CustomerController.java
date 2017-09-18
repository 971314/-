package com.pobo.controller;

import com.pobo.entity.CustomerLog;
import com.pobo.exception.AmException;
import com.pobo.model.CustomerAction;
import com.pobo.model.LogAction;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;
import com.pobo.utils.HttpServletRequestUtil;
import com.pobo.utils.JsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

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
public class CustomerController {
	@Autowired
	private CustomerAction customerAction;

	@Autowired
	private LogAction logAction;

	public WsResponse login(WsRequest data, WsResponse response) {
		String loginName = data.getLoginname();
		String orgId = data.getOrgid();

		// 登录时，先检查是否存在该账号
		HashMap<String, Object> map;
		map = customerAction.getCustomerInfo(loginName, orgId);

		List<HashMap<String, Object>> rdata = new LinkedList<>();
		HashMap<String, Object> rmap;
		if (map == null) {
			rmap = new HashMap<>();
		} else {
			rmap = map;
		}

		rdata.add(rmap);
		response.setCorrect(rdata);
		return response;
	}
	
	public WsResponse register(WsRequest data, WsResponse response, HttpServletRequest request) {
		String loginName = data.getLoginname();
		String orgId = data.getOrgid();

		CustomerLog log = new CustomerLog();

		HashMap<String, Object> map = data.getData().get(0);

		String idNum;
		String name;
		ArrayList<String> answer;

		try {
			idNum = (String) map.get("id");
			name = (String) map.get("name");
			answer = (ArrayList<String>) map.get("answers");
		} catch (Exception e) {
			throw new AmException(-101);
		}
		String risklevel = customerAction.calcRiskLevel(answer);

		int customerId = customerAction.initialCustomer(loginName, idNum, name, risklevel, orgId);

		log.setIdnum(idNum);
		log.setName(name);
		log.setRiskevaluation(risklevel);

		String content = JsonUtil.obj2json(log);
		logAction.insertCustomerLog(loginName, orgId, content, HttpServletRequestUtil.getClientIP(request));

		List<HashMap<String, Object>> rdata = new LinkedList<>();
		HashMap<String, Object> rmap = new HashMap<>();
		rmap.put("risklevel", risklevel);
		rmap.put("customerid", customerId);
		rdata.add(rmap);
		response.setCorrect(rdata);

		return response.setCorrect();
	}

	public WsResponse submitRisk(WsRequest data, WsResponse response, HttpServletRequest request) {
		String loginName = data.getLoginname();
		String orgId = data.getOrgid();

		CustomerLog log = new CustomerLog();

		HashMap<String, Object> map = data.getData().get(0);
		ArrayList<String> answer;
		try {
			answer = (ArrayList<String>) map.get("answers");
		} catch (Exception e) {
			throw new AmException(-101);
		}

		String level = customerAction.setRiskLevel(loginName, orgId, answer);

		log.setRiskevaluation(level);
		String content = JsonUtil.obj2json(log);
		logAction.insertCustomerLog(loginName, orgId, content, HttpServletRequestUtil.getClientIP(request));

		List<HashMap<String, Object>> rdata = new LinkedList<>();
		HashMap<String, Object> rmap = new HashMap<>();
		rmap.put("risklevel", level);
		rdata.add(rmap);
		response.setCorrect(rdata);

		return response;
	}
}

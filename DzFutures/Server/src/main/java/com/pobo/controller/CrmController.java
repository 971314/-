package com.pobo.controller;

import com.pobo.exception.DzException;
import com.pobo.interceptor.AuthCheck;
import com.pobo.interceptor.Loggable;
import com.pobo.model.crm.CrmAction;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;
import org.codehaus.jackson.JsonNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Project: DzFutures
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-8-23 14:39
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Controller(value = "crmController")
public class CrmController {
	@Autowired
	private CrmAction crmAction;

	protected Logger logger = LoggerFactory.getLogger(getClass());

	private
	@Value("${crm.defaultreferer}")
	String DEFAULT_REFERER_ID = "95503";

	@Loggable
	@AuthCheck
	public WsResponse cutsomerRegister(HttpServletRequest request, WsRequest data, WsResponse response) {
		HashMap<String, String> map = data.getData().get(0);

		String phone = map.get("30");
		//String password = map.get("17");
		String referer = map.get("105");
		if (referer == null || referer.equals("")) {
			referer = DEFAULT_REFERER_ID;
		}
		JsonNode jn = crmAction.cutsomerRegister(phone, "", referer);
		String code = jn.get("head").get("code").asText();
		if (code.equals("0")) {
			return response.setCorrect();
		} else {
			return response.setError(jn.get("head").get("message").asText());
		}
	}

	@AuthCheck
	@Loggable
	public WsResponse brokerRegister(HttpServletRequest request, WsRequest data, WsResponse response) {
		HashMap<String, String> map = data.getData().get(0);
		String brokerName = map.get("102");
		String brokerId = map.get("101");
		String deptId = map.get("103");
		String phone = map.get("30");
		JsonNode jn = crmAction.brokerRegister(brokerName, brokerId, deptId, phone);

		String code = jn.get("head").get("code").asText();
		if (code.equals("0")) {
			return response.setCorrect();
		} else {
			return response.setError(jn.get("head").get("message").asText());
		}
	}

	@AuthCheck
	@Loggable
	public WsResponse advisorRegister(HttpServletRequest request, WsRequest data, WsResponse response) {
		HashMap<String, String> map = data.getData().get(0);
		String idNum = map.get("37");
		String brokerId = map.get("101");
		String deptId = map.get("103");
		String img = map.get("107");
		String phone = map.get("30");
		JsonNode jn = crmAction.advisorRegister(idNum, brokerId, deptId, img, phone);

		String code = jn.get("head").get("code").asText();
		if (code.equals("0")) {
			return response.setCorrect();
		} else {
			return response.setError(jn.get("head").get("message").asText());
		}
	}

	@AuthCheck
	@Loggable
	public WsResponse referrerBinding(HttpServletRequest request, WsRequest data, WsResponse response) {
		HashMap<String, String> map = data.getData().get(0);
		String referer = map.get("105");
		String phone = map.get("30");
		JsonNode jn = crmAction.referrerBinding(referer, phone);

		String code = jn.get("head").get("code").asText();
		if (code.equals("0")) {
			return response.setCorrect();
		} else {
			return response.setError(jn.get("head").get("message").asText());
		}
	}

	@AuthCheck
	@Loggable
	public WsResponse queryBroker(HttpServletRequest request, WsRequest data, WsResponse response) {
		HashMap<String, String> map = data.getData().get(0);
		String phone = map.get("30");

		JsonNode jn;
		jn = crmAction.queryBroker(phone);

		String code = jn.get("head").get("code").asText();
		if (!code.equals("0")) {
			return response.setError(jn.get("head").get("message").asText());
		}

		List<HashMap<String, Object>> rData = new ArrayList<>();
		HashMap<String, Object> hashMap = new HashMap<>();

		try {
			hashMap.put("102", jn.get("BROKERNAME").asText());
			hashMap.put("103", jn.get("DEPARTMENT_ID").asText());
			hashMap.put("101", jn.get("BROKER_ID").asText());
		} catch (Exception e) {
			throw new DzException("CRM 返回报文错误，缺失关键数据");
		}

		rData.add(hashMap);
		return response.setCorrect(rData);
	}

	@AuthCheck
	@Loggable
	public WsResponse queryAdvisor(HttpServletRequest request, WsRequest data, WsResponse response) {
		HashMap<String, String> map = data.getData().get(0);
		String phone = map.get("30");

		JsonNode jn;
		jn = crmAction.queryAdvisor(phone);

		String code = jn.get("head").get("code").asText();
		if (!code.equals("0")) {
			return response.setError(jn.get("head").get("message").asText());
		}

		List<HashMap<String, Object>> rData = new ArrayList<>();
		HashMap<String, Object> hashMap = new HashMap<>();
		try {
			hashMap.put("37", jn.get("ID_NO").asText());
			hashMap.put("103", jn.get("DEPARTMENT_ID").asText());
			hashMap.put("101", jn.get("BROKER_ID").asText());
			hashMap.put("107", jn.get("IMG_DATA").asText());
		} catch (DzException e) {
			throw new DzException("CRM 返回报文错误，缺失关键数据");
		}

		rData.add(hashMap);
		return response.setCorrect(rData);
	}

	@Loggable
	@AuthCheck
	public WsResponse queryUserInfo(HttpServletRequest request, WsRequest data, WsResponse response) {
		HashMap<String, String> map = data.getData().get(0);
		String phone = map.get("30");

		JsonNode jn;
		jn = crmAction.queryUserInfo(phone);

		String code = jn.get("head").get("code").asText();
		if (!code.equals("0")) {
			return response.setError(jn.get("head").get("message").asText());
		}

		List<HashMap<String, Object>> rData = new ArrayList<>();
		HashMap<String, Object> hashMap = new HashMap<>();
		try {
			hashMap.put("21", jn.get("USERCODE").asText());
			hashMap.put("30", jn.get("PHONENUM").asText());
			hashMap.put("27", jn.get("CUST_TYP").asText());
			hashMap.put("105", jn.get("RECOMMENDNUM").asText());
			hashMap.put("108", jn.get("ISBROKER").asText());
			hashMap.put("109", jn.get("ISACCOUNTANT").asText());
		} catch (Exception e) {
			throw new DzException("CRM 返回报文错误，缺失关键数据");
		}
		rData.add(hashMap);
		return response.setCorrect(rData);
	}
}

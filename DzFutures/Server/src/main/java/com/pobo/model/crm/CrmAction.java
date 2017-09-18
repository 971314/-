package com.pobo.model.crm;

import com.pobo.exception.DzException;
import com.pobo.service.HTTPCommService;
import com.pobo.utils.JsonUtil;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.message.BasicNameValuePair;
import org.codehaus.jackson.JsonNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Project: DzFutures
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-8-23 14:51
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Component(value = "crmAction")
public class CrmAction {
	@Autowired
	private HTTPCommService httpCommService;

	private Logger logger = LoggerFactory.getLogger(getClass());

	private
	@Value("${crm.service.url}")
	String SERVICE_URL = "http://192.168.2.11:8080/httpservice/service.do";

	private static
	//@Value("${crm.service.username}")
	String USERNAME = "appuser";

	private static
	//@Value("${crm.service.password}")
	String PASSWORD = "123456";
	private
	@Value("${crm.charset}")
	String CHARSET = "GBK";

	/**
	 * CRM 统一系统登录, 每次 CRM 操作前都需完成一次登录
	 *
	 * @return 返回 boolean
	 */
	public final boolean login() {
		logger.info("CRM 登录");
		Map<String, String> crmMap = new HashMap<>();
		crmMap.put("username", USERNAME);
		crmMap.put("password", PASSWORD);
		JsonNode jn = submit("login", crmMap);
		logger.info("CRM 登录返回, [{}]", jn.asText());
		return jn.get("head").get("code").asText().equals("0");
	}

	public JsonNode cutsomerRegister(String phone, String password, String referer) {
		Map<String, String> crmMap = new HashMap<>();
		crmMap.put("PHONENUM", phone);
		crmMap.put("PASSWORD", password);
		crmMap.put("RECOMMENDNUM", referer);
		return submit("app.101", crmMap);
	}

	public JsonNode brokerRegister(String brokerName, String brokerId, String deptId, String phone) {
		Map<String, String> crmMap = new HashMap<>();
		crmMap.put("BROKERNAME", brokerName);
		crmMap.put("DEPARTMENT_ID", deptId);
		crmMap.put("BROKER_ID", brokerId);
		crmMap.put("PHONENUM", phone);

		return submit("app.102", crmMap);
	}

	public JsonNode advisorRegister(String idNum, String brokerId, String deptId, String img, String phone) {
		Map<String, String> crmMap = new HashMap<>();
		crmMap.put("ID_NO", idNum);
		crmMap.put("DEPARTMENT_ID", deptId);
		crmMap.put("BROKER_ID", brokerId);
		crmMap.put("IMG_DATA", img);
		crmMap.put("PHONENUM", phone);
		return submit("app.103", crmMap);
	}

	public JsonNode referrerBinding(String referer, String phone) {
		Map<String, String> crmMap = new HashMap<>();
		crmMap.put("RECOMMENDNUM", referer);
		crmMap.put("PHONENUM", phone);
		return submit("app.104", crmMap);
	}

	public JsonNode queryBroker(String phone) {
		Map<String, String> crmMap = new HashMap<>();
		crmMap.put("PHONENUM", phone);
		return submit("app.105", crmMap);
	}

	public JsonNode queryAdvisor(String phone) {
		Map<String, String> crmMap = new HashMap<>();
		crmMap.put("PHONENUM", phone);
		return submit("app.106", crmMap);
	}

	public JsonNode queryUserInfo(String phone) {
		Map<String, String> crmMap = new HashMap<>();
		crmMap.put("PHONENUM", phone);
		return submit("app.107", crmMap);
	}


	/***************************************************************/
	/**
	 * CRM 发送请求
	 * 以 CRM 默认 charset = "GBK" 编码
	 *
	 * @return 返回 JsonNode
	 */
	private JsonNode submit(String service, Map<String, String> data) {
		String json = JsonUtil.obj2json(data);

		HttpPost post = new HttpPost(SERVICE_URL);
		List<NameValuePair> formparams = new ArrayList<>();
		formparams.add(new BasicNameValuePair("json", json));
		formparams.add(new BasicNameValuePair("service", service));
		UrlEncodedFormEntity uefEntity;
		try {
			uefEntity = new UrlEncodedFormEntity(formparams, CHARSET);
			post.setEntity(uefEntity);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}

		String ret = httpCommService.doPost(post);
		JsonNode jn = JsonUtil.str2jn(ret);

		String code;
		String message = "";
		try {
			code = jn.get("head").get("code").asText();
			if (!code.equals("0")) {
				message = jn.get("head").get("message").asText();
			}
		} catch (NullPointerException e) {
			logger.error("CRM 返回 Json 报文错误, [{}]", message);
			throw new DzException("CRM 返回 Json 报文错误");
		}

		return jn;
	}
}

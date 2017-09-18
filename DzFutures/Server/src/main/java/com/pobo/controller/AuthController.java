package com.pobo.controller;

import com.pobo.exception.DzException;
import com.pobo.interceptor.Loggable;
import com.pobo.model.auth.PoboAuthAction;
import com.pobo.model.crm.CrmAction;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;
import com.pobo.utils.JsonUtil;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ArrayNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Project: DzFutures
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-8-30 15:36
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Controller(value = "authController")
public class AuthController {
	@Autowired
	private PoboAuthAction poboAuth;

	@Autowired
	private CrmAction crmAction;

	protected Logger logger = LoggerFactory.getLogger(getClass());

	private String POBO_NUMBER = "1";

	@Loggable
	public WsResponse login(HttpServletRequest request, WsRequest data, WsResponse response) {
		HashMap<String, String> map = data.getData().get(0);

		String loginName = map.get("phone");
		String loginType = map.get("type");
		String pwd = map.get("pwd");
		String deviceId = map.get("deviceId");
		String OS = map.get("os");
		String version = map.get("version");
		String orgNumber = map.get("orgNumber");
		Map<String, String> ret = poboAuth.login(POBO_NUMBER, loginName, loginType, pwd, deviceId, OS, version, orgNumber);

		try {
			if (!ret.get("retCode").equals("0")) {
				logger.error(ret.toString());
				return response.setError(ret.get("desc"));
			}
		} catch (Exception err) {
			logger.error("认证错误，返回数据为空！");
			throw new DzException("认证错误，返回数据为空！");
		}

		List<HashMap<String, Object>> rData = new ArrayList<>();
		HashMap<String, Object> hashMap = new HashMap<>(ret);
		rData.add(hashMap);

		// 云认证完成登录，去 CRM 检验是否已注册
		crmAction.login();
		JsonNode jn;
		jn = crmAction.queryUserInfo(loginName);
		try {
			logger.debug("CRM 信息返回: [{}]", jn.toString());

			String code = jn.get("head").get("code").asText();
			ArrayNode an = (ArrayNode) jn.get("body").get("result");
			if (an.size() == 0) {
				logger.error("云认证已登录，CRM 注册信息缺失");
				return response.setCorrect(2, rData);
			}
			if (!code.equals("0")) {
				logger.error("云认证已登录，CRM 查询客户信息，message=[{}]", jn.get("head").get("message"));
				return response.setCorrect(2, rData);
			}
		} catch (DzException e) {
			logger.error("云认证已登录，CRM 注册信息缺失");
			return response.setCorrect(2, rData);
		}

		return response.setCorrect(rData);
	}

	@Loggable
	public WsResponse register(HttpServletRequest request, WsRequest data, WsResponse response) {
		HashMap<String, String> map = data.getData().get(0);

		String loginName = map.get("phone");
		String loginType = map.get("type");
		String deviceId = map.get("deviceId");
		String OS = map.get("os");
		String version = map.get("version");
		String orgNumber = map.get("orgNumber");
		Map<String, String> ret = poboAuth.register(POBO_NUMBER, loginName, loginType,
				deviceId, OS, version, orgNumber);

		try {
			if (!ret.get("retCode").equals("0")) {
				logger.error(ret.toString());
				return response.setError(ret.get("desc"));
			}
		} catch (Exception err) {
			logger.error("认证错误，返回数据为空！");
			throw new DzException("认证错误，返回数据为空！");
		}

		List<HashMap<String, Object>> rData = new ArrayList<>();
		HashMap<String, Object> hashMap = new HashMap<>(ret);
		rData.add(hashMap);
		return response.setCorrect(rData);
	}

	@Loggable
	public WsResponse checkSmsCaptcha(HttpServletRequest request, WsRequest data, WsResponse response) {
		HashMap<String, String> map = data.getData().get(0);

		String loginName = map.get("phone");
		String loginType = map.get("type");
		String captcha = map.get("captcha");
		String deviceId = map.get("deviceId");
		String userId = map.get("userId");

		Map<String, String> ret = poboAuth.checkSmsCapthca(POBO_NUMBER, loginName, loginType, captcha, deviceId, userId, null);

		try {
			if (!ret.get("retCode").equals("0")) {
				logger.error(ret.toString());
				return response.setError(ret.get("desc"));
			}
		} catch (Exception err) {
			logger.error("认证错误，返回数据为空！");
			throw new DzException("认证错误，返回数据为空！");
		}

		List<HashMap<String, Object>> rData = new ArrayList<>();
		HashMap<String, Object> hashMap = new HashMap<>(ret);
		rData.add(hashMap);
		return response.setCorrect(rData);
	}

	@Loggable
	public WsResponse resetPwdAndLogin(HttpServletRequest request, WsRequest data, WsResponse response) {
		HashMap<String, String> map = data.getData().get(0);

		String loginName = map.get("phone");
		String loginType = map.get("type");
		String token = data.getToken();
		String newPwd = map.get("newPwd");
		String userId = data.getAccount();
		String deviceId = map.get("deviceId");
		String os = map.get("os");
		String version = map.get("version");
		String orgNumber = map.get("orgNumber");

		// Step 1, 更新密码
		Map<String, String> ret1 = poboAuth.updatePassword(POBO_NUMBER, loginName, loginType, "", "", newPwd, userId);

		try {
			if (!ret1.get("retCode").equals("0")) {
				logger.error(ret1.toString());
				return response.setError(ret1.get("desc"));
			}
		} catch (Exception err) {
			logger.error("认证错误，返回数据为空！");
			throw new DzException("认证错误，返回数据为空！");
		}

		// Step 2, 以新密码登录
		Map<String, String> ret2 = poboAuth.login(POBO_NUMBER, loginName, loginType, newPwd, deviceId, os, version, orgNumber);

		try {
			if (!ret2.get("retCode").equals("0")) {
				logger.error(ret2.toString());
				return response.setError(ret2.get("desc"));
			}
		} catch (Exception err) {
			logger.error("认证错误，返回数据为空！");
			throw new DzException("认证错误，返回数据为空！");
		}

		List<HashMap<String, Object>> rData = new ArrayList<>();
		HashMap<String, Object> hashMap = new HashMap<>(ret2);
		rData.add(hashMap);
		return response.setCorrect(rData);
	}

	@Loggable
	public WsResponse updatePwdAndLogin(HttpServletRequest request, WsRequest data, WsResponse response) {
		HashMap<String, String> map = data.getData().get(0);

		String loginName = map.get("phone");
		String loginType = map.get("type");
		String token = data.getToken();
		String oldPwd = map.get("oldPwd");
		String newPwd = map.get("newPwd");
		String userId = data.getAccount();
		String deviceId = map.get("deviceId");
		String os = map.get("os");
		String version = map.get("version");
		String orgNumber = map.get("orgNumber");

		// Step 1, 更新密码
		Map<String, String> ret1 = poboAuth.updatePassword(POBO_NUMBER, loginName, loginType, token, oldPwd, newPwd, userId);

		try {
			if (!ret1.get("retCode").equals("0")) {
				logger.error(ret1.toString());
				return response.setError(ret1.get("desc"));
			}
		} catch (Exception err) {
			logger.error("认证错误，返回数据为空！");
			throw new DzException("认证错误，返回数据为空！");
		}

		// Step 2, 以新密码登录
		Map<String, String> ret2 = poboAuth.login(POBO_NUMBER, loginName, loginType, newPwd, deviceId, os, version, orgNumber);

		try {
			if (!ret2.get("retCode").equals("0")) {
				logger.error(ret2.toString());
				return response.setError(ret2.get("desc"));
			}
		} catch (Exception err) {
			logger.error("认证错误，返回数据为空！");
			throw new DzException("认证错误，返回数据为空！");
		}

		List<HashMap<String, Object>> rData = new ArrayList<>();
		HashMap<String, Object> hashMap = new HashMap<>(ret2);
		rData.add(hashMap);
		return response.setCorrect(rData);
	}

	@Loggable
	public WsResponse sendSmsForfindPassword(HttpServletRequest request, WsRequest data, WsResponse response) {
		HashMap<String, String> map = data.getData().get(0);

		String loginName = map.get("phone");
		String loginType = map.get("type");
		String deviceId = map.get("deviceId");

		// Step 1: check loginName and loginType, find userId
		Map<String, String> ret1 = poboAuth.queryUserInfo(POBO_NUMBER, loginName, loginType, deviceId);

		try {
			if (!ret1.get("retCode").equals("0")) {
				logger.error(ret1.toString());
				return response.setError(ret1.get("desc"));
			}
		} catch (Exception err) {
			logger.error("认证错误，返回数据为空！");
			throw new DzException("认证错误，返回数据为空！");
		}

		String userId = ret1.get("userId");

		// Step 2: send SmsCaptcha by userId and phone
		Map<String, String> ret2 = poboAuth.sendSmsForfindPassword(POBO_NUMBER, userId, loginName, deviceId);

		try {
			if (!ret2.get("retCode").equals("0")) {
				logger.error(ret2.toString());
				return response.setError(ret2.get("desc"));
			}
		} catch (Exception err) {
			logger.error("认证错误，返回数据为空！");
			throw new DzException("认证错误，返回数据为空！");
		}

		List<HashMap<String, Object>> rData = new ArrayList<>();
		HashMap<String, Object> hashMap = new HashMap<>(ret2);
		rData.add(hashMap);
		return response.setCorrect(rData);
	}
}

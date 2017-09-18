package com.pobo.controller;

import com.pobo.cache.CacheKey;
import com.pobo.cache.SessionCacheManager;
import com.pobo.interceptor.Loggable;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;
import com.pobo.service.GmSmsService;
import com.pobo.util.CaptchaUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpServletRequest;

/**
 * Project: GmHall
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/7/8 11:09
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Controller(value = "captchaController")
public class CaptchaController {
	private
	@Value("${cache.smsexpire}")
	int SMS_CAPTCHA = 5;

	@Loggable
	public WsResponse checkCaptcha(HttpServletRequest request, WsRequest data, WsResponse response) {

		String token = data.getToken();
		String captcha = data.getData().get(0).get("15");

		if (!SessionCacheManager.getInstance().isExist(token, CacheKey.CAPTCHA_PC)) {
			return response.setError(-1102);
		}

		if (CaptchaUtil.check(token, captcha)) {
			return response.setCorrect();
		} else {
			response.setError(-1102);
			return response;
		}
	}

	@Loggable
	public WsResponse genSmsCaptcha(HttpServletRequest request, WsRequest data, WsResponse response) {
		String token = data.getToken();
		String phone = data.getData().get(0).get("30");

		try {
			String captcha = GmSmsService.sendSmsCaptcha(phone);

			// 加入缓存，设置过期时间为 2 分钟，并不允许时间戳更新
			SessionCacheManager.getInstance().add(token, CacheKey.GM_ESMS_CAPTCHA, captcha, SMS_CAPTCHA * 60 * 1000, false);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return response.setCorrect();
	}

	@Loggable
	public WsResponse checkSmsCaptcha(HttpServletRequest request, WsRequest data, WsResponse response) {
		String token = data.getToken();
		String captcha = data.getData().get(0).get("16");

		if (captcha == null || captcha.isEmpty()) {
			return response.setError(-1103);
		}

		boolean ret = false;
		try {
			// 从 SessionCache 中读取验证码
			String expectedCaptcha = (String) SessionCacheManager.getInstance().get(token, CacheKey.GM_ESMS_CAPTCHA);
			if (expectedCaptcha == null) {
				return response.setError(-1105);
			}
			ret = captcha.equals(expectedCaptcha);
		} catch (Exception e) {
			e.printStackTrace();
		}

		if (ret) {
			return response.setCorrect();
		} else {
			return response.setError(-1104);
		}
	}
}

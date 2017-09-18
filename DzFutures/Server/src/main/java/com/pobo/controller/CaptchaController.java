package com.pobo.controller;

import com.pobo.exception.DzException;
import com.pobo.interceptor.Loggable;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;
import com.pobo.service.SMSCommSerivce;
import org.springframework.beans.factory.annotation.Autowired;
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
	@Autowired
	private SMSCommSerivce smsCommSerivce;

//	private
//	@Value("${cache.smsexpire}")
//	int SMS_CAPTCHA = 5;

	@Loggable
	public WsResponse genSmsCaptcha(HttpServletRequest request, WsRequest data, WsResponse response) {
		String phone = data.getData().get(0).get("30");

		try {
			smsCommSerivce.sendSms(phone, "");
		} catch (Exception e) {
			throw new DzException("短信验证码发送失败");
		}

		return response.setCorrect();
	}

	@Loggable
	public WsResponse checkSmsCaptcha(HttpServletRequest request, WsRequest data, WsResponse response) {
		String captcha = data.getData().get(0).get("16");

		if (captcha == null || captcha.isEmpty()) {
			throw new DzException("短信验证码不能为空");
		}

		boolean ret = false;
		// 从 SessionCache 中读取验证码
		String expectedCaptcha = "";
		if (expectedCaptcha == null) {
			throw new DzException("不曾生成短信验证码");
		}

		if (captcha.equals(expectedCaptcha)) {
			return response.setCorrect();
		} else {
			throw new DzException("验证码不匹配");
		}
	}
}

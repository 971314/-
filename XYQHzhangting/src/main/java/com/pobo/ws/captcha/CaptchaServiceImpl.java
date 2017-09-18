package com.pobo.ws.captcha;

import com.pobo.cache.CacheKey;
import com.pobo.cache.SessionCacheManager;
import com.pobo.util.CaptchaUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Project: GmHall
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/5/5 18:42
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Component(value = "captchaService")
public class CaptchaServiceImpl implements CaptchaService {
	private
	@Value("${cache.captchaexpire}")
	int EXPIRE = 5;

	@Override
	public void genCaptcha(HttpServletRequest request, HttpServletResponse response, String token) throws IOException {
		String capText;
		capText = CaptchaUtil.gen(request, response);
		// 图片验证码，保存 5 min 有效
		SessionCacheManager.getInstance().add(token, CacheKey.CAPTCHA_PC, capText, EXPIRE * 60 * 1000, false);
	}
}

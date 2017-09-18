package com.pobo.utils;

import com.google.code.kaptcha.Constants;
import com.google.code.kaptcha.Producer;
import com.pobo.cache.CacheKey;
import com.pobo.cache.SessionCacheManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.IOException;

/**
 * Project: GmHall
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/5/6 13:47
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Component(value = "captchaUtil")
public class CaptchaUtil {
	private static Producer captchaProducer = null;

	@Autowired
	public void setCaptchaProducer(Producer captchaProducer) {
		CaptchaUtil.captchaProducer = captchaProducer;
	}

	protected static Logger logger = LoggerFactory.getLogger(CaptchaUtil.class);


	/**
	 * 采用了 Google 提供的 Kaptcha 验证码库生成验证码
	 *
	 * @param request  HttpServletRequest 请求
	 * @param response HttpServletResponse 返回，用于输出验证码图片流
	 */
	public static String gen(HttpServletRequest request,
	                         HttpServletResponse response) throws IOException {
		response.setDateHeader("Expires", 0);
		// Set standard HTTP/1.1 no-cache headers.
		response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
		// Set IE extended HTTP/1.1 no-cache headers (use addHeader).
		response.addHeader("Cache-Control", "post-check=0, pre-check=0");
		// Set standard HTTP/1.0 no-cache header.
		response.setHeader("Pragma", "no-cache");
		// return a jpeg
		response.setContentType("image/jpeg");
		// p3p 跨域
		response.setHeader("P3P", "CP='IDC DSP COR ADM DEVi TAIi PSA PSD IVAi IVDi CONi HIS OUR IND CNT'");

		// create the text for the image
		String capText = captchaProducer.createText();
		// store the text in the session
		request.getSession().setAttribute(Constants.KAPTCHA_SESSION_KEY, capText);

		logger.debug("图片验证码: [{}], SessionId: [{}]", capText, request.getSession().getId());
		System.out.println(capText+"             "+request.getSession().getId());
		// create the image with the text
		BufferedImage bi = captchaProducer.createImage(capText);
		ServletOutputStream out = response.getOutputStream();
		// write the data out
		ImageIO.write(bi, "jpg", out);
		try {
			out.flush();
		} finally {
			out.close();
		}
		return capText;
	}

	/**
	 * 验证输入的验证码是否正确
	 * 如果与 Session 所存验证码一致，则正确，否则错误
	 *
	 * @param token   String 客户号，用来查找缓存
	 * @param captcha 验证码字符串
	 * @return boolean 验证通过返回 true，否则 false
	 */
	public static boolean check(String token, String captcha) {

		if (!SessionCacheManager.getInstance().isExist(token, CacheKey.CAPTCHA)) {
			return false;
		}
		if (captcha == null || captcha.isEmpty()) {
			return false;
		}
		String expectCaptcha = (String) SessionCacheManager.getInstance().get(token, CacheKey.CAPTCHA);
		return captcha.trim().toLowerCase().equals(expectCaptcha.trim().toLowerCase());
	}
}

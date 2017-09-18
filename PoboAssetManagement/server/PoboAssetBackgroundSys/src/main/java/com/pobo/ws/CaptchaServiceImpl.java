package com.pobo.ws;

import com.pobo.cache.CacheKey;
import com.pobo.cache.SessionCacheManager;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;
import com.pobo.utils.CaptchaUtil;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Component(value = "captchaService")
public class CaptchaServiceImpl implements CaptchaService {
	private @Value("${cache.captchaexpire}") int EXPIRE = 5;

	@Override
	public void genCaptcha(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String capText;
		capText = CaptchaUtil.gen(request, response);
		// 图片验证码，保存 5 min 有效
		SessionCacheManager.getInstance().add(request.getSession().getId(), CacheKey.CAPTCHA, capText,
				EXPIRE * 60 * 1000, false);
	}

	@Override
	public WsResponse checkCaptcha(HttpServletRequest request, HttpServletResponse response, WsRequest wr)
			throws Exception {
		boolean check = CaptchaUtil.check(request.getSession().getId(), wr.getData().get(0).get("captcha").toString().trim());
		WsResponse r = new WsResponse();
		List<HashMap<String, Object>> rdata = new ArrayList<>();
		HashMap<String, Object> rmap = new HashMap<>();
		rmap.put("check", check ? 1 : 0);
		rdata.add(rmap);
		r.setCorrect(rdata);
		return r;
	}
}

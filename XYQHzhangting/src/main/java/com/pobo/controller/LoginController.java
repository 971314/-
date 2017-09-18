package com.pobo.controller;

import com.apex.crm.wsclient.LbeResult;
import com.apex.crm.wsclient.QueryResult;
import com.pobo.cache.CacheKey;
import com.pobo.cache.SessionCacheManager;
import com.pobo.cache.UserCacheManager;
import com.pobo.interceptor.Loggable;
import com.pobo.interceptor.Validator;
import com.pobo.model.crm.GmCrmAction;
import com.pobo.protocol.PreWsRequest;
import com.pobo.protocol.TradeProtocolUtil;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;
import com.pobo.util.Base64Util;
import com.pobo.util.CaptchaUtil;
import com.pobo.util.HttpServletRequestUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
 * Create Date: 2016/5/27 16:11
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Controller(value = "loginController")
public class LoginController extends BaseController {
	@Autowired
	private GmCrmAction crmAction;

	private
	@Value("${account.type}")
	String ACCOUNT_TYPE = "8";

	@Loggable
	public WsResponse preLogin(HttpServletRequest request, PreWsRequest data, WsResponse response) {
		/* 数据校验 */
		List<HashMap<String, String>> list = data.getData();

		if (list == null || list.isEmpty()) {
			return response.setError(-105);
		}

		/* 生成 UUID 作为 Session 的 TOKEN */
		String uuid = UUID.randomUUID().toString();

		/* 以 UUID 为 Key，将登录信息存入 SessionCache */
		sessionCacheManager.add(uuid, CacheKey.TOKEN, request);

		/* 返回 UUID **/
		List<HashMap<String, Object>> rdata = new ArrayList<>();
		HashMap<String, Object> rmap = new HashMap<>();
		rmap.put("13", uuid);
		rdata.add(rmap);
		return response.setCorrect(rdata);
	}

	public WsResponse isLogin(HttpServletRequest request, WsRequest data, WsResponse response) {
		// 校验有无 token, token 为 uuid 编码
		String account = data.getAccount();
		String token = data.getToken();

		if (token == null || token.isEmpty()) {
			return response.setError(-107);
		}

		/** 登录状态校验 **/
		if (!UserCacheManager.getInstance().hasSession(account, token)) {
			return response.setError(-1001);
		}

		return response.setCorrect();
	}

	// 1-6011 账户登录
	@Loggable
	public WsResponse login(HttpServletRequest request, WsRequest data, WsResponse response) {
		/** 数据校验 **/
		List<HashMap<String, String>> list = data.getData();
		// 校验有无 data
		if (list == null || list.isEmpty()) {
			return response.setError(-105);
		}

		// 校验有无 account
		String account = data.getAccount();
		if (account == null || account.isEmpty()) {
			return response.setError(-106);
		}

		// 校验 account 有无异常字符
		if (!account.matches("[0-9]{1,}")) {
			return response.setError(-109);
		}

		// 校验有无 sessionId, 即 token
		String token = data.getToken();
		if (token == null || token.isEmpty()) {
			return response.setError(-107);
		}

		HashMap<String, String> map = list.get(0);

		/** 校验验证码 **/
		String captcha = map.get("69");
		if (captcha == null || captcha.isEmpty()) {
			return response.setError(-1101);
		}
		if (!CaptchaUtil.check(token, captcha)) {
			return response.setError(-1102);
		}

		/** CRM 身份查询, 若不存在，则不允许登录 **/
		List<Object> record;
		String khxxResult=crmAction.getKhxx(account);
		if(khxxResult==null)
		{
			return response.setError(-2003);
		}
		JSONObject jo=JSONObject.fromObject(khxxResult);
		if(jo.containsKey("head"))
		{
			JSONObject head=(JSONObject)jo.get("head");
			if("0".equals(head.get("code")))
			{
				JSONObject body=(JSONObject)jo.get("body");
				if(body.containsKey("result"))
				{
					JSONArray jaResult=body.getJSONArray("result");
					if(jaResult.size()==0)
					{
						return response.setError(-2104);
					}
					else
					{
						JSONObject joRecord=(JSONObject)jaResult.get(0);
						record = new ArrayList<>();
						record.add(joRecord.containsKey("YYB")?joRecord.get("YYB").toString():"");
						record.add(joRecord.containsKey("KHH")?joRecord.get("KHH").toString():"");
						record.add(joRecord.containsKey("KHXM")?joRecord.get("KHXM").toString():"");
						record.add(joRecord.containsKey("KHZT")?joRecord.get("KHZT").toString():"");
						record.add(joRecord.containsKey("ZJBH")?joRecord.get("ZJBH").toString():"");
						record.add(joRecord.containsKey("KHLX")?joRecord.get("KHLX").toString():"");
						record.add(joRecord.containsKey("KHRQ")?joRecord.get("KHRQ").toString():"");
						record.add(joRecord.containsKey("XHRQ")?joRecord.get("XHRQ").toString():"");
						record.add(joRecord.containsKey("KHQC")?joRecord.get("KHQC").toString():"");
						record.add(joRecord.containsKey("DH")?joRecord.get("DH").toString():"");
						record.add(joRecord.containsKey("SJ")?joRecord.get("SJ").toString():"");
						record.add(joRecord.containsKey("CZ")?joRecord.get("CZ").toString():"");
						record.add(joRecord.containsKey("YZBM")?joRecord.get("YZBM").toString():"");
						record.add(joRecord.containsKey("DZ")?joRecord.get("DZ").toString():"");
						record.add(joRecord.containsKey("EMAIL")?joRecord.get("EMAIL").toString():"");
						record.add(joRecord.containsKey("JYXT")?joRecord.get("JYXT").toString():"");
						record.add(joRecord.containsKey("XMZT")?joRecord.get("XMZT").toString():"");
						record.add(joRecord.containsKey("ZJDQR")?joRecord.get("ZJDQR").toString():"");
						record.add("1");
					}
				}
				else
				{
					return response.setError(-2003);
				}
			}
			else
			{
				String errorMsg=head.containsKey("message")?head.get("message").toString():"客户信息查询错误";
				return response.setError(-2002, errorMsg);
			}
		}
		else
		{
			return response.setError(-2003);
		}
		userCacheManager.add(account, CacheKey.CRM_USER_INFO, record);

		//if (!userCacheManager.isExist(account, CacheKey.CRM_USER_INFO)) {
		//}

		/** 交易系统登录操作 **/
		String password = Base64Util.decode(map.get("59"));
		// 组装发送至交易报文
		HashMap<String, String> protocol = new HashMap<>();
		protocol.putAll(TradeProtocolUtil.getSetp(data.getFunc()));
		protocol.replace("67", ACCOUNT_TYPE);    // 期货账号类型
		protocol.replace("249", account);
		List<HashMap<String, String>> arr = new ArrayList<>();
		arr.add(protocol);
		// 发送至交易网关
		List<HashMap<String, Object>> rdata = tradeConn.login(account, password, arr, response);

		if (rdata == null) {
			return response;
		}

		/** 登录成功，记录最后一次登录信息 **/
		DateFormat df1 = new SimpleDateFormat("yyyyMMdd");
		String date = df1.format(new Date());
		DateFormat df2 = new SimpleDateFormat("HH:mm:ss");
		String time = df2.format(new Date());

		String url = request.getRequestURL().toString();
		String queryString = request.getQueryString();
		if (queryString != null) {
			url += "?"+queryString;
		}
		//记录客户登录日志
		crmAction.execXzczrz(account, date, time, "1", url, "网厅客户登陆",
						HttpServletRequestUtil.getClientIP(request), "00-00-00-00-00-00");

		/** 登录成功，将当前登录信息写入缓存 UserCache **/
		userCacheManager.addSession(account, token);

		return response.setCorrect(rdata);
	}

	@Loggable
	public WsResponse logout(HttpServletRequest request, WsRequest data, WsResponse response) {
		/** 数据校验 **/
		// 校验有无 account
		String account = data.getAccount();
		if (account == null || account.isEmpty()) {
			return response.setError(-106);
		}

		// 校验 account 有无异常字符
		if (!account.matches("[0-9]{1,}")) {
			return response.setError(-109);
		}

		// 校验有无 token, token 为 uuid 编码
		String token = data.getToken();
		if (token == null || token.isEmpty()) {
			return response.setError(-107);
		}

		/** 登录状态校验 **/
		if (!UserCacheManager.getInstance().hasSession(account, token)) {
			return response.setError(-1001);
		}

		/* 删除当前 account 对应缓存 UserCache 中的 Session 信息 */
		userCacheManager.removeSession(data.getAccount(), data.getToken());
		/* 删除当前 Session 信息 */
		sessionCacheManager.delAll(data.getToken());
		return response.setCorrect();
	}
}

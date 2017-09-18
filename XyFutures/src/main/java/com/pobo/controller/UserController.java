package com.pobo.controller;

import com.apex.crm.wsclient.LbeResult;
import com.apex.crm.wsclient.QueryResult;
import com.pobo.cache.CacheKey;
import com.pobo.cache.UserCacheManager;
import com.pobo.interceptor.Loggable;
import com.pobo.interceptor.Validator;
import com.pobo.model.crm.GmCrmAction;
import com.pobo.protocol.TradeProtocolUtil;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;
import com.pobo.trade.jni.PoboTradeLib;
import com.pobo.util.Base64Util;
import com.pobo.util.HttpServletRequestUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpServletRequest;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * Project: GmHall
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/5/27 16:09
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Controller(value = "userController")
public class UserController extends BaseController {
	@Autowired
	private GmCrmAction crmAction;

	// 2-2001 客户信息查询
	@Loggable
	@Validator
	public WsResponse getUserInfo(HttpServletRequest request, WsRequest data, WsResponse response) {

		String account = data.getAccount();

		// CRM 返回结果
		List<Object> record;

		// 将 UserInfo 加入缓存，如果不存在，则发起请求
		if (!userCacheManager.isExist(account, CacheKey.CRM_USER_INFO)) {
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
			UserCacheManager.getInstance().add(account, CacheKey.CRM_USER_INFO, record);
		} else {
			record = (List<Object>) UserCacheManager.getInstance().get(account, CacheKey.CRM_USER_INFO);
		}

		HashMap<String, Object> map = new HashMap<>();
		map.put("20", record.get(0));  // 营业部号
		map.put("21", record.get(1));  //客户号
		map.put("24", record.get(2));  //客户姓名
		map.put("27", record.get(3));  //客户状态
		map.put("36", record.get(4));  //证件编号
		map.put("28", record.get(5));  //客户类型，0-个人，1-机构
		map.put("56", record.get(6));  // 开户日期
		map.put("57", record.get(7));  // 销户日期
		map.put("26", record.get(8));  // 客户全称
		map.put("31", record.get(9));  //电话号码
		map.put("30", record.get(10));  //手机号
		map.put("32", record.get(11));  // 传真
		map.put("33", record.get(12));  //邮政编码
		map.put("34", record.get(13));  //地址
		map.put("35", record.get(14));  //电子邮箱
		map.put("75", record.get(15));  //交易系统
		map.put("29", record.get(16));  //休眠状态
		map.put("86", record.get(17));  //身份证截止日期
		map.put("110", record.get(18));  //确认风险揭示书,0-未确认;1-已确认

		List<HashMap<String, Object>> arr = new ArrayList<>();
		arr.add(map);

		response.setCorrect(arr);
		return response;
	}

	// 2-2011 记录客户最新登陆信息
	@Loggable
	@Validator
	public WsResponse recordLastLoginInfo(HttpServletRequest request, WsRequest data, WsResponse response) {
		String account = data.getAccount();

		HashMap<String, String> map = data.getData().get(0);

		// data
		HashMap<String, String> protocol = new HashMap<>();
		String type = map.get("72"); // 72 – 操作科目，1-用户登陆;2-用户退出;3-确认风险揭示书

		/** 记录最后一次登录信息 **/
		DateFormat df1 = new SimpleDateFormat("yyyyMMdd");
		String date = df1.format(new Date());
		DateFormat df2 = new SimpleDateFormat("HH:mm:ss");
		String time = df2.format(new Date());

		String typedesc;
		if (type.equals("1")) {
			typedesc = "网厅客户登陆";
		} else if (type.equals("2")) {
			typedesc = "网厅客户退出";
		} else if (type.equals("3")) {
			typedesc = "网厅客户确认风险揭示书";
		} else {
			return response.setError(-2107);
		}

		String url = request.getRequestURL().toString();
		String queryString = request.getQueryString();
		if (queryString != null) {
			url += "?"+queryString;
		}
		//crmAction.execXzczrz(account, date, time, type, url,typedesc, HttpServletRequestUtil.getClientIP(request), "00-00-00-00-00-00");
		LbeResult result = null;

		if (result != null && result.getResult() == 1) {
			// 更新客户信息缓存
			//crmAction.getKhxx(account);
			QueryResult res = null;
			if (res == null) {
				return response.setError(-2003);
			}

			if (res.getCount() == 0 || res.getRecords().size() == 0) {
				return response.setError(-2104);
			}
			if (res.getResult() != 1) {
				return response.setError(-2002, res.getMessage());
			}
			List<Object> record;
			record = new ArrayList<>();
			record.addAll(res.getRecords().get(0).getValues());
			UserCacheManager.getInstance().add(account, CacheKey.CRM_USER_INFO, record);
			// 更新完毕

			return response.setCorrect();
		} else {
			return response.setError(-2106);
		}
	}

	// 2-2010 客户最新登陆信息查询
	@Loggable
	@Validator
	public WsResponse getLastLoginInfo(HttpServletRequest request, WsRequest data, WsResponse response) {
		String account = data.getAccount();

		// CRM 返回结果
		List<Object> record = null;
		//crmAction.getKhzxczrz(account);
		QueryResult result = null;
		if (result == null) {
			return response.setError(-2003);
		}

		if (result.getCount() == 0 || result.getRecords().size() == 0) {
			return response.setError(-2004);
		}
		if (result.getResult() != 1) {
			return response.setError(-2002, result.getMessage());
		}
		record = new ArrayList<>();
		record.addAll(result.getRecords().get(0).getValues());

		HashMap<String, Object> map = new HashMap<>();
		map.put("21", record.get(0));  //客户号
		map.put("50", record.get(1));  //日期
		map.put("51", record.get(2));  //发生时间
		map.put("72", record.get(3));  //操作科目
		map.put("101", record.get(4));  //操作 URL 地址
		map.put("73", record.get(5));  //操作说明
		map.put("10", record.get(6));  // IP 地址
		map.put("11", record.get(7));  // MAC 地址

		List<HashMap<String, Object>> arr = new ArrayList<>();
		arr.add(map);
		response.setCorrect(arr);
		return response;
	}

	// 1-6023 修改密码
	@Loggable
	@Validator
	public WsResponse updatePassword(HttpServletRequest request, WsRequest data, WsResponse response) {
		String account = data.getAccount();
		HashMap<String, String> map = data.getData().get(0);

		// data
		HashMap<String, String> protocol = new HashMap<>();
		protocol.putAll(TradeProtocolUtil.getSetp(data.getFunc()));
		protocol.replace("253", PoboTradeLib.DesSetPwd(Base64Util.decode(map.get("253")), account));
		protocol.replace("166", PoboTradeLib.DesSetPwd(Base64Util.decode(map.get("166")), account));
		protocol.replace("167", map.get("167"));

		List<HashMap<String, String>> arr = new ArrayList<>();
		arr.add(protocol);

		List<HashMap<String, Object>> rdata = tradeConn.request(account, data.getFunc(), arr, response);

		if (rdata != null) {
			return response.setCorrect(rdata);
		}

		return response;
	}
}

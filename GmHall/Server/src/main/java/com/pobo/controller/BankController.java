package com.pobo.controller;

import com.pobo.constant.RetCode;
import com.pobo.interceptor.Loggable;
import com.pobo.interceptor.Validator;
import com.pobo.protocol.TradeProtocolUtil;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;
import com.pobo.trade.jni.PoboTradeLib;
import com.pobo.util.Base64Util;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Project: GmHall
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/5/27 16:10
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Controller(value = "bankController")
public class BankController extends BaseController {
	private
	@Value("${bank.waitsecond}")
	int WAITSECONDS;  // 银行操作时，为了避免银行未处理，因此需要等待几秒

	// 6200 查询银行账号
	@Loggable
	@Validator
	public WsResponse queryBankAccount(HttpServletRequest request, WsRequest data, WsResponse response) {
		return tradeDoNothing(data, response);
	}

	// 6201 证券(期货)转银行
	@Loggable
	@Validator
	public WsResponse transFutureToBank(HttpServletRequest request, WsRequest data, WsResponse response) {
		String account = data.getAccount();
		HashMap<String, String> map = data.getData().get(0);

		// data
		HashMap<String, String> protocol = new HashMap<>();
		protocol.putAll(TradeProtocolUtil.getSetp(data.getFunc()));

		protocol.replace("59", PoboTradeLib.DesSetPwd(Base64Util.decode(map.get("59")), account));
		protocol.replace("215", map.get("215"));
		protocol.replace("214", map.get("214"));
		protocol.replace("56", map.get("56"));
		protocol.replace("220", map.get("220"));
		protocol.replace("353", map.get("353"));
		protocol.replace("51", account);
		protocol.replace("60", PoboTradeLib.DesSetPwd(Base64Util.decode(map.get("60")), account));

		List<HashMap<String, String>> arr = new ArrayList<>();
		arr.add(protocol);

		List<HashMap<String, Object>> rdata = tradeConn.request(account, data.getFunc(), arr, response);

		if (rdata == null || rdata.isEmpty()) {
			return response;
		}

		String flowId = "";

		try {
			flowId = (String) rdata.get(0).get("200");
		} catch (Exception e) {
			logger.error(RetCode.getDesc(-3301), e);
			return response.setError(-3301);
		}

		try {
			Thread.currentThread().sleep(WAITSECONDS * 1000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

		// data
		protocol.clear();
		protocol.putAll(TradeProtocolUtil.getSetp(6205));   // 查询银行流水
		protocol.replace("200", flowId);

		arr.clear();
		arr.add(protocol);

		rdata = tradeConn.request(account, 6205, arr, response);

		if (rdata != null) {
			return response.setCorrect(rdata);
		}

		return response;
	}

	// 6202 银行转证券(期货)
	@Loggable
	@Validator
	public WsResponse transBankToFuture(HttpServletRequest request, WsRequest data, WsResponse response) {
		String account = data.getAccount();
		HashMap<String, String> map = data.getData().get(0);

		// data
		HashMap<String, String> protocol = new HashMap<>();
		protocol.putAll(TradeProtocolUtil.getSetp(data.getFunc()));
		protocol.replace("60", PoboTradeLib.DesSetPwd(Base64Util.decode(map.get("60")), account));
		protocol.replace("215", map.get("215"));
		protocol.replace("214", map.get("214"));
		protocol.replace("56", map.get("56"));
		protocol.replace("220", map.get("220"));
		protocol.replace("51", account);
		protocol.replace("353", map.get("353"));
		protocol.replace("59", PoboTradeLib.DesSetPwd(Base64Util.decode(map.get("59")), account));

		List<HashMap<String, String>> arr = new ArrayList<>();
		arr.add(protocol);

		List<HashMap<String, Object>> rdata = tradeConn.request(account, data.getFunc(), arr, response);

		if (rdata == null || rdata.isEmpty()) {
			return response;
		}

		String flowId = "";

		try {
			flowId = (String) rdata.get(0).get("200");
		} catch (Exception e) {
			logger.error(RetCode.getDesc(-3301), e);
			return response.setError(-3301);
		}

		try {
			Thread.currentThread().sleep(WAITSECONDS * 1000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

		// data
		protocol.clear();
		protocol.putAll(TradeProtocolUtil.getSetp(6205));
		protocol.replace("200", flowId);

		arr.clear();
		arr.add(protocol);

		rdata = tradeConn.request(account, 6205, arr, response);

		if (rdata != null) {
			return response.setCorrect(rdata);
		}

		return response;
	}

	// 6203 查询银行资金余额
	@Loggable
	@Validator
	public WsResponse queryBankRemain(HttpServletRequest request, WsRequest data, WsResponse response) {
		String account = data.getAccount();
		HashMap<String, String> map = data.getData().get(0);

		// data
		HashMap<String, String> protocol = new HashMap<>();
		protocol.putAll(TradeProtocolUtil.getSetp(data.getFunc()));
		protocol.replace("215", map.get("215"));
		protocol.replace("214", map.get("214"));
		protocol.replace("60", PoboTradeLib.DesSetPwd(Base64Util.decode(map.get("60")), account));
		protocol.replace("56", map.get("56"));
		protocol.replace("51", account);
		protocol.replace("353", map.get("353"));
		protocol.replace("59", PoboTradeLib.DesSetPwd(Base64Util.decode(map.get("59")), account));

		
		
		List<HashMap<String, String>> arr = new ArrayList<>();
		arr.add(protocol);

		List<HashMap<String, Object>> rdata = tradeConn.request(account, data.getFunc(), arr, response);

		if (rdata == null || rdata.isEmpty()) {
			return response;
		}

		String flowId = "";

		try {
			flowId = (String) rdata.get(0).get("200");
		} catch (Exception e) {
			logger.error(RetCode.getDesc(-3301), e);
			return response.setError(-3301);
		}

		try {
			Thread.currentThread().sleep(WAITSECONDS * 1000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

		// data
		protocol.clear();
		protocol.putAll(TradeProtocolUtil.getSetp(6205));
		protocol.replace("200", flowId);

		arr.clear();
		arr.add(protocol);

		rdata = tradeConn.request(account, 6205, arr, response);

		if (rdata != null) {
			return response.setCorrect(rdata);
		}

		return response;
	}


	// 6205 查询银行资金流水
	@Loggable
	@Validator
	public WsResponse queryBankCashFlow(HttpServletRequest request, WsRequest data, WsResponse response) {
		String account = data.getAccount();
		HashMap<String, String> map = data.getData().get(0);

		// data
		HashMap<String, String> protocol = new HashMap<>();
		protocol.putAll(TradeProtocolUtil.getSetp(data.getFunc()));
		protocol.replace("200", map.get("200"));

		List<HashMap<String, String>> arr = new ArrayList<>();
		arr.add(protocol);

		List<HashMap<String, Object>> rdata = tradeConn.request(account, data.getFunc(), arr, response);

		if (rdata != null) {
			Collections.sort(rdata, new Comparator<HashMap<String, Object>>(){
				SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

				private Date getDate(HashMap<String, Object> data) {
					if (data == null || data.get("227") == null || data.get("228") == null) {
						return null;
					}
					String date = data.get("227") + " " + data.get("228");
					try {
						return df.parse(date);
					} catch (ParseException e) {
						e.printStackTrace();
						return null;
					}
				}

				@Override
				public int compare(HashMap<String, Object> o1, HashMap<String, Object> o2) {
					Date d1 = getDate(o1);
					Date d2 = getDate(o2);
					if (d1 == null && d2 == null) {
						return 0;
					}
					if (d1 == null) {
						return -1;
					}
					if (d2 == null) {
						return 1;
					}
					return d1.compareTo(d2);
				}
			});

			return response.setCorrect(rdata);
		}

		return response;
	}
}

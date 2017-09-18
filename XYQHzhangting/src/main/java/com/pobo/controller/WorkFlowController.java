package com.pobo.controller;

import com.apex.crm.wsclient.LbRecord;
import com.apex.crm.wsclient.LbeResult;
import com.apex.crm.wsclient.QueryResult;
import com.pobo.cache.CacheKey;
import com.pobo.interceptor.Loggable;
import com.pobo.interceptor.Validator;
import com.pobo.model.crm.GmCrmAction;
import com.pobo.protocol.TradeProtocolUtil;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;
import com.pobo.service.GmSmsService;
import com.pobo.util.HttpServletRequestUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * Project: GmHall
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/5/27 16:01
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Controller(value = "workFlowController")
public class WorkFlowController extends BaseController {
	@Autowired
	private GmCrmAction crmAction;

	// 2-2101 客户流程办理进度查询
	@Loggable
	@Validator
	public WsResponse queryWorkFlows(HttpServletRequest request, WsRequest data, WsResponse response) {
		String account = data.getAccount();
		HashMap<String, String> map = data.getData().get(0);

		String fromDate = map.get("58");
		String toDate = map.get("59");
		String type = map.get("71");
		//0-审批通过,1-审批不通过,2-未审批
		if (type.equals("0")) {
			//type = "0";
			type = "2";
		} else if (type.equals("1")){
			//type = "0;1;2;3";
			type = "";
		}

		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		Calendar calendar = Calendar.getInstance();
		String today = df.format(calendar.getTime());
		if (toDate == null || toDate.equals("")) {
			toDate = today;
		}
		else
		{
			try {
				Date date = sdf.parse(toDate);
				toDate=df.format(date);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		if (fromDate == null || fromDate.equals("")) {
			try {
				calendar.setTime(df.parse(toDate));
				calendar.add(Calendar.MONTH, -1);
				fromDate = df.format(calendar.getTime());
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		else
		{
			try {
				Date date = sdf.parse(fromDate);
				fromDate=df.format(date);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		//{"body":{"result":[{"SQSJ":"14:21:40","KHH":"1723","SPZT":"2","SQRQ":"2016-12-27","YWMC":"联系方式变更"},{"SQSJ":"14:21:40","KHH":"1723","SPZT":"2","SQRQ":"2016-12-27","YWMC":"通讯地址变更"},{"SQSJ":"14:32:28","KHH":"1723","SPZT":"2","SQRQ":"2016-12-27","YWMC":"联系方式变更"},{"SQSJ":"14:32:28","KHH":"1723","SPZT":"2","SQRQ":"2016-12-27","YWMC":"通讯地址变更"},{"SQSJ":"14:42:04","KHH":"1723","SPZT":"2","SQRQ":"2016-12-27","YWMC":"联系方式变更"},{"SQSJ":"14:42:04","KHH":"1723","SPZT":"2","SQRQ":"2016-12-27","YWMC":"通讯地址变更"}]},"head":{"message":"正常","title":"客户流程办理进度查询","service":"app.406","code":"0"}}
		//{"body":{"result":[]},"head":{"message":"正常","title":"客户流程办理进度查询","service":"app.406","code":"0"}}
		String khlcjdResult=crmAction.getKhlcjd(account, fromDate, toDate, type);
		if(khlcjdResult==null)
		{
			return response.setError(-2003);
		}
		JSONObject jo=JSONObject.fromObject(khlcjdResult);
		List<HashMap<String, Object>> flowInfoList = null;
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
						return response.setCorrect();
					}
					else
					{
						flowInfoList = new ArrayList<>();
						for(int i=0;i<jaResult.size();i++)
						{
							JSONObject joTemp=(JSONObject)jaResult.get(i);
							HashMap<String, Object> info= new HashMap<>();
							String SPZT=joTemp.containsKey("SPZT")?joTemp.get("SPZT").toString():"";
							if(!"".equals(SPZT))
							{
								//0-审批通过,1-审批不通过,2-未审批
								//0-待审批;1-审批中止;2-审批未通过;3-审批通过
								if("0".equals(SPZT))
								{
									SPZT="审批通过";
								}
								else if("1".equals(SPZT))
								{
									SPZT="审批未通过";
								}
								else if("2".equals(SPZT))
								{
									SPZT="待审批";
								}
								else
								{
									SPZT="";
								}
							}
							info.put("21", joTemp.containsKey("KHH")?joTemp.get("KHH").toString():"");//KHH
							info.put("24", joTemp.containsKey("LCBT")?joTemp.get("LCBT").toString():"");//LCBT
							info.put("70", joTemp.containsKey("YWMC")?joTemp.get("YWMC").toString():"");//YWMC
							info.put("58", joTemp.containsKey("SQRQ")?joTemp.get("SQRQ").toString():"");//SQRQ
							info.put("60", joTemp.containsKey("SQSJ")?joTemp.get("SQSJ").toString():"");//SQSJ
							info.put("71", SPZT);//SPZT
							info.put("59", joTemp.containsKey("JSRQ")?joTemp.get("JSRQ").toString():"");//JSRQ
							info.put("61", joTemp.containsKey("JSSJ")?joTemp.get("JSSJ").toString():"");//JSSJ
							info.put("1", joTemp.containsKey("BZ")?joTemp.get("BZ").toString():"");//BZ

							flowInfoList.add(info);
						}
					}
				}
				else
				{
					return response.setError(-2003);
				}
			}
			else
			{
				String errorMsg=head.containsKey("message")?head.get("message").toString():"客户流程办理进度查询错误";
				return response.setError(-2002, errorMsg);
			}
		}
		else
		{
			return response.setError(-2003);
		}
		response.setCorrect(flowInfoList);
		return response;
	}

	// 2-2110 客户联系方式变更
	//{"body":{"result":[]},"head":{"message":"联系方式变更申请成功","title":"联系方式变更申请","service":"app.401","code":"0"}}
	//{"body":{"result":[]},"head":{"message":"您已申请过联系方式变更，正在审批过程中!","title":"联系方式变更申请","service":"app.401","code":"app.401.1"}}
	@Loggable
	@Validator
	public WsResponse doUpdatePhoneNo(HttpServletRequest request, WsRequest data, WsResponse response) {
		String account = data.getAccount();
		String token = data.getToken();
		HashMap<String, String> map = data.getData().get(0);

		String newPhoneNo = map.get("73");
		String captcha = map.get("16");

		if (StringUtils.isEmpty(captcha)) {
			return response.setError(-1103);
		}

		// 手机验证码校验
		if (!GmSmsService.checkSmsCaptcha(token, captcha)) {
			return response.setError(-1104);
		}

		String ip = HttpServletRequestUtil.getClientIP(request);
		String mac = "00-00-00-00-00-00";
		String khlxfsbgsqResult=crmAction.doWorkKhlxfsbgsq(account, newPhoneNo, ip, mac);
		if(khlxfsbgsqResult==null)
		{
			return response.setError(-2003);
		}
		JSONObject jo=JSONObject.fromObject(khlxfsbgsqResult);
		if(jo.containsKey("head"))
		{
			JSONObject head=(JSONObject)jo.get("head");
			if("0".equals(head.get("code")))
			{
				return response.setCorrect();
			}
			else
			{
				String errorMsg=head.containsKey("message")?head.get("message").toString():"客户联系方式变更失败";
				return response.setError(-2002, errorMsg);
			}
		}
		else
		{
			return response.setError(-2003);
		}
	}

	// 2-2111 客户通讯地址变更
	@Loggable
	@Validator
	public WsResponse doUpdateAddr(HttpServletRequest request, WsRequest data, WsResponse response) {
		String account = data.getAccount();
		String token = data.getToken();
		HashMap<String, String> map = data.getData().get(0);

		String newAddr = map.get("73");
		String captcha = map.get("16");

		if (StringUtils.isEmpty(captcha)) {
			return response.setError(-1103);
		}

		// 手机验证码校验
		if (!GmSmsService.checkSmsCaptcha(token, captcha)) {
			return response.setError(-1104);
		}

		String ip = HttpServletRequestUtil.getClientIP(request);
		String mac = "00-00-00-00-00-00";
		String khtxdzbgsqResult=crmAction.doWorkKhtxdzbgsq(account, newAddr, ip, mac);
		if(khtxdzbgsqResult==null)
		{
			return response.setError(-2003);
		}
		JSONObject jo=JSONObject.fromObject(khtxdzbgsqResult);
		if(jo.containsKey("head"))
		{
			JSONObject head=(JSONObject)jo.get("head");
			if("0".equals(head.get("code")))
			{
				return response.setCorrect();
			}
			else
			{
				String errorMsg=head.containsKey("message")?head.get("message").toString():"客户通讯地址变更失败";
				return response.setError(-2002, errorMsg);
			}
		}
		else
		{
			return response.setError(-2003);
		}
	}

	// 2-2112 客户交易系统切换
	@Loggable
	@Validator
	public WsResponse doUpdateSystem(HttpServletRequest request, WsRequest data, WsResponse response) {
		String account = data.getAccount();
		String token = data.getToken();
		HashMap<String, String> map = data.getData().get(0);

		String newSys = map.get("75");
		String captcha = map.get("16");

		if (StringUtils.isEmpty(captcha)) {
			return response.setError(-1103);
		}

		// 手机验证码校验
		if (!GmSmsService.checkSmsCaptcha(token, captcha)) {
			return response.setError(-1104);
		}

		String ip = HttpServletRequestUtil.getClientIP(request);
		String mac = "00-00-00-00-00-00";
		String khjyxtqhsqResult=crmAction.doWorkKhjyxtqhsq(account, newSys, ip, mac);
		if(khjyxtqhsqResult==null)
		{
			return response.setError(-2003);
		}
		JSONObject jo=JSONObject.fromObject(khjyxtqhsqResult);
		if(jo.containsKey("head"))
		{
			JSONObject head=(JSONObject)jo.get("head");
			if("0".equals(head.get("code")))
			{
				return response.setCorrect();
			}
			else
			{
				String errorMsg=head.containsKey("message")?head.get("message").toString():"客户交易系统切换失败";
				return response.setError(-2002, errorMsg);
			}
		}
		else
		{
			return response.setError(-2003);
		}
	}

	// 2-2113 客户激活休眠账户
	@Loggable
	@Validator
	public WsResponse doActiveAccount(HttpServletRequest request, WsRequest data, WsResponse response) {
		String account = data.getAccount();
		String token = data.getToken();
		HashMap<String, String> map = data.getData().get(0);

		String captcha = map.get("16");

		if (StringUtils.isEmpty(captcha)) {
			return response.setError(-1103);
		}

		// 手机验证码校验
		if (!GmSmsService.checkSmsCaptcha(token, captcha)) {
			return response.setError(-1104);
		}

		String ip = HttpServletRequestUtil.getClientIP(request);
		String mac = "00-00-00-00-00-00";

		// 验证账号是否可激活
		WsResponse ckResponse = checkActiveAccount(request, data, response);
		if (ckResponse.getRetHead() != 1)
			return response;
		String khjhsqResult=crmAction.doWorkKhjhsq(account, ip, mac);
		if(khjhsqResult==null)
		{
			return response.setError(-2003);
		}
		JSONObject jo=JSONObject.fromObject(khjhsqResult);
		if(jo.containsKey("head"))
		{
			JSONObject head=(JSONObject)jo.get("head");
			if("0".equals(head.get("code")))
			{
				return response.setCorrect();
			}
			else
			{
				String errorMsg=head.containsKey("message")?head.get("message").toString():"客户激活休眠账户错误";
				return response.setError(-2002, errorMsg);
			}
		}
		else
		{
			return response.setError(-2003);
		}
	}

	// 2-2131 验证客户激活休眠账户权限
	@Validator
	@Loggable
	public WsResponse checkActiveAccount(HttpServletRequest request, WsRequest data, WsResponse response) {
		String account = data.getAccount();
		HashMap<String, String> map = data.getData().get(0);

        /* 校验客户当前可激活状态 */
		List<Object> record;
		if (!userCacheManager.isExist(account, CacheKey.CRM_USER_INFO)) {
			//crmAction.getKhxx(account);
			QueryResult result = null;
			if (result == null) {
				return response.setError(-2003);
			}

			if (result.getCount() == 0 || result.getRecords().size() == 0) {
				return response.setError(-2104);
			}
			if (result.getResult() != 1) {
				return response.setError(-2002, result.getMessage());
			}
			record = new ArrayList<>();
			record.addAll(result.getRecords().get(0).getValues());
			userCacheManager.add(account, CacheKey.CRM_USER_INFO, record);
		} else {
			record = (List<Object>) userCacheManager.get(account, CacheKey.CRM_USER_INFO);
		}

		if ("3".equals(record.get(16)) || "4".equals(record.get(16))) {
			return response.setError(-2103);
		}

		/* 进行激活客户审核流程校验 */
		String ip = HttpServletRequestUtil.getClientIP(request);
		String mac = "00-00-00-00-00-00";
		//crmAction.checkWorkKhjhsq(account, ip, mac);
		//LbeResult result2 = null;

		//if (result2 == null) {
		//	return response.setError(-2002);
		//}

		//if (result2.getResult() != 1) {
		//	return response.setError(-2002, result2.getMessage());
		//}

		/* 校验通过后且客户实时可用资金大于1001元，才可发起客户激活申请流程 */
		// data
		HashMap<String, String> protocol = new HashMap<>();
		protocol.putAll(TradeProtocolUtil.getSetp(6012));
		protocol.replace("347", "1");

		List<HashMap<String, String>> arr = new ArrayList<>();
		arr.add(protocol);

		List<HashMap<String, Object>> rdata = tradeConn.request(account, 6012, arr, response);

		double availCapital = Double.parseDouble((String) rdata.get(0).get("93"));

		// 客户实时可用资金小于1001元
		if (availCapital < 1001) {
			return response.setError(-2101);
		}

		/* 校验验证账户股东账号，无中金所账号才可发起客户激活申请流程 */
		protocol.clear();
		arr.clear();
		arr.add(protocol);
		rdata.clear();
		rdata = tradeConn.request(account, 6040, arr, response);

		for (HashMap<String, Object> r : rdata) {
			if ("CFFEX".equals(r.get("54"))) {
				return response.setError(-2105);
			}
		}

		return response.setCorrect();
	}

	// 2-2114 客户身份证有效期变更
	@Loggable
	@Validator
	public WsResponse doUpdateIdDate(HttpServletRequest request, WsRequest data, WsResponse response) {
		String account = data.getAccount();
		String token = data.getToken();
		HashMap<String, String> map = data.getData().get(0);

		String fromDate = map.get("52");
		String toDate = map.get("53");
		String idFntImg = map.get("81");
		String idBckImg = map.get("82");
		String fntFileName = map.get("83");
		String bckFileName = map.get("84");
		String captcha = map.get("16");

		if (StringUtils.isEmpty(captcha)) {
			return response.setError(-1103);
		}

		// 手机验证码校验
		if (!GmSmsService.checkSmsCaptcha(token, captcha)) {
			return response.setError(-1104);
		}

		if (idFntImg == null || idFntImg.isEmpty() || idBckImg == null || idBckImg.isEmpty()) {
			return response.setError(-2013);
		}
		if (fntFileName == null || fntFileName.isEmpty() || bckFileName == null || bckFileName.isEmpty()) {
			return response.setError(-2012);
		}

		String ip = HttpServletRequestUtil.getClientIP(request);
		String mac = "00-00-00-00-00-00";

		String newDate = fromDate + "至" + toDate;
		String khsfzyxqbgsqResult=crmAction.doWorkKhsfzyxqbgsq(account, newDate, fntFileName, bckFileName, idFntImg, idBckImg, ip, mac);
		if(khsfzyxqbgsqResult==null)
		{
			return response.setError(-2003);
		}
		JSONObject jo=JSONObject.fromObject(khsfzyxqbgsqResult);
		if(jo.containsKey("head"))
		{
			JSONObject head=(JSONObject)jo.get("head");
			if("0".equals(head.get("code")))
			{
				return response.setCorrect();
			}
			else
			{
				String errorMsg=head.containsKey("message")?head.get("message").toString():"客户身份证有效期变更错误";
				return response.setError(-2002, errorMsg);
			}
		}
		else
		{
			return response.setError(-2003);
		}
	}

	// 2-2117 验证客户密码重置
	@Loggable
	public WsResponse checkResetPassword(HttpServletRequest request, WsRequest data, WsResponse response) {
		String account = data.getAccount();
		HashMap<String, String> map = data.getData().get(0);

		String phone = map.get("30");
		String name = map.get("24");

		List<Object> record;
		if (!userCacheManager.isExist(account, CacheKey.CRM_USER_INFO)) {
			//crmAction.getKhxx(account);
			QueryResult result = null;
			if (result == null) {
				return response.setError(-2003);
			}

			if (result.getCount() == 0 || result.getRecords().size() == 0) {
				return response.setError(-2104);
			}
			if (result.getResult() != 1) {
				return response.setError(-2002, result.getMessage());
			}
			record = new ArrayList<>();
			record.addAll(result.getRecords().get(0).getValues());
			userCacheManager.add(account, CacheKey.CRM_USER_INFO, record);
		} else {
			record = (List<Object>) userCacheManager.get(account, CacheKey.CRM_USER_INFO);
		}

		if (phone.equals(record.get(10)) && name.equals(record.get(2))) {
			return response.setCorrect();
		} else {
			return response.setError(-2102);
		}
	}

	// 2-2115 客户密码重置
	@Loggable
	public WsResponse doResetPassword(HttpServletRequest request, WsRequest data, WsResponse response) {
		String account = data.getAccount();
		String token = data.getToken();
		HashMap<String, String> map = data.getData().get(0);

		List<HashMap<String, String>> list = data.getData();
		if (list == null || list.isEmpty()) {
			return response.setError(-105);
		}

		String type = map.get("74");
		String idFntImg = map.get("81");
		String idBckImg = map.get("82");
		String fntFileName = map.get("83");
		String bckFileName = map.get("84");
		String captcha = map.get("16");

		if (StringUtils.isEmpty(captcha)) {
			return response.setError(-1103);
		}

		// 手机验证码校验
		if (!GmSmsService.checkSmsCaptcha(token, captcha)) {
			return response.setError(-1104);
		}

		if (idFntImg == null || idFntImg.isEmpty() || idBckImg == null || idBckImg.isEmpty()) {
			return response.setError(-2013);
		}
		if (fntFileName == null || fntFileName.isEmpty() || bckFileName == null || bckFileName.isEmpty()) {
			return response.setError(-2012);
		}

		String ip = HttpServletRequestUtil.getClientIP(request);
		String mac = "00-00-00-00-00-00";
		//crmAction.doWorkKhmmczsq(account, type, fntFileName, bckFileName, idFntImg, idBckImg, ip, mac);
		LbeResult result = null;

		if (result == null) {
			return response.setError(-2003);
		}

		if (result.getResult() != 1) {
			return response.setError(-2002, result.getMessage());
		} else {
			return response.setCorrect();
		}
	}

	// 2-2130 客户保底限制取消
	@Validator
	@Loggable
	public WsResponse doCancelDepositLimit(HttpServletRequest request, WsRequest data, WsResponse response) {
		String account = data.getAccount();
		String token = data.getToken();
		HashMap<String, String> map = data.getData().get(0);
		String captcha = map.get("16");

		// 手机验证码校验
		if (!GmSmsService.checkSmsCaptcha(token, captcha)) {
			return response.setError(-1104);
		}

		String ip = HttpServletRequestUtil.getClientIP(request);
		String mac = "00-00-00-00-00-00";

		WsResponse ckResponse = checkCancelDepositLimit(request, data, response);
		if (ckResponse.getRetHead() != 1)
			return ckResponse;
		//crmAction.doWorkBdxzqxsq(account, ip, mac);
		LbeResult result = null;

		if (result == null) {
			return response.setError(-2003);
		}

		if (result.getResult() != 1) {
			return response.setError(-2002, result.getMessage());
		} else {
			return response.setCorrect();
		}
	}

	// 2-2131 验证客户保底限制取消
	@Validator
	@Loggable
	public WsResponse checkCancelDepositLimit(HttpServletRequest request, WsRequest data, WsResponse response) {
		String account = data.getAccount();
		HashMap<String, String> map = data.getData().get(0);

		/* 查今日成交 */
		// data
		HashMap<String, String> protocol = new HashMap<>();
		protocol.putAll(TradeProtocolUtil.getSetp(data.getFunc()));

		List<HashMap<String, String>> arr = new ArrayList<>();
		arr.add(protocol);

		List<HashMap<String, Object>> rdata = tradeConn.request(account, 6013, arr, response);

		if (rdata != null && !rdata.isEmpty()) {
			return response.setError(-2201);
		}

		/* 查当前持仓 */
		// data
		protocol.clear();
		protocol.putAll(TradeProtocolUtil.getSetp(data.getFunc()));

		arr.clear();
		arr.add(protocol);

		rdata = tradeConn.request(account, 6014, arr, response);

		if (rdata != null && !rdata.isEmpty()) {
			return response.setError(-2202);
		}

		return response.setCorrect();
	}
}

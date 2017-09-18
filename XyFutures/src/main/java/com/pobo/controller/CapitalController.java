package com.pobo.controller;

import com.apex.crm.wsclient.LbRecord;
import com.apex.crm.wsclient.QueryResult;
import com.pobo.interceptor.Loggable;
import com.pobo.interceptor.Validator;
import com.pobo.model.crm.GmCrmAction;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
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
 * Create Date: 2016/5/27 16:12
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Controller(value = "capitalController")
public class CapitalController extends BaseController {
	@Autowired
	private GmCrmAction crmAction;

	// 6012 查当日资金
	@Loggable
	@Validator
	public WsResponse queryDayCapital(HttpServletRequest request, WsRequest data, WsResponse response) {
		return tradeDoNothing(data, response);
	}

	// 2-3001 客户资金明细查询
	@Loggable
	@Validator
	public WsResponse queryCapitalDetails(HttpServletRequest request, WsRequest data, WsResponse response) {
		String account = data.getAccount();
		HashMap<String, String> map = data.getData().get(0);

		String days = map.get("49");

		if (Integer.valueOf(days) > 4) {
			return response.setError(-3302);
		}

		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");

		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DATE, 0 - Integer.valueOf(days));
		String toDate = df.format(new Date());
		String fromDate = df.format(calendar.getTime());
		String khcrjmxResult=crmAction.getKhcrjmx(account, fromDate, toDate);//
		if(khcrjmxResult==null)
		{
			return response.setError(-2003);
		}
		JSONObject jo=JSONObject.fromObject(khcrjmxResult);
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
							info.put("21", joTemp.containsKey("KHH")?joTemp.get("KHH").toString():"");
							info.put("50", joTemp.containsKey("RQ")?joTemp.get("RQ").toString():"");
							info.put("51", joTemp.containsKey("FSSJ")?joTemp.get("FSSJ").toString():"");
							info.put("90", joTemp.containsKey("SRJE")?joTemp.get("SRJE").toString():"");
							info.put("91", joTemp.containsKey("FCJE")?joTemp.get("FCJE").toString():"");
							info.put("92", joTemp.containsKey("YHMC")?joTemp.get("YHMC").toString():"");
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
				String errorMsg=head.containsKey("message")?head.get("message").toString():"客户资金明细查询错误";
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
}

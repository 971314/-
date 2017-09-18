package com.pobo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import net.sf.json.JSONObject;
import com.pobo.constant.OperationLogType;
import com.pobo.dao.mapper.CustomerMapper;
import com.pobo.dao.mapper.LoggerMapper;
import com.pobo.model.CustomerInfo;
import com.pobo.model.CustomerInfoShort;
import com.pobo.model.CustomerLog;
import com.pobo.model.CustomerQueryParameters;
import com.pobo.model.GetOpetationLog;
import com.pobo.model.LogParameters;
import com.pobo.model.OperationLog;
import com.pobo.protocol.WsRequest;


@Controller
public class CustomerController {
	@Autowired
	CustomerMapper customerMapper;
	@Autowired
	LoggerMapper loggermapper;
	public List<CustomerInfoShort> GetPageList(CustomerQueryParameters cqp)
	{
		return customerMapper.GetPageList(cqp);
	}
	
	public int GetPageTotalCount(CustomerQueryParameters cqp)
	{
		return customerMapper.GetPageTotalCount(cqp);
	}
	@Transactional
	public int UpdateCustomerInfo(WsRequest wr)
	{
		int uid=wr.getUid();
		HashMap<String,String> map=wr.getData().get(0);
		int ret=customerMapper.UpdateCustomerInfo(map);
		if(ret==0)
		{
			throw new RuntimeException();	
		}
		OperationLog ol=new OperationLog();
		ol.setC_AdminId(String.valueOf(uid));
		ol.setC_CustomerId(map.get("id"));
		ol.setC_LogContent(JSONObject.fromObject(map).toString());
		ol.setC_LogType(OperationLogType.CustomerLog);
		ret=loggermapper.WriteLog(ol);
		map=null;
		if(ret==0)
		{
			throw new RuntimeException();	
		}
		return ret;
	}

	public CustomerInfo GetCustomInfo(WsRequest wr)
	{
		HashMap<String,String> map=wr.getData().get(0);
		CustomerInfo result=customerMapper.GetCustomerInfo(map.get("id").trim());
		map=null;
		return result;
	}

	public List<GetOpetationLog> GetCustomerRecords(LogParameters lp)
	{
		return loggermapper.GetLog(lp);
	}
}

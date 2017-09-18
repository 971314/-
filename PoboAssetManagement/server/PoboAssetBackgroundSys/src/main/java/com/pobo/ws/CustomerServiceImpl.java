package com.pobo.ws;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.pobo.constant.OperationLogType;
import com.pobo.constant.ParameterTranslator;
import com.pobo.controller.AdminController;
import com.pobo.controller.CustomerController;
import com.pobo.model.CustomerInfo;
import com.pobo.model.CustomerLog;
import com.pobo.model.CustomerQueryParameters;
import com.pobo.model.GetOpetationLog;
import com.pobo.model.LogParameters;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;
import com.pobo.utils.DateUtil;
import com.pobo.utils.LogUtil;
@Component(value = "customerService")
public class CustomerServiceImpl implements CustomerService {
	@Autowired
	CustomerController customercontroller=new CustomerController();
	@Override
	public WsResponse GetList(HttpServletRequest request, HttpServletResponse response, WsRequest wr) throws Exception {
		// TODO Auto-generated method stub
		HashMap<String,String> map=wr.getData().get(0);
		CustomerQueryParameters cqp=new CustomerQueryParameters();
		if(map.containsKey("name"))
		{
			cqp.setC_CustomerName(map.get("name").trim());
		}
		if(map.containsKey("phone"))
		{
			cqp.setC_PhoneNum(map.get("phone").trim());
		}
		if(map.containsKey("riskevaluation"))
		{
			cqp.setC_RiskEvaluation(Integer.parseInt(map.get("riskevaluation").trim()));
		}
		cqp.setCurrentPageIndex((Integer.parseInt(map.get("currentindex").trim())-1)*Integer.parseInt(map.get("pagecount").trim()));
		cqp.setRowsPerPage(Integer.parseInt(map.get("pagecount").trim()));
		if(map.containsKey("orderfield"))
		{
			cqp.setOrderField(ParameterTranslator.getRealParameter(map.get("orderfield").trim().toLowerCase()));
		}
		if(map.containsKey("ordertype"))
		{
			cqp.setOrderType(ParameterTranslator.getRealParameter(map.get("ordertype").trim().toLowerCase()));
		}
		WsResponse r = new WsResponse();
		List<HashMap<String, Object>> rdata = new ArrayList<>();
		HashMap<String, Object> rmap = new HashMap<>();
		rmap.put("customers", customercontroller.GetPageList(cqp));
		rmap.put("totalCount", customercontroller.GetPageTotalCount(cqp));
		rdata.add(rmap);
		r.setCorrect(rdata);
		map=null;
		return r;
	}

	@Override
	public WsResponse GetRecords(HttpServletRequest request, HttpServletResponse response, WsRequest wr)
			throws Exception {
		LogParameters lp=new LogParameters();
		lp.setLogtype(OperationLogType.CustomerLog);
		lp.setCustomerid(wr.getData().get(0).get("id").trim());
		List<GetOpetationLog> list=customercontroller.GetCustomerRecords(lp);
		List<HashMap<String,String>> listMap=LogUtil.LogGenerator(list);
		list=null;
		WsResponse r = new WsResponse();
		List<HashMap<String, Object>> rdata = new ArrayList<>();
		HashMap<String, Object> rmap = new HashMap<>();
		rmap.put("records", listMap);
		rdata.add(rmap);
		r.setCorrect(rdata);
		return r;
	}

	@Override
	public WsResponse ChangeInfo(HttpServletRequest request, HttpServletResponse response, WsRequest wr)
			throws Exception {
		int count=0;
		try
		{
			count=customercontroller.UpdateCustomerInfo(wr);
		}
		catch(Exception e)
		{
			
		}
		String currentTime=null;
		if(count==1)
		{
			CustomerInfo ci=customercontroller.GetCustomInfo(wr);
			currentTime=ci.getTime();
		}
		WsResponse r = new WsResponse();
		List<HashMap<String, Object>> rdata = new ArrayList<>();
		HashMap<String, Object> rmap = new HashMap<>();
		rmap.put("update", count);
		rmap.put("modifytime", currentTime);
		rdata.add(rmap);
		r.setCorrect(rdata);
		return r;
	}

	@Override
	public WsResponse GetInfo(HttpServletRequest request, HttpServletResponse response, WsRequest wr) throws Exception {
		WsResponse r = new WsResponse();
		List<HashMap<String, Object>> rdata = new ArrayList<>();
		HashMap<String, Object> rmap = new HashMap<>();
		rmap.put("customer", customercontroller.GetCustomInfo(wr));
		rdata.add(rmap);
		r.setCorrect(rdata);
		return r;
	}

}

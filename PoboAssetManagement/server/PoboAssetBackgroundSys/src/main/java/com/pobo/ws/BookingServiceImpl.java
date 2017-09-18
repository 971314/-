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
import com.pobo.controller.BookingController;
import com.pobo.model.BookingQueryParameters;
import com.pobo.model.CustomerInfo;
import com.pobo.model.CustomerQueryParameters;
import com.pobo.model.GetOpetationLog;
import com.pobo.model.LogParameters;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;
import com.pobo.utils.LogUtil;
@Component(value = "bookingService")
public class BookingServiceImpl implements BookingService {
	@Autowired
	BookingController bookingcontroller=new BookingController();
	@Override
	public WsResponse GetList(HttpServletRequest request, HttpServletResponse response, WsRequest wr) throws Exception {
		HashMap<String,String> map=wr.getData().get(0);
		BookingQueryParameters bqp=new BookingQueryParameters();
		if(map.containsKey("name"))
		{
			bqp.setC_CustomerName(map.get("name").trim());
		}
		if(map.containsKey("phone"))
		{
			bqp.setC_PhoneNum(map.get("phone").trim());
		}
		if(map.containsKey("status"))
		{
			bqp.setC_Status(Integer.parseInt(map.get("status").trim()));
		}
		if(map.containsKey("risklevel"))
		{
			bqp.setC_RiskLevel(Integer.parseInt(map.get("risklevel").trim()));
		}
		bqp.setCurrentPageIndex((Integer.parseInt(map.get("currentindex").trim())-1)*Integer.parseInt(map.get("pagecount").trim()));
		bqp.setRowsPerPage(Integer.parseInt(map.get("pagecount").trim()));
		if(map.containsKey("orderfield"))
		{
			bqp.setOrderField(map.get("orderfield").trim().toLowerCase());
		}
		if(map.containsKey("ordertype"))
		{
			bqp.setOrderType(ParameterTranslator.getRealParameter(map.get("ordertype").trim().toLowerCase()));
		}
		WsResponse r = new WsResponse();
		List<HashMap<String, Object>> rdata = new ArrayList<>();
		HashMap<String, Object> rmap = new HashMap<>();
		rmap.put("list", bookingcontroller.GetPageList(bqp));
		rmap.put("totalCount", bookingcontroller.GetPageTotalCount(bqp));
		rdata.add(rmap);
		r.setCorrect(rdata);
		map=null;
		return r;
	}
	@Override
	public WsResponse ChangeStatus(HttpServletRequest request, HttpServletResponse response, WsRequest wr)
			throws Exception {
		int count=0;
		try
		{
			count=bookingcontroller.UpdateBookingStatus(request, response, wr);
		}
		catch(Exception e)
		{
			
		}
		WsResponse r = new WsResponse();
		List<HashMap<String, Object>> rdata = new ArrayList<>();
		HashMap<String, Object> rmap = new HashMap<>();
		rmap.put("update", count);
		rdata.add(rmap);
		r.setCorrect(rdata);
		return r;
	}
	@Override
	public WsResponse GetStatusRecords(HttpServletRequest request, HttpServletResponse response, WsRequest wr)
			throws Exception {
		LogParameters lp=new LogParameters();
		lp.setLogtype(OperationLogType.BookingLog);
		lp.setBookingid(wr.getData().get(0).get("id").trim());
		List<GetOpetationLog> list=bookingcontroller.GetBookingRecords(lp);
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

	
}

package com.pobo.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import net.sf.json.JSONObject;
import com.pobo.constant.OperationLogType;
import com.pobo.dao.mapper.BookingMapper;
import com.pobo.dao.mapper.LoggerMapper;
import com.pobo.model.BookingInfo;
import com.pobo.model.BookingQueryParameters;
import com.pobo.model.GetOpetationLog;
import com.pobo.model.LogParameters;
import com.pobo.model.OperationLog;
import com.pobo.protocol.WsRequest;
import com.pobo.utils.HttpServletRequestUtil;

@Controller
public class BookingController {
	@Autowired
	BookingMapper bookingmapper;
	@Autowired
	LoggerMapper loggermapper;
	public List<BookingInfo> GetPageList(BookingQueryParameters bqp)
	{
		return bookingmapper.GetPageList(bqp);
	}
	
	public int GetPageTotalCount(BookingQueryParameters bqp)
	{
		return bookingmapper.GetPageTotalCount(bqp);
	}
	@Transactional
	public int UpdateBookingStatus(HttpServletRequest request, HttpServletResponse response, WsRequest wr)
	{
		int uid=wr.getUid();
		HashMap<String,String> map=wr.getData().get(0);
		int ret=bookingmapper.UpdateBookingStatus(map);
		if(ret==0)
		{
			throw new RuntimeException();	
		}
		OperationLog ol=new OperationLog();
		ol.setC_AdminId(String.valueOf(uid));
		ol.setC_BookingId(map.get("id"));
		ol.setC_LogContent(JSONObject.fromObject(map).toString());
		ol.setC_IP(HttpServletRequestUtil.getClientIP(request));
		ol.setC_LogType(OperationLogType.BookingLog);
		ret=loggermapper.WriteLog(ol);
		map=null;
		if(ret==0)
		{
			throw new RuntimeException();	
		}
		return ret;
	}

	public List<GetOpetationLog> GetBookingRecords(LogParameters lp) {
		return loggermapper.GetLog(lp);
	}
}

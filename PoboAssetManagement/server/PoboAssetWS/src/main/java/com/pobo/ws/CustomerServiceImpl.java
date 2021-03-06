package com.pobo.ws;

import com.pobo.controller.CustomerController;
import com.pobo.exception.AmException;
import com.pobo.interceptor.AuthCheck;
import com.pobo.interceptor.Loggable;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

/**
 * Project: PoboAssetWS
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-10-28 17:49
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Service(value = "customerService")
public class CustomerServiceImpl implements ICustomerService {
	@Autowired
	private CustomerController customerController;

	@Override
	@AuthCheck
	@Loggable
	public WsResponse login(HttpServletRequest request, WsRequest data) {
		WsResponse response = new WsResponse(request.getRequestURI());
		try {
			customerController.login(data, response);
		} catch (AmException e) {
			return response.setError(e.getErrCode());
		}
		return response;
	}

	@Override
	@AuthCheck
	@Loggable
	public WsResponse register(HttpServletRequest request, WsRequest data) {
		WsResponse response = new WsResponse(request.getRequestURI());

		try {
			customerController.register(data, response, request);
		} catch (AmException e) {
			return response.setError(e.getErrCode());
		}

		return response;
	}

	@Override
	@AuthCheck
	@Loggable
	public WsResponse submitRisk(HttpServletRequest request, WsRequest data) {
		WsResponse response = new WsResponse(request.getRequestURI());

		try {
			customerController.submitRisk(data, response, request);
		} catch (AmException e) {
			return response.setError(e.getErrCode());
		}
		return response;
	}
}

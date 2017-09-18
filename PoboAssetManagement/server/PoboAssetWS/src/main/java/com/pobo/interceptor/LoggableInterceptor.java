package com.pobo.interceptor;

import com.pobo.exception.AmException;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;
import com.pobo.utils.HttpServletRequestUtil;
import org.apache.logging.log4j.core.config.Order;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

/**
 * Project: PoboAssetWS
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/6/12 18:29
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Aspect
@Order(1)
@Component
public class LoggableInterceptor {
	private static int MAX_LENGTH = 500;

	protected Logger logger = LoggerFactory.getLogger(getClass());

	@Pointcut("execution(* com.pobo.ws..*(..)) && @annotation(com.pobo.interceptor.Loggable)")
	private void doLogAction() {
	}

	// WebService Interface 日志
	@Around("doLogAction()")
	public WsResponse aroundLogActionArgs(ProceedingJoinPoint pjp) throws Throwable {
		Object[] args = pjp.getArgs();

		HttpServletRequest request;
		WsRequest data;
		try {
			request = (HttpServletRequest) args[0];
			data = (WsRequest) args[1];
		} catch (Exception e) {
			throw new AmException(-11, e.getMessage());
		}

		logger.info("前端请求接口: [{}], IP: [{}]",
				request.getRequestURI(), HttpServletRequestUtil.getClientIP(request));

		// 避免输出日志过长，阻塞前端请求
		if (data.toString().length() > MAX_LENGTH) {
			logger.info("前端请求数据: [{}]……", data.toString().substring(0, MAX_LENGTH));
		} else {
			logger.info("前端请求数据: [{}]", data.toString());
		}

		WsResponse value;
		try {
			value = (WsResponse) pjp.proceed();
		} catch (Exception e) {
			throw new AmException(-12, e.getMessage());
		}

		// 避免输出日志过长，阻塞前端请求
		if (value.toString().length() > MAX_LENGTH) {
			logger.info("返回前端数据: [{}]……", value.toString().substring(0, MAX_LENGTH));
		} else {
			logger.info("返回前端数据: [{}]", value.toString());
		}

		return value;
	}
}

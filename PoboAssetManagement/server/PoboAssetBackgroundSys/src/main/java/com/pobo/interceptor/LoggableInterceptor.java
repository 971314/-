package com.pobo.interceptor;

import com.pobo.exception.AmException;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;
import org.apache.logging.log4j.core.config.Order;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * Project: PoboAssetBackgroundSys
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
	protected Logger logger = LoggerFactory.getLogger(getClass());

	@Pointcut("execution(* com.pobo.controller..*(..)) && @annotation(com.pobo.interceptor.Loggable)")
	private void doLogAction() {
	}

	// Controller 日志
	@Around("doLogAction()")
	public WsResponse aroundLogActionArgs(ProceedingJoinPoint pjp) throws Throwable {
		Object[] args = pjp.getArgs();

		if (args.length != 3) {
			throw new AmException("系统内参数传递错误");
		}

		WsRequest data = (WsRequest) args[1];

		//int type = data.getType();
		//int func = data.getFunc();
		logger.info("前端请求数据： [{}]", data.toString());
		
		WsResponse value = (WsResponse) pjp.proceed();

		logger.info("返回前端数据: [{}]", value);
		return value;
	}
}

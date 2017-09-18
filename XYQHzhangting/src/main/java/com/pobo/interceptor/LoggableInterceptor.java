package com.pobo.interceptor;

import com.apex.crm.wsclient.LbeResult;
import com.pobo.constant.FuncCode;
import com.pobo.constant.RetCode;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;
import com.pobo.util.PasswordCoverUtil;
import org.apache.logging.log4j.core.config.Order;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * Project: GmHall
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
	private static ObjectMapper om = new ObjectMapper();

	@Pointcut("execution(* com.pobo.controller..*(..)) && @annotation(com.pobo.interceptor.Loggable)")
	private void doLogAction() {
	}

	// Controller 日志
	@Around("doLogAction()")
	public WsResponse aroundLogActionArgs(ProceedingJoinPoint pjp) {
		Object[] args = pjp.getArgs();

		if (args.length != 3) {
			logger.error("系统内参数传递错误");
			return new WsResponse(-104, "系统内参数传递错误");
		}

		WsRequest data = (WsRequest) args[1];

		int type = data.getType();
		int func = data.getFunc();
		logger.info("[{}-{}] [{}] 开始", type, func, FuncCode.getDesc(type, func));

		WsResponse value = null;
		try {
			value = (WsResponse) pjp.proceed();
		} catch (Throwable e) {
			logger.error(RetCode.getDesc(-12), e);
		}

		logger.info("返回前端数据: {}", value);
		logger.info("[{}-{}] [{}] 结束", type, func, FuncCode.getDesc(type, func));
		return value;
	}


	/*// CRM 日志
	@Around("execution(public * com.pobo.model.crm.GmCrmAction.*(..))")
	public LbeResult afterCrmLogAction(ProceedingJoinPoint pjp) {
		LbeResult result = null;
		try {
			result = (LbeResult) pjp.proceed();
		} catch (Throwable e) {
			e.printStackTrace();
		}

		if (result != null) {
			logger.info("CRM 返回码: [{}], 返回信息: [{}]", result.getResult(), result.getMessage());
		}

		return result;
	}*/

	// TradeConn 日志
	@Around("execution(public * com.pobo.model.trade.TradeConn.send(..))")
	public String aroundTradeConnAction(ProceedingJoinPoint pjp) {
		Object[] args = pjp.getArgs();

		/* 密码隐藏 */
		String json = String.valueOf(args[0]);
		JsonNode jn = null;
		try {
			jn = om.readTree(json);
			if (jn != null) {
				int func = jn.get("func").asInt();
				if (PasswordCoverUtil.funcHasPwd.contains(func)) {
					jn = PasswordCoverUtil.coverPassword(jn);
				}
				logger.info("交易请求数据: [{}]", om.writeValueAsString(jn));
			}
		} catch (IOException e) {
			logger.error(RetCode.getDesc(-11), e);
		}

		String result = null;
		try {
			result = (String) pjp.proceed();
		} catch (Throwable e) {
			logger.error(RetCode.getDesc(-12), e);
		}

		logger.info("交易返回数据: [{}]", result);
		return result;
	}
}

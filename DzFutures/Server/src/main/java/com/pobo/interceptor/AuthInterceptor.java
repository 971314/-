package com.pobo.interceptor;

import com.pobo.exception.DzException;
import com.pobo.model.auth.PoboAuthAction;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Project: DzFutures
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-8-29 20:28
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Aspect
@Component
public class AuthInterceptor {
	@Autowired
	private PoboAuthAction poboAuth;

	@Pointcut("execution(* com.pobo.controller..*(..)) && @annotation(com.pobo.interceptor.AuthCheck)")
	private void checkAuthAction() {
	}


	@Around("checkAuthAction()")
	public WsResponse aroundCheckAuth(ProceedingJoinPoint pjp) {
		Object[] args = pjp.getArgs();

		WsRequest data = (WsRequest) args[1];

		String account = data.getAccount();
		String token = data.getToken();

		/* 校验 token */
		boolean expected = poboAuth.checkToken(account, token);
		if (!expected) {
			throw new DzException("用户登录校验失败");
		}

		WsResponse value = null;
		try {
			value = (WsResponse) pjp.proceed();
		} catch (Throwable e) {
			throw new DzException(e.getMessage());
		}
		return value;
	}
}

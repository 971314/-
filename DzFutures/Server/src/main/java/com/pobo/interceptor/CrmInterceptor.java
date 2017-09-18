package com.pobo.interceptor;

import com.pobo.model.crm.CrmAction;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Project: DzFutures
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-8-25 17:40
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Aspect
@Component
public class CrmInterceptor {
	protected Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private CrmAction crmAction;

	@Pointcut("execution(public * com.pobo.controller.CrmController.*(..))")
	private void doCrmLogin() {
	}

	@Before("doCrmLogin()")
	private void loginBeforeCrmAction() {
		crmAction.login();
	}
}

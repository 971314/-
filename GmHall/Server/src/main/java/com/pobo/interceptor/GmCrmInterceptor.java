package com.pobo.interceptor;

import com.pobo.model.crm.CrmInfoLocal;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * Project: GmHall
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/5/12 14:48
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Aspect
@Component
public class GmCrmInterceptor {
	protected Logger logger = LoggerFactory.getLogger(getClass());

	@Pointcut("within(com.pobo.model.crm..*)")
	private void doGmCrmAction() {
	}

	// 登陆
	@Before("com.pobo.interceptor.GmCrmInterceptor.doGmCrmAction()")
	public boolean doLogin() {
		CrmInfoLocal.loginCrm();
		return true;
	}

	// 退出登陆
	@After("com.pobo.interceptor.GmCrmInterceptor.doGmCrmAction()")
	public void doLoginOut() {
		CrmInfoLocal.LogoutCrm();
	}
}

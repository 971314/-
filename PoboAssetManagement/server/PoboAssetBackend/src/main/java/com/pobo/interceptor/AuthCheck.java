package com.pobo.interceptor;

import java.lang.annotation.*;

/**
 * Project: PoboAssetBackgroundSys
 * Comments: 用于认证身份的自定义注解
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-8-29 20:29
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface AuthCheck {
}
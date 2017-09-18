package com.pobo.ws.captcha;

import javax.jws.WebService;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import java.io.IOException;

/**
 * Project: GmHall
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/5/5 18:37
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Path(value = "/")
@WebService
//@Produces(value = MediaType.APPLICATION_JSON)
public interface CaptchaService {
	@GET
	@Path(value = "gen")
	void genCaptcha(@Context HttpServletRequest request,
	                @Context HttpServletResponse response,
	                @QueryParam("token") String token) throws IOException;

}

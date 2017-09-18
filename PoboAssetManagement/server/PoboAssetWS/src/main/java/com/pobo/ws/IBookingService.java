package com.pobo.ws;

import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

/**
 * Project: PoboAssetWS
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-10-28 17:56
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Path(value = "/booking")
@Consumes(value = MediaType.APPLICATION_JSON)
@Produces(value = MediaType.APPLICATION_JSON)
public interface IBookingService {
	@POST
	@Path(value = "/list")
	WsResponse queryBookingInfo(@Context HttpServletRequest request,
	                            @RequestBody WsRequest data);

	@POST
	@Path(value = "/submit")
	WsResponse newBookingInfo(@Context HttpServletRequest request,
	                          @RequestBody WsRequest data);
}

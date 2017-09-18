package com.pobo.ws;

import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

/**
 * Project: DzFutures
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/5/27 9:57
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */


/**
 * WebService 主入口的接口，在此处定义 URL 入口对应 URL 为 http://host:port/hall
 * 主入口接口只接受 JSON 格式的传入传出参数，并只支持 POST 方式
 * 根据程序需要，方法传入参数需带有 request 请求，以获取 session 等信息；以及
 * 前端传入参数 data，data 原生格式为 Json，此处映射为 WsRequest 实例
 */
@Path(value = "/")
@Consumes(value = MediaType.APPLICATION_JSON)
@Produces(value = MediaType.APPLICATION_JSON)
public interface MainWebService {
	@POST
	@Path(value = "/")
	WsResponse doWebService(@Context HttpServletRequest request,
	                        @Context HttpServletResponse response,
	                        @RequestBody WsRequest data);
}

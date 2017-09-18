package com.pobo.ws;

import javax.jws.WebService;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.springframework.web.bind.annotation.RequestBody;

import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;

@Path(value = "/")
@WebService
@Consumes(value = MediaType.APPLICATION_JSON)
@Produces(value = MediaType.APPLICATION_JSON)
public interface CustomerService {
	@POST
	@Path(value = "list")
	WsResponse GetList(@Context HttpServletRequest request,
            @Context HttpServletResponse response,@RequestBody WsRequest wr) throws Exception;


	@POST
	@Path(value = "records")
	WsResponse GetRecords(@Context HttpServletRequest request,
            @Context HttpServletResponse response,@RequestBody WsRequest wr) throws Exception;

	
	@POST
	@Path(value = "getinfo")
	WsResponse GetInfo(@Context HttpServletRequest request,
            @Context HttpServletResponse response,@RequestBody WsRequest wr) throws Exception;
	
	
	@POST
	@Path(value = "update")
	WsResponse ChangeInfo(@Context HttpServletRequest request,
            @Context HttpServletResponse response,@RequestBody WsRequest wr) throws Exception;
	
	
}

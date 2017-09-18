package com.pobo.ws;

import javax.jws.WebService;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.springframework.web.bind.annotation.RequestBody;

import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;

@Path(value = "/")
@WebService
@Consumes(value = MediaType.APPLICATION_JSON)
@Produces(value = MediaType.APPLICATION_JSON)
public interface AdminService {
	@POST
	@Path(value = "login")
	WsResponse adminLogin(@Context HttpServletRequest request,
            @Context HttpServletResponse response,@RequestBody WsRequest wr) throws Exception;


	@POST
	@Path(value = "logout")
	WsResponse adminLogout(@Context HttpServletRequest request,
            @Context HttpServletResponse response,@RequestBody WsRequest wr) throws Exception;

	@POST
	@Path(value = "changepwd")
	WsResponse adminChangePassword(@Context HttpServletRequest request,
            @Context HttpServletResponse response,@RequestBody WsRequest wr) throws Exception;
}

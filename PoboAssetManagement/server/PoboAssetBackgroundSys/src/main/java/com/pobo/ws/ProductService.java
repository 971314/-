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

import org.apache.cxf.jaxrs.ext.multipart.Attachment;
import org.apache.cxf.jaxrs.ext.multipart.Multipart;
import org.springframework.web.bind.annotation.RequestBody;

import com.pobo.model.ProductModel;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;

@Path(value = "/")
@WebService
@Consumes(value = MediaType.APPLICATION_JSON)  
@Produces(value = MediaType.APPLICATION_JSON)
public interface ProductService {
	@POST
	@Path(value = "list")
	WsResponse GetList(@Context HttpServletRequest request,
            @Context HttpServletResponse response,@RequestBody WsRequest wr) throws Exception;
	
	@POST
	@Path(value = "customer")
	WsResponse GetCustomerList(@Context HttpServletRequest request,
            @Context HttpServletResponse response,@RequestBody WsRequest wr) throws Exception;
	
	@POST
	@Path(value = "status")
	WsResponse ChangeProductStatus(@Context HttpServletRequest request,
            @Context HttpServletResponse response,@RequestBody WsRequest wr) throws Exception;
	
	@POST
	@Path(value = "records")
	WsResponse GetStatusRecords(@Context HttpServletRequest request,
            @Context HttpServletResponse response,@RequestBody WsRequest wr) throws Exception;
	
	@POST
	@Path(value = "create")
	@Consumes(value = MediaType.MULTIPART_FORM_DATA)  
	WsResponse CreateNewProduct(@Context HttpServletRequest request
			, @Multipart(value="uid",type="text/plain")String uid
			, @Multipart(value="productname",type="text/plain")String productname
			, @Multipart(value="opertype",type="text/plain")String opertype
			, @Multipart(value="channel",type="text/plain")String channel
			, @Multipart(value="subscribeline",type="text/plain")String subscribeline
			, @Multipart(value="time",type="text/plain")String time
			, @Multipart(value="duration",type="text/plain")String duration
			, @Multipart(value="issuesize",type="text/plain")String issuesize
			, @Multipart(value="risklevel",type="text/plain")String risklevel
			, @Multipart(value="period",type="text/plain")String period
			, @Multipart(value="infogoal",type="text/plain")String infogoal
			, @Multipart(value="infoscope",type="text/plain")String infoscope
			, @Multipart(value="infobrief",type="text/plain")String infobrief
			, @Multipart(value="managefee",type="text/plain")String managefee
			, @Multipart(value="trusteefee",type="text/plain")String trusteefee
			, @Multipart(value="infodescription",type="text/plain")String infodescription
			, @Multipart(value="infoallocation",type="text/plain")String infoallocation
			, @Multipart(value="warnnav",type="text/plain")String warnnav
			, @Multipart(value="stoplossnav",type="text/plain")String stoplossnav
			, @Multipart(value="infosar",type="text/plain")String infosar
			, @Multipart(value="infoadvisor",type="text/plain")String infoadvisor
			, @Multipart(value="infomanager",type="text/plain")String infomanager
			, @Multipart(value="file")Attachment file) throws Exception;
		
	@POST
	@Path(value = "getinfo")
	WsResponse GetProductInfo(@Context HttpServletRequest request,
            @Context HttpServletResponse response,@RequestBody WsRequest wr) throws Exception;
	
	
	@POST
	@Path(value = "update")
	@Consumes(value = MediaType.MULTIPART_FORM_DATA)  
	WsResponse UpdateProductInfo(@Context HttpServletRequest request
			, @Multipart(value="uid",type="text/plain")String uid
			, @Multipart(value="productname",type="text/plain")String productname
			, @Multipart(value="productid",type="text/plain")String productid
			, @Multipart(value="opertype",type="text/plain")String opertype
			, @Multipart(value="channel",type="text/plain")String channel
			, @Multipart(value="subscribeline",type="text/plain")String subscribeline
			, @Multipart(value="time",type="text/plain")String time
			, @Multipart(value="duration",type="text/plain")String duration
			, @Multipart(value="issuesize",type="text/plain")String issuesize
			, @Multipart(value="risklevel",type="text/plain")String risklevel
			, @Multipart(value="period",type="text/plain")String period
			, @Multipart(value="infogoal",type="text/plain")String infogoal
			, @Multipart(value="infoscope",type="text/plain")String infoscope
			, @Multipart(value="infobrief",type="text/plain")String infobrief
			, @Multipart(value="managefee",type="text/plain")String managefee
			, @Multipart(value="trusteefee",type="text/plain")String trusteefee
			, @Multipart(value="infodescription",type="text/plain")String infodescription
			, @Multipart(value="infoallocation",type="text/plain")String infoallocation
			, @Multipart(value="warnnav",type="text/plain")String warnnav
			, @Multipart(value="stoplossnav",type="text/plain")String stoplossnav
			, @Multipart(value="infosar",type="text/plain")String infosar
			, @Multipart(value="infoadvisor",type="text/plain")String infoadvisor
			, @Multipart(value="infomanager",type="text/plain")String infomanager
			, @Multipart(value="file")Attachment file) throws Exception;
	
	@POST
	@Path(value = "excelrecords")
	WsResponse GetExcelRecords(@Context HttpServletRequest request,
            @Context HttpServletResponse response,@RequestBody WsRequest wr) throws Exception;
}

package com.pobo.ws;

import java.io.File;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.pobo.utils.ExcelUtil;
import com.pobo.utils.IOUtil;
import javax.activation.DataHandler;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.cxf.jaxrs.ext.multipart.Attachment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.pobo.constant.OperationLogType;
import com.pobo.constant.ParameterTranslator;
import com.pobo.controller.ProductController;
import com.pobo.model.CustomerInfo;
import com.pobo.model.GetOpetationLog;
import com.pobo.model.LogParameters;
import com.pobo.model.Nav;
import com.pobo.model.ProductCustomerPatameters;
import com.pobo.model.ProductModel;
import com.pobo.model.ProductQueryParameters;
import com.pobo.protocol.WsRequest;
import com.pobo.protocol.WsResponse;
import com.pobo.utils.LogUtil;

@Component(value = "productService")
public class ProductServiceImple implements ProductService {
	@Autowired
	ProductController productcontroller = new ProductController();

	@Override
	public WsResponse GetList(HttpServletRequest request, HttpServletResponse response, WsRequest wr) throws Exception {
		HashMap<String, String> map = wr.getData().get(0);
		ProductQueryParameters pqp = new ProductQueryParameters();
		if (map.containsKey("periodid")) {
			pqp.setPeriodid(Integer.parseInt(map.get("periodid").trim()));
		}
		if (map.containsKey("channelid")) {
			pqp.setChannelid(Integer.parseInt(map.get("channelid").trim()));
		}
		if (map.containsKey("typeid")) {
			pqp.setTypeid(Integer.parseInt(map.get("typeid").trim()));
		}
		pqp.setCurrentindex(
				(Integer.parseInt(map.get("currentindex").trim()) - 1) * Integer.parseInt(map.get("pagecount").trim()));
		pqp.setPagecount(Integer.parseInt(map.get("pagecount").trim()));
		if (map.containsKey("orderfield")) {
			pqp.setOrderfield(map.get("orderfield").trim().toLowerCase());
		}
		if (map.containsKey("ordertype")) {
			pqp.setOrdertype(ParameterTranslator.getRealParameter(map.get("ordertype").trim().toLowerCase()));
		}
		WsResponse r = new WsResponse();
		List<HashMap<String, Object>> rdata = new ArrayList<>();
		HashMap<String, Object> rmap = new HashMap<>();
		rmap.put("list", productcontroller.GetPageList(pqp));
		rmap.put("totalCount", pqp.getTotalcount());
		rdata.add(rmap);
		r.setCorrect(rdata);
		map = null;
		return r;
	}

	@Override
	public WsResponse GetCustomerList(HttpServletRequest request, HttpServletResponse response, WsRequest wr)
			throws Exception {
		HashMap<String, String> map = wr.getData().get(0);
		ProductCustomerPatameters pcp = new ProductCustomerPatameters();
		if (map.containsKey("name")) {
			pcp.setName(map.get("name").trim());
		}
		if (map.containsKey("phone")) {
			pcp.setPhone(map.get("phone").trim());
		}
		if (map.containsKey("statusid")) {
			pcp.setStatusid(map.get("statusid").trim());
		}
		if (map.containsKey("productid")) {
			pcp.setProductid(map.get("productid").trim());
		}
		pcp.setCurrentindex(
				(Integer.parseInt(map.get("currentindex").trim()) - 1) * Integer.parseInt(map.get("pagecount").trim()));
		pcp.setPagecount(Integer.parseInt(map.get("pagecount").trim()));
		if (map.containsKey("orderfield")) {
			pcp.setOrderfield(map.get("orderfield").trim().toLowerCase());
		}
		if (map.containsKey("ordertype")) {
			pcp.setOrdertype(ParameterTranslator.getRealParameter(map.get("ordertype").trim().toLowerCase()));
		}
		WsResponse r = new WsResponse();
		List<HashMap<String, Object>> rdata = new ArrayList<>();
		HashMap<String, Object> rmap = new HashMap<>();
		rmap.put("customers", productcontroller.GetCustomerList(pcp));
		rmap.put("totalCount", productcontroller.CustomerListCount(pcp));
		rdata.add(rmap);
		r.setCorrect(rdata);
		map = null;
		return r;
	}

	@Override
	public WsResponse ChangeProductStatus(HttpServletRequest request, HttpServletResponse response, WsRequest wr)
			throws Exception {
		int count = 0;
		try {
			count = productcontroller.UpdateProductStatus(request, response, wr);
		} catch (Exception e) {

		}
		WsResponse r = new WsResponse();
		List<HashMap<String, Object>> rdata = new ArrayList<>();
		HashMap<String, Object> rmap = new HashMap<>();
		rmap.put("update", count);
		rdata.add(rmap);
		r.setCorrect(rdata);
		return r;
	}

	@Override
	public WsResponse GetStatusRecords(HttpServletRequest request, HttpServletResponse response, WsRequest wr)
			throws Exception {
		LogParameters lp = new LogParameters();
		lp.setLogtype(OperationLogType.ProductLog);
		lp.setProductid(wr.getData().get(0).get("id").trim());
		List<GetOpetationLog> list = productcontroller.GetProductRecords(lp);
		List<HashMap<String, String>> listMap = LogUtil.LogGenerator(list);
		list = null;
		WsResponse r = new WsResponse();
		List<HashMap<String, Object>> rdata = new ArrayList<>();
		HashMap<String, Object> rmap = new HashMap<>();
		rmap.put("records", listMap);
		rdata.add(rmap);
		r.setCorrect(rdata);
		return r;
	}


	@Override
	public WsResponse CreateNewProduct(HttpServletRequest request, String uid, String productname, String opertype,
			String channel, String subscribeline, String time, String duration, String issuesize,
			String risklevel, String period, String infogoal, String infoscope, String infobrief, String managefee,
			String trusteefee, String infodescription, String infoallocation, String warnnav, String stoplossnav,
			String infosar, String infoadvisor, String infomanager, Attachment file) throws Exception {
		ProductModel pm = new ProductModel();
		pm.setUid(uid);
		pm.setProductname(productname);
		pm.setOpertype(opertype);
		pm.setChannel(channel);
		pm.setSubscribeline(subscribeline);
		pm.setTime(time);
		pm.setDuration(duration);
		pm.setIssuesize(issuesize);
		pm.setRisklevel(risklevel);
		pm.setPeriod(period);
		pm.setInfogoal(infogoal);
		pm.setInfoscope(infoscope);
		pm.setInfobrief(infobrief);
		pm.setManagefee(managefee);
		pm.setTrusteefee(trusteefee);
		pm.setInfodescription(infodescription);
		pm.setInfoallocation(infoallocation);
		pm.setWarnnav(warnnav);
		pm.setStoplossnav(stoplossnav);
		pm.setInfosar(infosar);
		pm.setInfoadvisor(infoadvisor);
		pm.setInfomanager(infomanager);
		//附件处理
        List<Nav> list=null;
		if(file!=null)
		{
			DataHandler dh = file.getDataHandler(); 
			String name=dh.getName()==null?null:dh.getName().trim();
			if(name!=null&&!"".equals(name))
			{
				InputStream ins = dh.getInputStream();  
                String tempath = Thread.currentThread().getContextClassLoader().getResource("").getPath();
                String path =tempath.substring(0, tempath.indexOf("PoboAssetBackgroundSys"))+"PoboAssetBackgroundSys/excel/";
                File dir=new File(path);
                boolean exists=dir.exists();
                if(!exists)
                {
                	dir.mkdir();
                }
                name=System.currentTimeMillis()+name.substring(name.lastIndexOf("."));
                if(IOUtil.writeToFile(ins, path, name))
                {
                	list=ExcelUtil.readExcel(path+"/"+ name);
                }
			}
		}
		try
		{
		
		}
		catch(Exception e)
		{}
		int count=0;
		try
		{
			count=productcontroller.CreateNewProduct(request,pm,list);
		}
		catch(Exception e)
		{
			
		}
		WsResponse r = new WsResponse();
		List<HashMap<String, Object>> rdata = new ArrayList<>();
		HashMap<String, Object> rmap = new HashMap<>();
		rmap.put("create", count);
		rdata.add(rmap);
		r.setCorrect(rdata);
		return r;
	}

	@Override
	public WsResponse GetProductInfo(HttpServletRequest request, HttpServletResponse response, WsRequest wr)
			throws Exception {
		WsResponse r = new WsResponse();
		List<HashMap<String, Object>> rdata = new ArrayList<>();
		HashMap<String, Object> rmap = new HashMap<>();
		rmap.put("product", productcontroller.GetProductInfo(wr));
		rdata.add(rmap);
		r.setCorrect(rdata);
		return r;
	}

	@Override
	public WsResponse UpdateProductInfo(HttpServletRequest request, String uid, String productname, String productid,
			String opertype, String channel, String subscribeline, String time, String duration,
			String issuesize, String risklevel, String period, String infogoal, String infoscope, String infobrief,
			String managefee, String trusteefee, String infodescription, String infoallocation, String warnnav,
			String stoplossnav, String infosar, String infoadvisor, String infomanager, Attachment file)
			throws Exception {
		ProductModel pm = new ProductModel();
		pm.setUid(uid);
		pm.setProductid(productid);
		pm.setProductname(productname);
		pm.setOpertype(opertype);
		pm.setChannel(channel);
		pm.setSubscribeline(subscribeline);
		pm.setTime(time);
		pm.setDuration(duration);
		pm.setIssuesize(issuesize);
		pm.setRisklevel(risklevel);
		pm.setPeriod(period);
		pm.setInfogoal(infogoal);
		pm.setInfoscope(infoscope);
		pm.setInfobrief(infobrief);
		pm.setManagefee(managefee);
		pm.setTrusteefee(trusteefee);
		pm.setInfodescription(infodescription);
		pm.setInfoallocation(infoallocation);
		pm.setWarnnav(warnnav);
		pm.setStoplossnav(stoplossnav);
		pm.setInfosar(infosar);
		pm.setInfoadvisor(infoadvisor);
		pm.setInfomanager(infomanager);
		//附件处理
        List<Nav> list=null;
		if(file!=null)
		{
			DataHandler dh = file.getDataHandler(); 
			String name=dh.getName()==null?null:dh.getName().trim();
			if(name!=null&&!"".equals(name))
			{
				InputStream ins = dh.getInputStream();  
                String tempath = Thread.currentThread().getContextClassLoader().getResource("").getPath();
                String path =tempath.substring(0, tempath.indexOf("PoboAssetBackgroundSys"))+"PoboAssetBackgroundSys/excel/";
                File dir=new File(path);
                boolean exists=dir.exists();
                if(!exists)
                {
                	dir.mkdir();
                }
                name=System.currentTimeMillis()+name.substring(name.lastIndexOf("."));
                if(IOUtil.writeToFile(ins, path, name))
                {
                	list=ExcelUtil.readExcel(path+"/"+ name);
                }
			}
		}
		try
		{
		
		}
		catch(Exception e)
		{}
		int count=0;
		try
		{
			count=productcontroller.UpdateProduct(request,pm,list);
		}
		catch(Exception e)
		{
			
		}
		WsResponse r = new WsResponse();
		List<HashMap<String, Object>> rdata = new ArrayList<>();
		HashMap<String, Object> rmap = new HashMap<>();
		rmap.put("update", count);
		rdata.add(rmap);
		r.setCorrect(rdata);
		return r;
	}

	@Override
	public WsResponse GetExcelRecords(HttpServletRequest request, HttpServletResponse response, WsRequest wr)
			throws Exception {
		LogParameters lp = new LogParameters();
		lp.setLogtype(OperationLogType.ExcelImportLog);
		lp.setProductid(wr.getData().get(0).get("id").trim());
		List<GetOpetationLog> list = productcontroller.GetProductRecords(lp);
		List<HashMap<String, String>> listMap = LogUtil.LogGenerator(list);
		list = null;
		WsResponse r = new WsResponse();
		List<HashMap<String, Object>> rdata = new ArrayList<>();
		HashMap<String, Object> rmap = new HashMap<>();
		rmap.put("records", listMap);
		rdata.add(rmap);
		r.setCorrect(rdata);
		return r;
	}

}

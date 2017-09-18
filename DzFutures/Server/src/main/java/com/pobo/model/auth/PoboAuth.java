package com.pobo.model.auth;

import com.pobo.cc.ca.poboPack;
import com.pobo.cc.work.Jpobocclong;
import com.pobo.service.HTTPCommService;
import com.pobo.utils.JsonUtil;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.message.BasicNameValuePair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Project: DzFutures
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016-8-15 16:43
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Component
public class PoboAuth {
	@Autowired
	public HTTPCommService httpService;
	private @Value("${auth.url}") String  authUrl;
	private @Value("${auth.url}") String keepUrl = "61.172.197.217";
	private @Value("${auth.port}") String keepPort = "6001";

	public String loginUrl = "http://61.172.197.214:80/pobocertification_WebService/protocol_4";
	public String checkUrl = "http://61.172.197.214:80/pobocertification_WebService/protocol_6";

	private final static String DEV_ID = "192.168.6.0";
	private final static String LOGIN_TYPE = "1";
	private final static String OS = "OS";

	private Jpobocclong j = null;

	@PostConstruct
	public void init(){
		try{
			this.j = new Jpobocclong(keepUrl, Integer.valueOf(keepPort));
			j.init_longLinkFig();
		}catch(Exception e){
			e.printStackTrace();
			return;
		}
	}

	/**
	 * 获取令牌
	 * @Title: getToken
	 * @param username
	 * @param pwd
	 * @return token string
	 */
	public String getToken(String username,String pwd){

		poboPack pack = null;
		try{
			// Socket request
			//pack = j.protocol_4(null, username, LOGIN_TYPE, pwd, null, DEV_ID, null, null, OS, null, null);
		}catch(Exception e){
			e.printStackTrace();
		}

		String content = null;
		if(null == pack) {
			// if socket failure, try http
//			httpService.send()
			Map<String, Map<String, Object>> formparams = new HashMap<>();
			HashMap<String, Object> map = new HashMap<>();
			map.put("arg2", username);
			map.put("arg3", LOGIN_TYPE);
			map.put("arg4", pwd);
			map.put("arg6", DEV_ID);
			map.put("arg9", OS);
			formparams.put("protocol4", map);
			String json = JsonUtil.obj2json(formparams);
//			JsonUtil.
//
//			formparams.add(new HashMap<String, Object>("arg2", username)); //"chh0409"
//			formparams.add(new BasicNameValuePair("arg3", LOGIN_TYPE));
//			formparams.add(new BasicNameValuePair("arg4", pwd)); //"chh200904l"
//			formparams.add(new BasicNameValuePair("arg6", DEV_ID)); //devID
//			formparams.add(new BasicNameValuePair("arg9", OS));   //OS
//			//{"protocol4":
//			//{"arg1":0,"arg2":"chh0409","arg3":5740,
//			//"arg5":"iISdvRHC+YvYcTn+K2WvYizhmWtyffAxKOb7ryxg6xJSBG0eNIYQdkKyykqCDcntbgL4Z3UKBoIiGPPJq5/h31HMQ42qWA+V66UEDk4hGOq4FUAgL0kbMuHHwr29+0mP",
//			//"arg6":20160116144035034,
//			//"arg7":60}}
//			post.setEntity(new UrlEncodedFormEntity(formparams));
			httpService.setUrl(loginUrl);
			content = httpService.send(json);//PoboHttpClient.post(formparams,PoboStart.config.login_url);

		}else{
			if("0".equals(pack.GetString(1))){
				content = "{\"protocol4\":{\"arg1\":"+pack.GetString(1)+","+
						"\"arg2\":\""+pack.GetString(2)+"\","+
						"\"arg3\":"+pack.GetString(3)+","+
						"\"arg5\":\""+pack.GetString(5)+"\","+
						"\"arg6\":\""+pack.GetString(6)+"\","+
						"\"arg7\":"+pack.GetString(7)+"}}";

			}else{
				content = "{\"protocol4\":{\"arg1\":"+pack.GetString(1)+","+
						"\"arg2\":\""+pack.GetString(2)+"\"}}";
			}
		}
		return content;
	}

	/**
	 *
	 * @Title: checkToken
	 * @Description: 校验令牌
	 * @param token
	 * @param userid
	 * @return
	 * @return boolean
	 * @throws
	 * @Version V1.0.0
	 */
	public boolean checkToken(String userid,String token){

		boolean flag = true;
		poboPack pack = null;
		try{
			pack = j.protocol_6("11", userid, "11", "OS", "1.0.0", token, "192.168.6.0", "11");
		}catch(Exception e){
			e.printStackTrace();
		}

		String content = null;
		//System.out.println(pack);
		if(null == pack){
			//http请求
//			List<NameValuePair> formparams = new ArrayList<NameValuePair>();
//			formparams.add(new BasicNameValuePair("arg2", userid));
//			formparams.add(new BasicNameValuePair("arg3", "192.168.6.0"));  //devID
//			formparams.add(new BasicNameValuePair("arg4", "OS")); //"OS"
//			formparams.add(new BasicNameValuePair("arg6", token));
//			content = PoboHttpClient.post(formparams,PoboStart.config.check_url);
//			//System.out.println(content);
//			JSONObject jsonObject;
//			String status = null;
//			try {
//				if(null == content){
//					throw new RuntimeException("Http请求返回值为空");
//				}
//				jsonObject = new JSONObject(content);
//				jsonObject = new JSONObject(PoboServiceImpl.getString(jsonObject, "protocol6"));
//				status = PoboServiceImpl.getString(jsonObject, "arg1");
//			} catch (Exception e) {
//				return false;
//			}
//			if(null != status && "0".equals(status)){
//				//缓存当前登录用户令牌
//				if(null != PoboStart.config.loginUserToken.get(userid)){
//					//如果缓存中存在这条信息则，更新这条的信息的内容
//					LoginUserToken t_LoginUserToken = PoboStart.config.loginUserToken.get(userid);
//					t_LoginUserToken.setToken(token);
//					t_LoginUserToken.setCreateTime(new Date());
//					t_LoginUserToken.setLastUseTime(t_LoginUserToken.getCreateTime() );
//				}else{
//					//如果缓存中不存在该条信息，则添加这条信息进缓存
//					LoginUserToken t_LoginUserToken = new LoginUserToken();
//					t_LoginUserToken.setUserID(userid);
//					t_LoginUserToken.setToken(token);
//					t_LoginUserToken.setCreateTime(new Date());
//					t_LoginUserToken.setLastUseTime(t_LoginUserToken.getCreateTime() );
//					PoboStart.config.loginUserToken.put(userid, t_LoginUserToken);
//				}
//			}else{
//				flag = false;
//			}
		}else{
			if(!"0".equals(pack.GetString(1))){
				flag = false;
			}
		}

		return flag;
	}

	public static void main(String[] args) {

		PoboAuth poboAuth = new PoboAuth();
		poboAuth.httpService = new HTTPCommService();
		poboAuth.init();

		String token = poboAuth.getToken("18621542135", "wwc6561331");

		System.out.println(token);
//
//		poboAuth.init();
//		PoboAuth j = new PoboAuth("61.172.197.217", 6001);
//		j.init_longLinkFig();
//
//		long a = System.currentTimeMillis();
//		poboPack	recive1 =   j.protocol_4("123", "chh0409",
//				"3", "chh123", "2", "192.168.6.124",
//				"", "", "W7",
//				"10.0.0.1","123") ;
//		long b= System.currentTimeMillis();
//
//		System.out.println("between time is  " + (b-a));
//		recive1.printALL();
	}
}

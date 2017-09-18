package com.pobo.service;

import com.pobo.exception.DzException;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.*;

@Component
public final class HTTPCommService {
	protected Logger logger = LoggerFactory.getLogger(getClass());
	private
	@Value("${dz.httpservice.charset}")
	String DEFAULT_CHARSET = "UTF-8";

	private int MAXLENGTH = 1000;
	private static HttpClient httpClient = HttpClientBuilder.create().build();
	/**************************** HTTP POST ***************************/
	/**
	 * HTTP POST 请求, 仅带有参数, 而无自定义的 Header
	 *
	 * @param url    URL, 请求的地址
	 * @param params 参数
	 * @return 返回 http response, 以 String 形式
	 */
	public String doPost(String url, Map<String, String> params) {
		Map<String, String> header = new HashMap<>();
		return doPost(url, params, header);
	}

	/**
	 * HTTP POST 请求, 带有参数, 并带有自定义的 Header
	 *
	 * @param url    URL, 请求的地址
	 * @param params 参数
	 * @param header 请求的 Header
	 * @return 返回 http response, 以 String 形式
	 */
	public String doPost(String url, Map<String, String> params, Map<String, String> header) {
		HttpPost httpPost = new HttpPost(url);

		for (String key : header.keySet()) {
			httpPost.setHeader(key, header.get(key));
		}

		List<NameValuePair> urlParameters = new ArrayList<>();
		if (params != null) {
			for (String key : params.keySet()) {
				urlParameters.add(new BasicNameValuePair(key, params.get(key)));
			}
		}

		try {
			httpPost.setEntity(new UrlEncodedFormEntity(urlParameters));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return doPost(httpPost);
	}

	/**
	 * HTTP POST 请求, 针对过多的自定义参数，直接传入 HttpPost
	 *
	 * @param httpPost HttpPost
	 * @return 返回 http response, 以 String 形式
	 */
	public String doPost(HttpPost httpPost) {
		String content = null;
		try {
			content = EntityUtils.toString(httpPost.getEntity());
		} catch (IOException e) {
			throw new DzException("Http Post 请求参数解析错误，");
		}

		if (content.length() > MAXLENGTH) {
			logger.debug("Http PostRequest: URL=[{}]\tParams=[{}......]", httpPost.getURI(), content.substring(0, MAXLENGTH));
		} else {
			logger.debug("Http PostRequest: URL=[{}]\tParams=[{}]", httpPost.getURI(), content);
		}

		return execute(httpPost);
	}

	/**************************** HTTP GET ***************************/
	/**
	 * HTTP GET 请求, 仅带有参数, 而无自定义的 Header
	 *
	 * @param url    URL, 请求的地址
	 * @param params 参数
	 * @return 返回 http response, 以 String 形式
	 */
	public String doGet(String url, Map<String, String> params) {
		Map<String, String> header = new HashMap<>();
		return doGet(url, params, header);
	}

	/**
	 * HTTP GET 请求, 带有参数, 并带有自定义的 Header
	 *
	 * @param url    URL, 请求的地址
	 * @param params 参数
	 * @param header 请求的 Header
	 * @return 返回 http response, 以 String 形式
	 */
	public String doGet(String url, Map<String, String> params, Map<String, String> header) {
		if (params != null) {
			String paramStr = "?";
			for (String key : params.keySet()) {

				String val = params.get(key);
				try {
					paramStr += URLEncoder.encode(key, "UTF-8") + "=" + URLEncoder.encode(val, "UTF-8");
				} catch (UnsupportedEncodingException e) {
					e.printStackTrace();
				}
				paramStr += "&";
			}
			paramStr = paramStr.substring(0, paramStr.length() - 1);
			url = url + paramStr;
		}

		HttpGet httpGet = new HttpGet(url);

		if (header != null) {
			for (String key : header.keySet()) {
				httpGet.setHeader(key, header.get(key));
			}
		}

		return doGet(httpGet);
	}

	/**
	 * HTTP GET 请求, 针对过多的自定义参数，直接传入 HttpGet
	 *
	 * @param httpGet HttpGet
	 * @return 返回 http response, 以 String 形式
	 */
	public String doGet(HttpGet httpGet) {
		String content = httpGet.getURI().toString();
		if (content.length() > MAXLENGTH) {
			logger.debug("Http GetRequest: URL=[{}]", content.substring(0, MAXLENGTH));
		} else {
			logger.debug("Http GetRequest: URL=[{}]", content);
		}

		return execute(httpGet);
	}

	/******************************************************************/

	private String execute(HttpRequestBase request) {
		return execute(request, DEFAULT_CHARSET);
	}

	private String execute(HttpRequestBase request, String charset) {
		BufferedReader br = null;
		StringBuilder result = new StringBuilder();

		try {
			HttpResponse response = httpClient.execute(request);

			int statusCode = response.getStatusLine().getStatusCode();

			if (statusCode == HttpStatus.SC_OK) {
				br = new BufferedReader(
						new InputStreamReader(response.getEntity().getContent(), charset));

				String oStr;
				while ((oStr = br.readLine()) != null) {
					result.append(oStr.trim());
				}
				logger.info("Http Response SUCCESS! Status Code = [{}], Content = [{}]", statusCode, result);
			} else {
				logger.error("Http Response ERROR! Status Code = [{}], Reason = [{}]",
						statusCode, response.getStatusLine().getReasonPhrase());
				throw new DzException("Http Response ERROR! Status Code = " + statusCode + ", Reason = "
						+ response.getStatusLine().getReasonPhrase());
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (br != null) {
				try {
					br.close();
				} catch (IOException e) {
					logger.error("StringBuilder close Error");
				}
			}
			request.releaseConnection();
		}

		if (result.length() == 0) {
			return null;
		} else {
			return result.toString();
		}
	}


//	public static void main(String[] args) {
//		String url = "http://180.169.30.6:8051/httpservice/service.do";
//		HTTPCommService httpCommService = new HTTPCommService();
//		Map<String, String> map = new HashMap<>();
////		map.put("safe","strict");
////		map.put("q","http client get");
////		String ret = httpCommService.doGet("https://www.google.com.hk", map);
////
////		String json = "{\"func\":\"6011\",\"pwd\":\"5893520\",\"account\":\"802477\",\"begin\":\"\",\"count\":\"\",\"fields\":\"\",\"data\":[{\"53\":\"\",\"67\":\"8\",\"249\":\"802477\"}]}";
////		map.clear();
////		map.put("json", json);
////		String ret2 = httpCommService.doPost("http://wt.itf.com.cn/trade/1_0/", map);
//		String json;// = "{\"PHONENUM\":\"13411111111\",\"DEPARTMENT_ID\":\"010I0203\",\"BROKERNAME\":\"郝涵\",\"BROKER_ID\":\"kfhh\"}";
////		try {
////			json = new String(json.getBytes("UTF-8"), "GBK");
////		} catch (UnsupportedEncodingException e) {
////			e.printStackTrace();
////		}
//
//		//String json;
//
//		map.put("username", "appuser");
//		map.put("password", "123456");
//		json = JsonUtil.obj2json(map);
//		map.clear();
//		map.put("service", "login");
//		map.put("json", json);
//		String ret1 = httpCommService.doPost(url, map);
//
//		Map<String, String> header = new HashMap<>();
//		header.put(HTTP.CONTENT_TYPE, "application/x-www-form-urlencoded;charset=gbk");
//
//
//		map.clear();
//		map.put("PHONENUM", "13411111000");
//		map.put("PASSWORD", "123");
//		map.put("RECOMMENDNUM", "");
//		json = JsonUtil.obj2json(map);
//		map.clear();
//		map.put("service", "app.101");
//		map.put("json", json);
//		String ret2 = httpCommService.doPost(url, map);
//
//		map.clear();
////		map.put("BROKERNAME", "郝涵");
////		map.put("DEPARTMENT_ID", "010I0203");
////		map.put("BROKER_ID", "kfhh");
////		map.put("PHONENUM", "13411111111");
//
//		map.put("BROKERNAME", "李小鹏");
//		map.put("DEPARTMENT_ID", "00");
//		map.put("BROKER_ID", "1A2B3C");
//		map.put("PHONENUM", "13411111000");
//		json = JsonUtil.obj2json(map);
////		map.clear();
////		try {
////			json = new String(json.getBytes("UTF-8"), "GBK");
////		} catch (UnsupportedEncodingException e) {
////			e.printStackTrace();
////		}
//		HttpPost post = new HttpPost(url);
//		List<NameValuePair> formparams = new ArrayList<NameValuePair>();
//		formparams.add(new BasicNameValuePair("json", json));
//		formparams.add(new BasicNameValuePair("service", "app.102"));
//		UrlEncodedFormEntity uefEntity;
//		try {
//			uefEntity = new UrlEncodedFormEntity(formparams, "GBK");
//			post.setEntity(uefEntity);
//		} catch (UnsupportedEncodingException e) {
//			e.printStackTrace();
//		}
//		String ret3 = httpCommService.doPost(post);
//
////		map.put("service", "app.102");
////		map.put("json", json);
////		String ret3 = httpCommService.doPost("http://192.168.12.22:8080/httpservice/service.do", map, header);
//
//		map.clear();
//		map.put("ID_NO", "13564092568");
//		map.put("DEPARTMENT_ID", "123");
//		map.put("BROKER_ID", "");
//		map.put("IMG_DATA", "");
//		map.put("PHONENUM", "");
//		json = JsonUtil.obj2json(map);
//		map.clear();
//		map.put("service", "app.103");
//		map.put("json", json);
//		String ret4 = httpCommService.doPost(url, map);
//	}

	/******************************************************************************/
	public static String encode(String str) throws UnsupportedEncodingException {
		String content = new String(
				Base64.getEncoder().encode(
						URLEncoder.encode(str, "UTF-8").getBytes()));
		return content;
	}

	public static void main(String[] args) throws UnsupportedEncodingException {
		// url
		//String httpPath = "http://58.246.39.26:9021/communication/sendSms.ashx";
		String httpPath = "http://58.246.39.26:9153/communication/sendSms.ashx";

		StringBuffer params = null;
		// 程序ID
		String cid = "4200";
		// 账号密码
		String pwd = "dzqh222";
		// 产品编号,具体账号，具体分配，建议不要写死
		String productid = "6904";
		// 手机号码,多个手机号码用英文逗号隔开， 最多100个
		String mobile = "18621542135";
		// 短信内容，建议不要超过500字
		String content = "短信你好！" + System.currentTimeMillis() + "【短信签名】";
		// 子号,默认留空，但需保留这个参数
		String lcode = "";
		// 流水号，控制在18位以内
		String ssid = String.valueOf(System.currentTimeMillis());
		// 短信编码，普通短信15，长短信32，，默认填写32
		String format = "32";
		// 短信签名，默认不起作用，但需保留这个参数
		String sign = "";
		// 自定义字段
		String custom = "";
		try {
			params = new StringBuffer();
			params.append("?cid=").append(encode(cid))
					.append("&pwd=").append(encode(pwd))
					.append("&productid=").append(productid)
					.append("&mobile=").append(encode(mobile))
					.append("&content=").append(encode(content))
					.append("&lcode=").append(lcode)
					.append("&ssid=").append(ssid)
					.append("&format=").append(format)
					.append("&sign=").append(encode(sign))
					.append("&custom=").append(encode(custom));
			System.out.println(params.toString());

			HttpGet httpGet = new HttpGet(httpPath + params.toString());
			HTTPCommService httpCommService = new HTTPCommService();
			String result = httpCommService.doGet(httpGet);
			System.out.println(result);

		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
}

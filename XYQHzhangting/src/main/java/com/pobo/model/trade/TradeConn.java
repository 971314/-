package com.pobo.model.trade;

import com.pobo.cache.CacheKey;
import com.pobo.cache.UserCacheManager;
import com.pobo.constant.RetCode;
import com.pobo.protocol.TradeLoginRequest;
import com.pobo.protocol.TradeRequest;
import com.pobo.protocol.WsResponse;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Project: GmHall
 * Comments: <对此类的描述，可以引用系统设计中的描述>
 * JDK Version Used: JDK 1.8
 * Author: Wang Wenchao
 * Create Date: 2016/5/19 13:41
 * Version: <版本号>
 * *************************************
 * Modified By: <修改人中文名或拼音缩写>
 * Modified Date：<修改日期，格式:YYYY-MM-DD>
 * Reason：<修改原因描述>
 * Version：<版本号>
 */

@Component
public class TradeConn {
	private
	@Value("${trade.url}")
	String TRADE_URL = "http://localhost:8080/web_trade3/1_0/";

	private static final String REQ_ACCEPT = "application/json, text/javascript, */*; q=0.01";
	private static final String REQ_CONTENT_TYPE = "application/x-www-form-urlencoded; charset=UTF-8";

	protected Logger logger = LoggerFactory.getLogger(getClass());
	private static final ObjectMapper om = new ObjectMapper();

	private static RequestConfig requestConfig = RequestConfig.custom().setConnectTimeout(60 * 1000).setSocketTimeout(60 * 1000).build();
	private static HttpClient httpClient = HttpClientBuilder.create().setDefaultRequestConfig(requestConfig).build();

	public TradeConn() {
		if (httpClient == null) {
			httpClient = HttpClientBuilder.create().build();
		}
	}

	/**
	 * 交易接口请求主函数
	 *
	 * @param account  客户号
	 * @param func     功能码
	 * @param data     请求数据
	 * @param response 返回前端协议
	 * @return 返回前端 List<HashMap<String, String>>，
	 * 如果数据正常返回，则返回该接口；如果错误，则返回 null，
	 * 并设置 response 为 error，设置 response 的 desc 为错误信息
	 * @see com.pobo.constant.FuncCode  功能码查询
	 * @see com.pobo.constant.RetCode   错误码查询
	 */
	public List<HashMap<String, Object>> request(String account, int func, List<HashMap<String, String>> data, WsResponse response) {

		/* 发送至 trade 报文组装 */
		TradeRequest tradeRequest = new TradeRequest();
		tradeRequest.setFunc(String.valueOf(func));

		// account
		tradeRequest.setId(account);
		// token
		tradeRequest.setToken((String) UserCacheManager.getInstance().get(account, CacheKey.TRADE_TOKEN));
		// data
		tradeRequest.setData(data);

		String result;
		try {
			result = send(om.writeValueAsString(tradeRequest));

			JsonNode jn;
			jn = checkResult(result, response);
			if (jn == null) return null;

			List<HashMap<String, Object>> rdata = om.readValue(jn.get("data"),
					new TypeReference<List<HashMap<String, Object>>>() {
					});
			return rdata;
		} catch (IOException e) {
			logger.error(RetCode.getDesc(-11), e);
		}

		return null;
	}

	/**
	 * 交易接口, 登录接口
	 *
	 * @param account  客户号
	 * @param password 密码
	 * @param data     请求数据
	 * @param response 返回前端协议
	 * @return 返回前端 List<HashMap<String, String>>，
	 * 如果数据正常返回，则返回该接口；如果错误，则返回 null，
	 * 并设置 response 为 error，设置 response 的 desc 为错误信息
	 * @see com.pobo.constant.FuncCode  功能码查询
	 * @see com.pobo.constant.RetCode   错误码查询
	 */
	public List<HashMap<String, Object>> login(String account, String password, List<HashMap<String, String>> data, WsResponse response) {
		/* 发送至 trade 报文组装 */
		TradeLoginRequest loginRequest = new TradeLoginRequest();

		loginRequest.setFunc(String.valueOf(6011));
		// account
		loginRequest.setAccount(account);
		// password
		loginRequest.setPwd(password);
		// data
		loginRequest.setData(data);

		String result;
		try {
			result = send(om.writeValueAsString(loginRequest));

			JsonNode jn;
			jn = checkResult(result, response);
			if (jn == null) return null;

			List<HashMap<String, Object>> rdata = om.readValue(jn.get("data"),
					new TypeReference<List<HashMap<String, Object>>>() {
					});

			// 将 token 存入缓存
			UserCacheManager.getInstance().add(account, CacheKey.TRADE_TOKEN, jn.get("token").asText());

			return rdata;
		} catch (IOException e) {
			logger.error(RetCode.getDesc(-11), e);
		}

		return null;
	}


	public String send(String json) {
		HttpPost post = createPost();

		List<NameValuePair> urlParameters = new ArrayList<>();
		HttpResponse response;
		BufferedReader br = null;
		StringBuilder result = new StringBuilder();

		try {
			urlParameters.add(new BasicNameValuePair("json", json));
			post.setEntity(new UrlEncodedFormEntity(urlParameters));

			response = httpClient.execute(post);
			if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				br = new BufferedReader(
						new InputStreamReader(response.getEntity().getContent(), "UTF-8"));
				String oStr;
				while ((oStr = br.readLine()) != null) {
					result.append(oStr.trim());
				}
			}
		} catch (IOException e) {
			logger.error(RetCode.getDesc(-1), e);
		} finally {
			if (br != null) {
				try {
					br.close();
				} catch (IOException e) {
					logger.error(RetCode.getDesc(-1), e);
				}
			}
			post.releaseConnection();
		}

		if (result.length() == 0) {
			return null;
		} else {
			return result.toString();
		}
	}

	private JsonNode checkResult(String result, WsResponse response) {
		JsonNode jn;
		if (result == null || result.length() == 0) {
			response.setError(-3201);
			return null;
		} else {
			try {
				//jn = JsonUtil.stringToJsonNode(result);
				jn = om.readValue(result, JsonNode.class);

				if (!jn.get("status").asText().equals("0")) {
					int i = jn.get("status").asInt();
					if (jn.get("msg") != null)
						response.setError(i - 3000, jn.get("msg").asText());
					else response.setError(i - 3000);
					return null;
				}
			} catch (Exception e) {
				logger.error(RetCode.getDesc(-3202), e);
				response.setError(-3202);
				return null;
			}
		}
		return jn;
	}

	private HttpPost createPost() {
		HttpPost post = new HttpPost(TRADE_URL);
		post.setHeader("Accept", REQ_ACCEPT);
		post.setHeader("Content-Type", REQ_CONTENT_TYPE);
		return post;
	}

//	/**
//	 * 重写验证方法，取消检测ssl
//	 */
////	private static TrustManager truseAllManager = new X509TrustManager(){
////
////		public void checkClientTrusted(
////				java.security.cert.X509Certificate[] arg0, String arg1) {
////			// TODO Auto-generated method stub
////
////		}
////
////		public void checkServerTrusted(
////				java.security.cert.X509Certificate[] arg0, String arg1) {
////			// TODO Auto-generated method stub
////
////		}
////
////		public java.security.cert.X509Certificate[] getAcceptedIssuers() {
////			// TODO Auto-generated method stub
////			return null;
////		}
////
////	};
//
//	private static CloseableHttpClient enableSSL(){
//		HttpClientBuilder builder = HttpClientBuilder.create();
//		SSLConnectionSocketFactory sslConnectionFactory =
//				new SSLConnectionSocketFactory(context, SSLConnectionSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
//		builder.setSSLSocketFactory(sslConnectionFactory);
//
//		Registry<ConnectionSocketFactory> registry = RegistryBuilder.<ConnectionSocketFactory>create()
//				.register("https", sslConnectionFactory)
//				.build();
//
//		HttpClientConnectionManager ccm = new BasicHttpClientConnectionManager(registry);
//
//		builder.setConnectionManager(ccm);
//
//		return builder.build();
//
//		//调用ssl
////		try {
////			SSLContext sslcontext = SSLContext.getInstance("TLS");
////			sslcontext.init(null, new TrustManager[] { truseAllManager }, null);
////			SSLSocketFactory sf = new SSLSocketFactory(sslcontext);
////
////			sf.setHostnameVerifier(SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
////			Scheme https = new Scheme("https", sf, 443);
////			httpclient.getConnectionManager().getSchemeRegistry().register(https);
////		} catch (Exception e) {
////			e.printStackTrace();
////		}
//	}
//
//	public static void main(String[] args) {
//		CloseableHttpClient httpClient = null;
//
//		SSLContext sslContext = new SSLContextBuilder().loadTrustMaterial(null, new TrustStrategy() {
//			public boolean isTrusted(X509Certificate[] x509Certificates, String s) throws CertificateException {
//				return true;
//			}
//		}).build();
//
//		//HttpClient httpClient = new DefaultHttpClient();
//		CloseableHttpClient httpClient = enableSSL();
//		try {
//			KeyStore trustStore = KeyStore.getInstance(KeyStore.getDefaultType());
//			InputStream in = TradeConn.class.getResourceAsStream("xxx.keystore");
//			trustStore.load(in, "123456".toCharArray());
//			in.close();
//			SSLSocketFactory socketFactory = new SSLSocketFactory(trustStore);
//			Scheme sch = new Scheme("https", 443, socketFactory);
//			httpClient.getConnectionManager().getSchemeRegistry().register(sch);
//
//			HttpPost httpPost = new HttpPost(TRADE_URL);
//			System.out.println("executing request" + httpPost.getRequestLine());
//			// 执行请求
//			HttpResponse response = httpClient.execute(httpPost);// 获得响应实体
//			HttpEntity entity = response.getEntity();
//
//			System.out.println("----------------------------------------");
//			System.out.println(response.getStatusLine());
//			System.out.println(entity);
//			if (entity != null) {
//				System.out.println("Response content length: " + entity.getContentLength());
//			}
//			// 销毁实体
//			EntityUtils.consume(entity);
//		} catch (IOException | KeyStoreException | NoSuchAlgorithmException | CertificateException | KeyManagementException | UnrecoverableKeyException e) {
//			e.printStackTrace();
//		} catch (java.security.cert.CertificateException e) {
//			e.printStackTrace();
//		} finally {
//			// 当不再需要HttpClient实例时,关闭连接管理器以确保释放所有占用的系统资源
//			httpClient.getConnectionManager().shutdown();
//		}
//	}
}

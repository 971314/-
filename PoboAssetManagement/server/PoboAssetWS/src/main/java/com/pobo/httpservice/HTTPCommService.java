package com.pobo.httpservice;

import com.pobo.exception.AmException;
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
	private	String DEFAULT_CHARSET = "UTF-8";

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
			throw new AmException("Http Post 请求参数解析错误，");
		}

		if (content.length() > MAXLENGTH) {
			logger.debug("Http PostRequest: URL=[{}]\tParams=[{}]", httpPost.getURI(), content.substring(0, MAXLENGTH));
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
				throw new AmException("Http Response ERROR! Status Code = " + statusCode + ", Reason = "
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
}

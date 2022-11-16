package top.zymdb.eb.reader.util;
import top.zymdb.eb.reader.constants.HttpConstants;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;

public class SentRequest {
    //发送get请求
    public static String sendGet(String url, String contentType) {
        StringBuffer result = new StringBuffer();
        BufferedReader in = null;
        try {
            URL realURL = new URL(url);
            HttpURLConnection conn = (HttpURLConnection) realURL.openConnection();
            conn.setConnectTimeout(10000);
            conn.setReadTimeout(10000);
            conn.setRequestProperty("Content-Type",contentType);
            conn.setRequestProperty("accept", "*/*");
            conn.setRequestProperty("connection", "close");
            conn.setRequestProperty("user-agent", HttpConstants.AGENT);
            conn.connect();
            if (conn.getResponseCode() == 200) {
                in = new BufferedReader(
                        new InputStreamReader(conn.getInputStream(), "utf-8"));
                String line = null;
                while ((line = in.readLine()) != null) {
                    result.append(line);
                }
            } else {
                in = new BufferedReader(
                        new InputStreamReader(conn.getErrorStream(), "utf-8"));
                String line = null;
                while ((line = in.readLine()) != null) {
                    System.out.println(line);
                }
                return null;
            }
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        } finally {
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return result.toString();
    }
    //发送请求
    public static String sendPost(String url, String contentType) {
        StringBuffer result = new StringBuffer();
        PrintWriter out = null;
        BufferedReader in = null;
        try {
            URL realUrl = new URL(url);
            HttpURLConnection conn = (HttpURLConnection) realUrl.openConnection();
            conn.setConnectTimeout(10000);
            conn.setReadTimeout(10000);
            conn.setRequestProperty("Content-Type",contentType);
            conn.setRequestProperty("accept", "*/*");
            conn.setRequestProperty("connection", "close");
            conn.setRequestProperty("user-agent",HttpConstants.AGENT);
            conn.setDoOutput(true);
            conn.setDoInput(true);
            out = new PrintWriter(conn.getOutputStream());
            out.print(contentType);
            out.flush();
            if (conn.getResponseCode() == 200) {
                in = new BufferedReader(
                        new InputStreamReader(conn.getInputStream(), "utf-8"));
                String line = null;
                while ((line = in.readLine()) != null) {
                    result.append(line);
                }
            }else {
                in = new BufferedReader(
                        new InputStreamReader(conn.getErrorStream(), "utf-8"));
                String line = null;
                while ((line = in.readLine()) != null) {
                    System.out.println(line);
                }
                return null;
            }
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        } finally {
            if (out != null) {
                out.close();
            }
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return result.toString();
    }

}

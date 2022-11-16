package top.zymdb.eb.reader.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import top.zymdb.eb.reader.entity.RequestInfo;
import top.zymdb.eb.reader.util.SentRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLDecoder;
@Controller
public class HTMLController {
    @RequestMapping("/getHtml")
    void getHTMLByURL(@RequestBody RequestInfo requestInfo, HttpServletResponse response) throws IOException{
        response.setCharacterEncoding("UTF-8");
        String contentType;
        String url = URLDecoder.decode(requestInfo.getUrl(),"UTF-8");
        // 配置请求参数
        if ( url.contains("cnblogs") ) {
            contentType = "text/html;charset=utf-8";
            // queryKey = ".post";
        } else {
            contentType = "application/json;charset=UTF-8";
            // queryKey = "article";
        }
        String result = SentRequest.sendGet(url,contentType);
        response.getWriter().write(result);
    }


}

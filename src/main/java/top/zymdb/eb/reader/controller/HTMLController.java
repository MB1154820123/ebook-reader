package top.zymdb.eb.reader.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import top.zymdb.eb.reader.util.HttpUtil;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLDecoder;

@Controller
public class HTMLController {

    @RequestMapping("/getHtml")
    void getHTMLByURL(@RequestBody String url, HttpServletResponse response) throws IOException {
        response.setCharacterEncoding("UTF-8");
        url = URLDecoder.decode(url.replace("url=",""),"UTF-8");
        url = url.startsWith("http")?url:"https://"+url;
        System.out.println("***************Url:"+url);
        String result = HttpUtil.sendRequest(url,"GET");
        result = result.replaceAll("(<body>)([.]*)(</body>)","$2");
        System.out.println("***************Rs:"+result);
        response.getWriter().write(result);
    }
    @RequestMapping("/goHtml")
    String goHtml(){
        return "textExtraDom";
    }
}

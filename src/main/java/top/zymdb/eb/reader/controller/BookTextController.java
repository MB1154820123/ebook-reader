package top.zymdb.eb.reader.controller;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import top.zymdb.eb.reader.entity.BookText;
import top.zymdb.eb.reader.mapper.BookTextMapper;
import top.zymdb.eb.reader.mapper.BookTitleMapper;
import top.zymdb.eb.reader.util.StringOperator;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Controller
public class BookTextController {
    @Autowired
    BookTextMapper btm;
    @Autowired
    BookTitleMapper blm;

    @RequestMapping(value = "/selectAllText")
    void selectAllText(HttpServletResponse response) throws IOException {
        response.setCharacterEncoding("UTF-8");
        List<BookText> texts = btm.queryAll();
        String rss = "";
        String ae = "";
        // 处理结果：
        /**
         * 目标结果：
         *     <h1>第一部 基础知识</h1>
         *     <h2>第1章 算法在计算中的作用</h2>
         *     <div class="duan">
         *         <p class="hang">算法是什么？</p>
         *         <p class="hang">为什么要研究算法？</p>
         *         <p class="hang">算法的作用是什么？</p>
         *     </div>
         *     <h3 class="jie_title">1.1 算法</h3>
         *     <div class="duan">
         *         <p class="hang">算法是定义良好的计算过程，它取一个或一组值作为输入，并产生出一个或一组值作为输出。</p>
         *         <p class="hang">算法是一系列的计算步骤，将输入数据转换成输出结果。</p>
         *     </div>
         */
        for ( BookText text : texts ) {
            boolean hasP = false; // 有代码
            boolean hasU = false; // 有ul
            boolean hasO = false; // 有ol

            String before = "";
            String after = "";
            ae = text.getExpressionAnalytical(); // 分析表达
            /**
            *String oe =  text.getExpressionOriginal(); // 原始表达
            *String te = text.getExpressionTranslation(); // 翻译表达
            **/
            String bc = text.getContentBefore(); // 前文本 h1-h2..
            String ac = text.getContentAfter(); // 后文本 h1-h2..
            if ( null != bc && "" != bc ) {
                String[] bts = bc.split("-");
                for (String b : bts) {
                    if (b.equals("d")) {
                        before += "<div class=duan>";
                    } else if (b.equals("b")){
                        before += "<div class=bu>";
                    }  else if ( b.startsWith("h") ) {
                        before += "<" + b + ">" + blm.queryByBookTitleId(b.replaceAll("[a-z]*", "")).getTitleContent() + "</" + b + ">";
                    }else if (b.equals("_")){
                        before += "</div>";
                    }
                }
            }
            /**
            if ( null != ac && hasProcess) {
                String[] ats = ac.split("-");
                for (String a : ats) {
                    if (a.equals("d")) {
                        after += "<div class=duan>";
                    } else if (a.startsWith("h")) {
                        after += "<" + a + ">" + blm.queryByBookTitleId(a.replaceAll("[a-z]*", "")).getTitleContent() + "</" + a + ">";
                    } else if (a.equals("_d")) {
                        after += "</div><div class=duan>";
                    }
                }
                hasProcess = false;
            }
            */
            if ( ! StringOperator.checkContainsPunctuation(ae) ) { // 是否包含标点符号
                rss += before + "<h5>" + ae + "</h5>";
            } else {
                rss += before + "<p class=hang>" + ae + "</p>";
            }
            }
            // 格式化HTML
            Document doc = Jsoup.parseBodyFragment(rss);
            rss = doc.body().html();
            response.getWriter().write(rss);
        }

    }

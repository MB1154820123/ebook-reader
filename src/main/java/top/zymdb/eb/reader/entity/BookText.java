package top.zymdb.eb.reader.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookText {
    /**
     * 原文表达
     */
    private String expressionOriginal;
    /**
     * 表达评论（评论原文表达的得失、解释为什么需要分析表达）
     */
    private String expressionComment;
    /**
     * 分析表达
     */
    private String expressionAnalytical;
    /**
     * 译文内容
     */
    private String expressionTranslation;
    /**
     * 前置内容
     */
    private String contentBefore;
    /**
     * 后置内容
     */
    private String contentAfter;
    /**
     * 书籍id
     */
    private Integer bookId;
    /**
     * 段落id
     */
    private Integer paragraphId;
    /**
     * 句子id
     */
    private Integer sentenceId;
    /**
     * 书籍网址
     */
    private String bookUrl;
    /**
     * 排序值
     */
    private Long sortVal;
    /**
     * 添加时间
     */
    private Date insertTime;
    /**
     * 更新时间
     */
    private Date updateTime;
    /**
     * 1中文2英文
     */
    private Integer langOriginal;
    /**
     * 内容id
     */
    private Long textId;
}


package top.zymdb.eb.reader.entity;

import lombok.Data;

@Data
public class RequestInfo {
    private String url;
    private String contentType;
    private String requestType;
    private String content;
}

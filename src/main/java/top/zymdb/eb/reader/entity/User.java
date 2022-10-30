package top.zymdb.eb.reader.entity;

import lombok.Data;

@Data
public class User {
    private Long userId;
    private String nickname;
    private String password;
    private String email;
    private String headImgUrl;
}

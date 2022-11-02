package top.zymdb.eb.reader.entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookInfo {
    /**
     * 记录Id
     */
     private Long infoId;
    /**
     * 书籍编码
     */
     private String isbn;
    /**
     * 书籍标题
     */
     private String title;
    /**
     * 书籍作者
     */
     private String author;
    /**
     * 书籍描述
     */
     private String description;
    /**
     * 读者Id
     */
     private Long readerId;
    /**
     * 类别 -> 1：计算机 2：金融 3：文学 4.网页
     */
     private Integer category;
}


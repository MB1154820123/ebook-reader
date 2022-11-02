package top.zymdb.eb.reader.entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookTitle {
    /**
     * 标题Id
     */
     private Long titleId;
    /**
     * 标题类型：1部标题2章标题3节标题4小节标题
     */
     private Integer titleType;
    /**
     * 标题内容
     */
     private String titleContent;
    /**
     * 创建时间
     */
     private Date createTime;
    /**
     * 修改时间
     */
     private Date modifyTime;
}


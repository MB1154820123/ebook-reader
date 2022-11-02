package top.zymdb.eb.reader.entity;
import com.baomidou.mybatisplus.annotation.TableField;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookNote {
    /**
     * 创建者Id
     */
     private Long creatorId;
    /**
     * 笔记内容
     */
     private String noteContent;
    /**
     * 评论内容
     */
     private String commentContent;
    /**
     * 创建时间
     */
     private Date createTime;
    /**
     * 修改时间
     */
     private Date modifyTime;
    /**
     * 笔记Id
     */
     private Long noteId;
    /**
     * 笔记位置
     */
     private String notePosition;
    /**
     * 清除笔记类别 -> 1：清除划线 2：清除划线和笔记
     */
    @TableField(exist = false)
    private Integer clearType;
}


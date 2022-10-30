package top.zymdb.eb.reader.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Note {
    private Long sortId;
    private Long creatorId;
    private String notesId;
    private String noteContent;
    private String commentContent;
    private Date createTime;
    private Date modifyTime;
    private Integer clearType;
    private String notesIdNewColor;
    private String newNotesId;
}

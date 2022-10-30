package top.zymdb.eb.reader.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import top.zymdb.eb.reader.entity.Note;

import java.util.List;

/**
 * (Note)表数据库访问层
 *
 * @author makejava
 * @since 2022-10-18 19:58:15
 */
@Mapper
public interface NoteMapper {

    /**
     * 通过ID查询单条数据
     *
     * @param notesId 主键
     * @return 实例对象
     */
    Note queryById(String notesId);

    /**
     * 查询所有数据
     * @return 实例对象
     */
    List<Note> queryAll();

    /**
     * 查询所有Id
     * @return 实例对象
     */
    String[] queryIds();

    /**
     * 新增数据
     *
     * @param note 实例对象
     * @return 影响行数
     */
    int insert(Note note);

    /**
     * 修改数据
     *
     * @param note 实例对象
     * @return 影响行数
     */
    int update(Note note);

    /**
     * 通过主键删除数据
     *
     * @param notesId 主键
     * @return 影响行数
     */
    int deleteById(String notesId);

    void notesIdSub(@Param("ids") List<String> ids);

    String haveNotes(String id);

    String getLastNotesId();

    void updateNotesId(Note note);

    boolean hasNote(@Param("notesId") String notesId);
}

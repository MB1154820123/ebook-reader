package top.zymdb.eb.reader.service;

import top.zymdb.eb.reader.entity.Note;

/**
 * (Note)表服务接口
 *
 * @author makejava
 * @since 2022-10-18 19:58:15
 */
public interface NoteService {

    /**
     * 通过ID查询单条数据
     *
     * @param notesId 主键
     * @return 实例对象
     */
    Note queryById(String notesId);

    /**
     * 新增数据
     *
     * @param note 实例对象
     * @return 实例对象
     */
    Note insert(Note note);

    /**
     * 修改数据
     *
     * @param note 实例对象
     * @return 实例对象
     */
    Note update(Note note);

    /**
     * 通过主键删除数据
     *
     * @param notesId 主键
     * @return 是否成功
     */
    boolean deleteById(String notesId);

}

package top.zymdb.eb.reader.service.impl;

import org.springframework.stereotype.Service;
import top.zymdb.eb.reader.entity.Note;
import top.zymdb.eb.reader.mapper.NoteMapper;
import top.zymdb.eb.reader.service.NoteService;

import javax.annotation.Resource;

/**
 * (Note)表服务实现类
 *
 * @author makejava
 * @since 2022-10-18 19:58:15
 */
@Service("noteService")
public class NoteServiceImpl implements NoteService {
    @Resource
    private NoteMapper noteMapper;

    /**
     * 通过ID查询单条数据
     *
     * @param notesId 主键
     * @return 实例对象
     */
    @Override
    public Note queryById(String notesId) {
        return this.noteMapper.queryById(notesId);
    }
    /**
     * 新增数据
     *
     * @param note 实例对象
     * @return 实例对象
     */
    @Override
    public Note insert(Note note) {
        this.noteMapper.insert(note);
        return note;
    }

    /**
     * 修改数据
     *
     * @param note 实例对象
     * @return 实例对象
     */
    @Override
    public Note update(Note note) {
        this.noteMapper.update(note);
        return this.queryById(note.getNotesId());
    }

    /**
     * 通过主键删除数据
     *
     * @param notesId 主键
     * @return 是否成功
     */
    @Override
    public boolean deleteById(String notesId) {
        return this.noteMapper.deleteById(notesId) > 0;
    }
}

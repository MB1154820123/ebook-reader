package top.zymdb.eb.reader.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import top.zymdb.eb.reader.entity.Note;
import top.zymdb.eb.reader.mapper.NoteMapper;
import top.zymdb.eb.reader.util.StringOperator;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

// @RestController 无法返回页面
@Controller
public class ReadingNoteController {
    @Autowired
    NoteMapper noteMapper;
    @RequestMapping(value = "/toReader")
    String toReader(){
        return "《算法导论》";
    }

    @RequestMapping(value = "/addNote")
    void addNote(@RequestBody Note note, HttpServletResponse response) throws IOException {
        response.setCharacterEncoding("UTF-8");
        Note temp = noteMapper.queryById(note.getNotesId());
        if ( null == temp ){
            if ( !note.getNotesId().contains("undefined")) {
                int i = noteMapper.insert(note);
                if (i == 1) {
                    response.getWriter().write("笔记添加成功");
                } else {
                    response.getWriter().write("笔记添加失败");
                }
            }
        } else {

            if (  null != temp.getNoteContent()  ) {
                int j = noteMapper.update(note);
                if (j == 1) {
                    response.getWriter().write("笔记更新成功");
                } else {
                    response.getWriter().write("笔记更新失败");
                }
            }
            if (  null == temp.getNoteContent() || "" == temp.getNoteContent() ) {
                int j = noteMapper.update(note);
                if (j == 1) {
                    response.getWriter().write("笔记添加成功");
                } else {
                    response.getWriter().write("笔记添加失败");
                }
            }
        }
    }


    @RequestMapping(value = "/clearNote")
    void clearNote(@RequestBody Note note, HttpServletResponse response) throws IOException {
        response.setCharacterEncoding("UTF-8");
        Note temp = noteMapper.queryById(note.getNotesId());
        if ( null != temp ) {
            if ( note.getClearType() == 1 ) { // 仅清除划线
                String noteId = note.getNotesId();
                if (hasNote(noteId)){ // 如果有笔记，提示弹框
                response.getWriter().write("划线存在笔记，是否一并删除？");
                } else { // 如果没有笔记，直接删除划线
                noteMapper.deleteById(noteId);
                }
                /**
                String newColor = noteId.replaceAll(noteId.split("-")[4],"black");
                note.setNotesIdNewColor(newColor);
                int rc =noteMapper.update(note);
                if ( rc == 1 ){
                    response.getWriter().write("划线清除成功");
                } else {
                    response.getWriter().write("未知错误");
                }
                */
            } else if ( note.getClearType() == 2 ) { // 删除笔记
                int rc = noteMapper.deleteById(note.getNotesId());
                if ( rc == 1 ){
                    response.getWriter().write("划线和笔记清除成功");
                } else {
                    response.getWriter().write("未知错误");
                }
            }

        } else {
            response.getWriter().write("错误，不存在的笔记内容");
        }
    }
    @RequestMapping(value = "/selectNote")
    void selectNote(@RequestBody Note note,HttpServletResponse response) throws IOException {
        response.setCharacterEncoding("UTF-8");
        Note temp = noteMapper.queryById(note.getNotesId());
        if ( null != temp && null != temp.getNoteContent() ) {
            response.getWriter().write(temp.getNoteContent());
        } else {
            response.getWriter().write("null");
        }
    }

    @RequestMapping(value = "/selectNotesIds")
    void selectNoteIds(HttpServletResponse response) throws IOException {
        String ids = "";
        response.setCharacterEncoding("UTF-8");
        String noteIds[] = noteMapper.queryIds();
        for (String noteId : StringOperator.getStrings(noteIds)) {
            ids += noteId+",";
        }
        response.getWriter().write(ids.replaceAll(",$",""));
    }

    @RequestMapping(value = "/getLastNotesId")
    void getLastNotesId(HttpServletResponse response) throws IOException {
        response.setCharacterEncoding("UTF-8");
        String lastId = noteMapper.getLastNotesId();
        response.getWriter().write(lastId);
    }
    @RequestMapping(value = "/updateNotesId")
    void updateNotesId(@RequestBody Note note,HttpServletResponse response) throws IOException {
        response.setCharacterEncoding("UTF-8");
        noteMapper.updateNotesId(note);
        response.getWriter().write("ID更新成功");
    }




    @RequestMapping(value = "/dealAfterClearNote")
    void dealAfterClearNote(HttpServletRequest request, HttpServletResponse response) throws IOException{
        // 设置response缓冲区的编码
        response.setCharacterEncoding("UTF-8");
        // 设置浏览器打开文件所采用的编码
        response.setHeader("Content-Type", "text/html;charset=UTF-8");

        String ids = request.getParameter("ids");
        String id = request.getParameter("id");
        String type = noteMapper.haveNotes(id);
        // 删除数据库中对应的Id
        noteMapper.deleteById(id);
        // 将数据库中与删除的内容相关的内容Id全部减1
        noteMapper.notesIdSub(Arrays.asList(ids.split(",")));
        response.getWriter().write("{'type':"+type+"}");
    }

    private boolean hasNote(String noteId){
       return noteMapper.hasNote(noteId);
    }
}

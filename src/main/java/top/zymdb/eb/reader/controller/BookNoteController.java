package top.zymdb.eb.reader.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import top.zymdb.eb.reader.entity.BookNote;
import top.zymdb.eb.reader.mapper.BookNoteMapper;
import top.zymdb.eb.reader.util.StringOperator;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
// @RestController 无法返回页面
@Controller
public class BookNoteController {
    @Autowired
    BookNoteMapper noteMapper;
    @RequestMapping(value = "/toReader")
    String toReader(){
        return "《算法导论》";
    }

    @RequestMapping(value = "/addNote")
    void addNote(@RequestBody BookNote note, HttpServletResponse response) throws IOException {
        response.setCharacterEncoding("UTF-8");
        BookNote temp = noteMapper.queryByNotePosition(note.getNotePosition());
        if ( null == temp ){
            if ( !note.getNotePosition().contains("undefined")) {
                int i = noteMapper.insert(note);
                if (i == 1) {
                    response.getWriter().write("笔记添加成功");
                } else {
                    response.getWriter().write("笔记添加失败");
                }
            }
        } else {

            if (  null != temp.getNoteContent()  ) {
                int j = noteMapper.updateByNotePosition(note);
                if (j == 1) {
                    response.getWriter().write("笔记更新成功");
                } else {
                    response.getWriter().write("笔记更新失败");
                }
            }
            if (  null == temp.getNoteContent() || "" == temp.getNoteContent() ) {
                int j = noteMapper.updateByNotePosition(note);
                if (j == 1) {
                    response.getWriter().write("笔记添加成功");
                } else {
                    response.getWriter().write("笔记添加失败");
                }
            }
        }
    }

    @RequestMapping(value = "/clearNote")
    void clearNote(@RequestBody BookNote note, HttpServletResponse response) throws IOException {
        response.setCharacterEncoding("UTF-8");
        BookNote temp = noteMapper.queryByNotePosition(note.getNotePosition());
        if ( null != temp ) {
            if ( note.getClearType() == 1 ) { // 仅清除划线
                String notePosition = note.getNotePosition();
                if ( hasBookNoteByNotePosition(notePosition) ){ // 如果有笔记，提示弹框
                response.getWriter().write("划线存在笔记，是否一并删除？");
                } else { // 如果没有笔记，直接删除划线
                noteMapper.deleteByNotePosition(notePosition);
                }
            } else if ( note.getClearType() == 2 ) { // 删除笔记
                int rc = noteMapper.deleteByNotePosition(note.getNotePosition());
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
    @RequestMapping(value = "/selectNoteByPosition")
    void selectNoteByPosition(@RequestBody BookNote note,HttpServletResponse response) throws IOException {
        response.setCharacterEncoding("UTF-8");
        BookNote temp = noteMapper.queryByNotePosition(note.getNotePosition());
        if ( null != temp && null != temp.getNoteContent() ) {
            response.getWriter().write(temp.getNoteContent());
        } else {
            response.getWriter().write("null");
        }
    }

    @RequestMapping(value = "/selectNotePositions")
    void selectNotePositions(HttpServletResponse response) throws IOException {
        String ids = "";
        response.setCharacterEncoding("UTF-8");
        String notePositions[] = noteMapper.queryBookNotePositions();
        for (String notePosition : StringOperator.getStrings(notePositions)) {
            ids += notePosition+",";
        }
        response.getWriter().write(ids.replaceAll(",$",""));
    }

    @RequestMapping(value = "/getLastNotePosition")
    void getLastNotePosition(HttpServletResponse response) throws IOException {
        response.setCharacterEncoding("UTF-8");
        String lastId = noteMapper.getLastBookNotePosition();
        response.getWriter().write(lastId);
    }

    private boolean hasBookNoteByNotePosition(String notePosition){
       return noteMapper.hasBookNoteByNotePosition(notePosition);
    }
}

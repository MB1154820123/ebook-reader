package top.zymdb.eb.reader.mapper;
import top.zymdb.eb.reader.entity.BookNote;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;
@Mapper
public interface BookNoteMapper {
    // 通用业务员
    int insert(BookNote bookNote);
    int deleteByBookNoteId(Long bookNoteId);
    int deleteByNotePosition(String notePosition);
    int update(BookNote bookNote);
    int updateByNotePosition(BookNote bookNote);
    List<BookNote> queryAll();
    BookNote queryByBookNoteId(Long bookNoteId);
    BookNote queryByNotePosition(String notePosition);
    // 专用业务
    String[] queryBookNotePositions();
    String getLastBookNotePosition();
	boolean hasBookNoteByBookNoteId(@Param("bookNoteId") Long bookNoteId);
	boolean hasBookNoteByNotePosition(@Param("notePosition") String notePosition);
}

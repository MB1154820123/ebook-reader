package top.zymdb.eb.reader.mapper;
import top.zymdb.eb.reader.entity.BookTitle;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;
@Mapper
public interface BookTitleMapper {
    // 通用业务
    int insert(BookTitle bookTitle);
    int deleteByBookTitleId(String bookTitleId);
    int update(BookTitle bookTitle);
    List<BookTitle> queryAll();
    BookTitle queryByBookTitleId(String bookTitleId);
    int insertBatch(List<BookTitle> BookTitles);
    int insertOrUpdateBatch(List<BookTitle> BookTitles);
}

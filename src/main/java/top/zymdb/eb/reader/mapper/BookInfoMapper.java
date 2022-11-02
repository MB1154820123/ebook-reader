package top.zymdb.eb.reader.mapper;
import top.zymdb.eb.reader.entity.BookInfo;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;
@Mapper
public interface BookInfoMapper {
    // 通用业务
    int insert(BookInfo bookInfo);
    int deleteByBookInfoId(String bookInfoId);
    int update(BookInfo bookInfo);
    List<BookInfo> queryAll();
    BookInfo queryByBookInfoId(String bookInfoId);
    int insertBatch(List<BookInfo> BookInfos);
    int insertOrUpdateBatch(List<BookInfo> BookInfos);
}

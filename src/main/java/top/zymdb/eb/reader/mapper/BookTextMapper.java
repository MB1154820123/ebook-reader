package top.zymdb.eb.reader.mapper;

import top.zymdb.eb.reader.entity.BookText;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BookTextMapper {
    // 通用业务
    int insert(BookText bookText);

    int deleteByBookTextId(String bookTextId);

    int update(BookText bookText);

    List<BookText> queryAll();

    BookText queryByBookTextId(String bookTextId);

    int insertBatch(List<BookText> BookTexts);

    int insertOrUpdateBatch(List<BookText> BookTexts);
}

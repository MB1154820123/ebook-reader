package top.zymdb.eb.reader;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import top.zymdb.eb.reader.entity.BookInfo;
import top.zymdb.eb.reader.mapper.BookInfoMapper;

@SpringBootTest
class EbookReaderApplicationTests {
    @Autowired
    BookInfoMapper bim;
    @Test
    void contextLoads() {
        for (BookInfo bi : bim.queryAll()) {
            System.out.println(bi);
        }
    }

}

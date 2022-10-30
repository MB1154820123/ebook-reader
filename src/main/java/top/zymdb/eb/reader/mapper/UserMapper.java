package top.zymdb.eb.reader.mapper;

import org.apache.ibatis.annotations.Mapper;
import top.zymdb.eb.reader.entity.User;

/**
 * (User)表数据库访问层
 *
 * @author makejava
 * @since 2022-10-18 19:58:14
 */
@Mapper
public interface UserMapper {

    /**
     * 通过ID查询单条数据
     *
     * @param userId 主键
     * @return 实例对象
     */
    User queryById(Long userId);



}

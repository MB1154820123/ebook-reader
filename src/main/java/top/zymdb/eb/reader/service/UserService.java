package top.zymdb.eb.reader.service;


import top.zymdb.eb.reader.entity.User;

/**
 * (User)表服务接口
 *
 * @author makejava
 * @since 2022-10-18 19:58:12
 */
public interface UserService {

    /**
     * 通过ID查询单条数据
     *
     * @param userId 主键
     * @return 实例对象
     */
    User queryById(Long userId);

}

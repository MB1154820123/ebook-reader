package top.zymdb.eb.reader.service.impl;
import org.springframework.stereotype.Service;
import top.zymdb.eb.reader.entity.User;
import top.zymdb.eb.reader.mapper.UserMapper;
import top.zymdb.eb.reader.service.UserService;

import javax.annotation.Resource;

/**
 * (User)表服务实现类
 *
 * @author makejava
 * @since 2022-10-18 19:58:13
 */
@Service("userService")
public class UserServiceImpl implements UserService {
    @Resource
    private UserMapper userMapper;

    /**
     * 通过ID查询单条数据
     *
     * @param userId 主键
     * @return 实例对象
     */
    @Override
    public User queryById(Long userId) {
        return this.userMapper.queryById(userId);
    }
}

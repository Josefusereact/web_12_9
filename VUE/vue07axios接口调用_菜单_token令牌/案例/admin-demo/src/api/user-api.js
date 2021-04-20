import api from '../http';
// 初步定义login函数，通过api中的http功能将登录实现
export const login = (username, password) => {
    return api.http({
        method: 'POST',
        url: '/user/login',
        data: {
            username,
            password
        }
    });
}
// 初步定义获取菜单函数，通过api中的http功能将获取登录实现
export const getMenuList = () => {
    return api.http({
        method: 'GET',
        url: '/user/menu/list',
    }).catch(err => err);
}
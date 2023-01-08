import Mock from 'mockjs'
import homeApi from './mockServerData/home'
import user from './mockServerData/user'

//定义mock请求拦截

Mock.mock('/mock/home/getData',homeApi.getStatisticalData)

//用户列表数据 创建 编辑 删除 获取
Mock.mock('/mock/user/add','post',user.createUser)
Mock.mock('/mock/user/edit','post',user.updateUser)
Mock.mock('/mock/user/del','post',user.deleteUser)
Mock.mock('/mock/user/getUser',user.getUserList)
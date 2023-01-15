// import requests from '@/utils/request'
import mockRequest from "@/utils/mockRequest";

//请求首页数据

export const getData = () => {
  //返回一个promise对象
  return mockRequest.get("/home/getData");
};

//用户列表数据

export const getUser = (params) => {
  //返回用户列表
  return mockRequest.get("/user/getUser", params);
};

export const addUser = (data) => {
  //新增用户
  return mockRequest.post('/user/add',data);
};
export const editUser = (data) => {
    //编辑用户
    return mockRequest.post("/user/edit",data );
  };

  export const delUser = (data) => {
    //删除用户
    return mockRequest.post("/user/del",data );
  };

  //登录接口 换成对象形式写一下
export const getMenu=(data)=>{
  return mockRequest.post('/permission/getMenu',data)
}

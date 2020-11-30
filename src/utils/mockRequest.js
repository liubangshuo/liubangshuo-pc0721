/*
 封装axios拦截器
  1. 设置公共的请求地址前缀
  2. 请求拦截器: 添加公共参数
  3. 响应拦截器:
    成功: 返回成功的promise, 值为成功的数据
    失败: 返回失败的promise, 值为失败的原因
*/ 
import axios from "axios";
import { Message } from "element-ui";
// 引入进度条插件
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const instance = axios.create({
 // 就是当前服务器地址
 baseURL: "/mock", // 公共的基础路径
 headers: {

 },
});

//设置请求拦截器
instance.interceptors.request.use(
 (config) => {
  // config 请求的配置的对象
  // 将来发送请求(请求地址,请求参数,请求方式等) 都会在config中找

  // 开始进度条
  NProgress.start();

  return config;
 }
 // 初始化Promise.resolve()返回默认成功的Promise,只会触发成功的回调

);
// 设置响应拦截器
instance.interceptors.response.use(
 // 响应成功: 当响应状态码为 2xx
(response) => {
 /*
   响应成功不能代表功能成功 只是代表有响应结果
    功能成功是否成功看 code
    成功：200
    失败：201 20

  返回一个具体为
   成功: 成功的数据
   失败：失败的原因

   response的数据结构:
   {
    headers: {},
    status: {},
    request: {},
    data: { // 响应的数据
     code: 200,
     message: "成功",
     data:{
      nickName: "Administrator",
      name: "Admin",
      token: 随机数
     },
     ok: true
    }
   }
 */ 
// 进度条结束
NProgress.done();
   //判断响应的code是否是200
   if (response.data.code === 200) {
    // 返回成功的响应数据
    return response.data.data;
   }

   const { Message } = response.data;
   // 提示错误
   Message.error(message);
   // 功能失败 -》 返回失败的Promise
   return Promise.reject(message);
},
// 响应失败： 当响应状态码不是 2xx
(error) => {
 // 进度条结束
 NProgress.done();
 const message = error.message || "网络错误";
 // 提示错误
 Message.error(messaee);
 return Promise.reject(message);
}
);

export default instance;
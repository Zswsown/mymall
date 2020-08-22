import axios from 'axios'

export function request(config){
  // 1.创建axios实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:8000/api/z8',
    timeout:10000
  })
  // 2.请求拦截
  instance.interceptors.request.use(config=>{
    // console.log("请求拦截成功")
    return config
  },err=>{
    // console.log("请求拦截失败")
    // 抛出异常
    // throw err
    console.log(err)
  })
  // 3.响应拦截
  instance.interceptors.response.use(res=>{
    // console.log("响应拦截成功")
    return res
  },err=>{
    // console.log("响应拦截失败")
    console.log(err)
    // 判断错误代码类型
    if(err&&err.response){
      switch(err.response.status){
        case 400:
          err.message="请求失败"
          break
        case 401:
          err.message="未授权的访问"
          break
      }
    }
    // 抛出异常
    throw err
  })

  // 2.传入配置进行网络请求
  return instance(config)
}

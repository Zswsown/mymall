import {request} from "./request";

// 请求首页的多条数据，如轮播图图片等
export function getMultiData(){
  return request({
    url:'/home/multidata'
  })
}

// 请求标题内的商品数据
export function getHomeGoodsData(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}

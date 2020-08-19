import {request} from "./request";

// 请求商品详情数据
export function getGoodsItemDetail(iid){
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}

// 随机生成推荐数据
function randomPage(){
  return Math.ceil(Math.random()*3)+1;
}

let type='pop'
let page=randomPage();

// 请求详情页的商品推荐数据
export function getRecommend(){
  // return request({
  //   url:'/recommend'
  // })
  return request({
    url: '/home/data',
    params: {
      type,
      page,

    }
  })
}

// 封装一个商品Goods类，便于在请求来的复杂数据中只取到商品的数据
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.nowPrice = itemInfo.highNowPrice;
  }
}

// 封装一个店铺Shop类，便于在请求来的复杂数据中只取到店铺的数据
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

// 封装一个商品信息参数GoodsParam类，便于在请求来的复杂数据中只取到商品参数的数据
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images : '';
    this.infos = info.set;
    this.sizes = rule ? rule.tables : '';
  }
}



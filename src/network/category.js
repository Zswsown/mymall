import {request} from './request'

// 请求分类标签的数据
export function getCategory() {
  return request({
    url: '/category'
  })
}

//请求分类标签的子分类标签的数据
export function getSubcategory(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

//请求分类标签对应的商品数据
export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}

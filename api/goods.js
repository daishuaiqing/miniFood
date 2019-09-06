const { request } = require('../utils/util.js');
const { baseUrl } = require('./base.js');

export const getGoodsList = info => {
    return request(baseUrl+'/pms/goods/wxList',{
        categoryId: info.categoryId,
        pageNum: info.pageNum
    })
}
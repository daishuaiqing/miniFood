const { request } = require('../utils/util.js');
const { baseUrl } = require('./base.js');

export const getCategoryList = info => {
    return request(baseUrl+'/pms/category/find/wxAll')
}
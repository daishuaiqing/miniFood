const { request } = require('../utils/util.js');
const { baseUrl } = require('./base.js');

export const createOrder = info => {
    return request(baseUrl+'/oms/order/add',info,"POST")
}
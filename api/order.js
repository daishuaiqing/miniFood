const { request } = require('../utils/util.js');
const { baseUrl } = require('./base.js');

export const createOrder = info => {
    return request(baseUrl+'/oms/order/add',info,"POST")
}

export const getOrderList = info => {
  return request(baseUrl + '/oms/order/wx/list', info)
}

export const payOrder = info => {
  return request(baseUrl + '/oms/order/pay', info)
}
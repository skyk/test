/**
 * Created by lenovo on 2017/1/10.
 */
var app = getApp();
var http=require("http");
var path=app.globalData.path;

/*
功能描述：获取服务器时间
函数名：getServerDate
@para:参数描述
phone：手机号码
timestamp：接口请求时的时间戳(毫秒)
sign：签名
*/
module.exports.getServerDate = function (cb) {
  var data = {};
  http.get(`${path}/hh/getServerDate`, data, cb)
}

/*
功能描述：跳转外部链接
函数名：getContent
@para:参数描述
id：对应类型的Id
type：类型 1:banner,2:券使用说明,3:集花说明,4:常见问题
*/
module.exports.getContent = function (id, type, cb) {
  var data = {};
  data.id = id;
  data.type = type;
  http.get(`${path}/hh/richContent/getContent`, data, cb)
}

/*
功能描述：获取登录验证码
函数名：sendLoginSecurityCode
@para:参数描述
phone：手机号码
timestamp：接口请求时的时间戳(毫秒)
sign：签名
*/
module.exports.sendLoginSecurityCode = function (phone, timestamp, cb) {
  var keyarr = ['phone', 'timestamp']
  var indexData = [{key:'phone',value:phone},{key:'timestamp',value:timestamp}]
  var data = {};  
  app.new_signkey(keyarr, indexData, function(sign){
    data.sign = sign
  })
  data.phone = phone;
  data.timestamp = timestamp;
  http(`${path}/hh/user/app1.0/sendLoginSecurityCode/HHWeChat`, data, cb)
}

/*
功能描述：手机登录及注册
函数名：loginOnPhone
@para:参数描述
phone：手机号码
code：手机验证码
timestamp：接口请求时的时间戳(毫秒)
sign：签名
*/
module.exports.loginOnPhone = function (phone, code, timestamp, cb) {
  var keyarr = ['phone', 'code', 'timestamp']
  var indexData = [{ key: 'phone', value: phone },
    { key: 'code', value: code },
    { key: 'timestamp', value: timestamp }]
  var data = {};
  app.new_signkey(keyarr, indexData, function (sign) {
    data.sign = sign
  })
  data.phone = phone;
  data.code = code;
  data.timestamp = timestamp;
  http(`${path}/hh/user/app1.0/loginOnPhone/HHWeChat`, data, cb)
}

/*
功能描述：获取首页Banner列表
函数名：getBannerList
@para:参数描述
cityCode：城市编码
timestamp：接口请求时的时间戳(毫秒)
sign：签名
*/
module.exports.getBannerList = function (cityCode, timestamp, cb) {
  var keyarr = ['cityCode', 'timestamp']
  var indexData = [{ key: 'cityCode', value: cityCode },
  { key: 'timestamp', value: timestamp }]
  var data = {};
  app.new_signkey(keyarr, indexData, function (sign) {
    data.sign = sign
  })
  data.cityCode = cityCode;
  data.timestamp = timestamp;
  http(`${path}/hh/index/app1.0/getBannerList/HHWeChat`, data, cb)
}

/*
功能描述：获取首页品类列表
函数名：getHotCategoryList
@para:参数描述
cityCode：城市编码
timestamp：接口请求时的时间戳(毫秒)
sign：签名
*/
module.exports.getHotCategoryList = function (cityCode, timestamp, cb) {
  var keyarr = ['cityCode', 'timestamp']
  var indexData = [{ key: 'cityCode', value: cityCode },
  { key: 'timestamp', value: timestamp }]
  var data = {};
  app.new_signkey(keyarr, indexData, function (sign) {
    data.sign = sign
  })
  data.cityCode = cityCode;
  data.timestamp = timestamp;
  http(`${path}/hh/index/app1.0/getHotCategoryList/HHWeChat`, data, cb)
}

/*
功能描述：获取首页淘券列表
函数名：getCouponList
@para:参数描述
pageNum：当前页
pageSize：每页条数
openPosition：是否开启定位 0- 未开启 1- 开启
latitude：纬度(openPosition 参数为1时传, 0时不传)
longitude：经度(openPosition 参数为1时传, 0时不传)
userId：用户id(用户登录状态下传)
token：用户登录状态下传
cityCode：城市编码
timestamp：接口请求时的时间戳(毫秒)
sign：签名
*/
module.exports.getCouponList = function (pageNum, pageSize, openPosition, latitude, longitude, userId, token, cityCode, timestamp, cb) {
  var keyarr = ['pageNum', 'pageSize', 'openPosition', 'latitude', 'longitude', 'userId', 'token', 'cityCode', 'timestamp']
  var indexData = [
    { key: 'pageNum', value: pageNum },
    { key: 'pageSize', value: pageSize },
    { key: 'openPosition', value: openPosition },
    { key: 'latitude', value: latitude },
    { key: 'longitude', value: longitude },
    { key: 'userId', value: userId },
    { key: 'token', value: token },
    { key: 'cityCode', value: cityCode },
    { key: 'timestamp', value: timestamp }]
  var data = {};
  app.new_signkey(keyarr, indexData, function (sign) {
    data.sign = sign
  })
  data.pageNum = pageNum;
  data.pageSize = pageSize;
  data.openPosition = openPosition;
  data.latitude = latitude;
  data.longitude = longitude;
  data.userId = userId;
  data.token = token;
  data.cityCode = cityCode;
  data.timestamp = timestamp;
  http(`${path}/hh/index/app1.0/getCouponList/HHWeChat`, data, cb)
}

/*
功能描述：根据品类ID获取券列表
函数名：getCouponPublishListByHotCategoryId
@para:参数描述
hotCategoryId：品类Id
cityCode：城市编码
pageNum：当前页
pageSize：每页条数
userId：用户id(用户登录状态下传)
token：用户登录状态下传
timestamp：接口请求时的时间戳(毫秒)
sign：签名
*/
module.exports.getCouponPublishListByHotCategoryId = function (hotCategoryId, cityCode, pageNum, pageSize, userId, token, timestamp, cb) {
  var keyarr = ['hotCategoryId', 'cityCode', 'pageNum', 'pageSize', 'userId', 'token', 'timestamp']
  var indexData = [
    { key: 'hotCategoryId', value: hotCategoryId },
    { key: 'cityCode', value: cityCode },
    { key: 'pageNum', value: pageNum },
    { key: 'pageSize', value: pageSize },
    { key: 'userId', value: userId },
    { key: 'token', value: token },
    { key: 'timestamp', value: timestamp },]
  var data = {};
  app.new_signkey(keyarr, indexData, function (sign) {
    data.sign = sign
  })
  for (let i = 0; i < indexData.length; i++) {
    data[indexData[i].key] = indexData[i].value
  }
  http(`${path}/hh/hotCategory/app1.0/getCouponPublishListByHotCategoryId/HHWeChat`, data, cb)
}

/*
功能描述：淘券根据PubId获取券信息
函数名：getCouponPublishInfoOnTaoCouponByPubId
@para:参数描述
pubId：券批次号
openPosition：是否开启定位 0-未开启 1-开启
latitude：纬度(openPosition 参数为1时传, 0时不传)
longitude：经度(openPosition 参数为1时传, 0时不传)
timestamp：接口请求时的时间戳(毫秒)
sign：签名
*/
module.exports.getCouponPublishInfoOnTaoCouponByPubId = function (pubId, openPosition, latitude, longitude, timestamp, cb) {
  var keyarr = ['pubId', 'openPosition', 'latitude', 'longitude', 'timestamp']
  var indexData = [
    { key: 'pubId', value: pubId },
    { key: 'openPosition', value: openPosition },
    { key: 'latitude', value: latitude },
    { key: 'longitude', value: longitude },
    { key: 'timestamp', value: timestamp }]
  var data = {};
  app.new_signkey(keyarr, indexData, function (sign) {
    data.sign = sign
  })
  for (let i = 0; i < indexData.length; i++){
    data[indexData[i].key] = indexData[i].value
  }
  http(`${path}/hh/couponPublish/app1.0/getCouponPublishInfoOnTaoCouponByPubId/HHWeChat`, data, cb)
}

/*
功能描述：淘券领券
函数名：receiveCouponPublishOnTaoCoupon
@para:参数描述
userId：用户id
token：
pubId：券批次号
timestamp：接口请求时的时间戳(毫秒)
sign：签名
*/
module.exports.receiveCouponPublishOnTaoCoupon = function (userId, token, pubId, timestamp, cb) {
  var keyarr = ['userId', 'token', 'pubId', 'timestamp']
  var indexData = [
    { key: 'userId', value: userId },
    { key: 'token', value: token },
    { key: 'pubId', value: pubId },
    { key: 'timestamp', value: timestamp }]
  var data = {};
  app.new_signkey(keyarr, indexData, function (sign) {
    data.sign = sign
  })
  for (let i = 0; i < indexData.length; i++) {
    data[indexData[i].key] = indexData[i].value
  }
  http(`${path}/hh/couponPool/app1.0/receiveCouponPublishOnTaoCoupon/HHWeChat`, data, cb)
}





//退出登录

module.exports.logout = function (userId, token, timestamp, cb) {
  var keyarr = ['userId', 'token', 'timestamp']
  var indexData = [
    { key: 'userId', value: userId },
    { key: 'token', value: token },
    { key: 'timestamp', value: timestamp }]
  var data = {};
  app.new_signkey(keyarr, indexData, function (sign) {
    data.sign = sign
  })
  for (let i = 0; i < indexData.length; i++) {
    data[indexData[i].key] = indexData[i].value
  }
  http(`${path}/hh/user/app1.0/logout/HHWeChat`, data, cb)
}





























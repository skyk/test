//获取应用实例
var amapFile = require('../../libs/amap-wx.js')
var app = getApp()
var api=require("../utils/api")
Page({
  data: {
    isShow:false,
    callBackData:[],
    userInfo: {},
    loading:false,
    page:1,
    showBnt:false,
    cityName:'',
    cityCode:'',
    positionNS:'',
    positionWE:'',
    windowHeight:0
  },
//数据请求
  queryNearlyMarket:function(page){
    var that=this;
    api.queryNearlyMarket("",10,page,function(data){
      console.log(data)
      that.setData({
        callBackData:that.data.callBackData.concat(data.attributes.markets),
        isShow:true,
        loading:false,
        showBnt:data.attributes.markets.length>0?true:false
      });
    })
  },
  // onReachBottom:function(){
  //   var that=this;
  //   this.setData({
  //     loading:true,
  //     page:that.data.page++
  //   });
  //   this.queryNearlyMarket(++that.data.page);
  // },
  //分享功能
  onShareAppMessage: function () {
    return {
      title: '会花优惠券',
      desc: '你必备的省钱专家',
      path: '/'
    }
  },
  onLoad: function () {
    var that = this
    //获取地理位置
    if(app.globalData.selectedCityName!=''){
      that.setData({
            cityName:app.globalData.selectedCityName,
            cityCode:app.globalData.requestData.head.cityCode,
            positionNS:app.globalData.requestData.body.positionNS,
            positionWE:app.globalData.requestData.body.positionWE
      })
    }else{
      var myAmapFun = new amapFile.AMapWX({key:'d146f5b22847334e4255872654ce6f22'});
      myAmapFun.getRegeo({
        success: function(data){
          console.log(data)
          console.log(data[0].regeocodeData.addressComponent.city)
          var cityName=data[0].regeocodeData.addressComponent.city
          var cityCode=data[0].regeocodeData.addressComponent.adcode.substr(0,4)+'00';
          // var lastWord=city.substr(city.length-1,1)
          // if(lastWord=='市'){
          //   city=city.substr(0,city.length-1)
          // }
          app.globalData.selectedCityName=cityName
          app.globalData.requestData.head.cityCode=cityCode
          app.globalData.requestData.body.positionWE=data[0].longitude
          app.globalData.requestData.body.positionNS=data[0].latitude
          that.setData({
            cityName:app.globalData.selectedCityName,
            cityCode:app.globalData.requestData.head.cityCode,
            positionNS:app.globalData.requestData.body.positionNS,
            positionWE:app.globalData.requestData.body.positionWE
          })
          console.log(app.globalData.requestData)
        },
        fail: function(info){
          //失败回调
          that.setData({
            cityName:"杭州市",
            cityCode:"300100",
            positionNS:"30.274085",
            positionWE:"120.15507",
          })
          app.globalData.selectedCityName="杭州市"
        }
      })
    }
    //页面初始化数据
    that.queryNearlyMarket(that.data.page);
  },
  onShow:function(){
    var that = this
    // try {
    //   var res = wx.getSystemInfoSync()
    //   that.setData({
    //     windowHeight:res.windowHeight
    //   })
    //   console.log(res)
    // } catch (e) {
    //   // Do something when catch error
    // }
    if(that.data.cityCode!=app.globalData.requestData.head.cityCode){
      that.setData({
      cityName:app.globalData.selectedCityName,
      cityCode:app.globalData.requestData.head.cityCode,
      positionNS:app.globalData.requestData.body.positionNS,
      positionWE:app.globalData.requestData.body.positionWE,
      })
      console.log(app.globalData.requestData)
      //页面初始化数据
      that.setData({
        callBackData:[],
        page:1
      })
      that.queryNearlyMarket(that.data.page);
    }
  }
})
//获取应用实例
var app = getApp()
var api = require("../utils/api");
var amapFile = require("../../libs/amap-wx")
Page({
  data: {
    imgUrls: [
      // 'http://114.55.54.147/couponImg/lbs/766570200828461114.png',
      // 'http://114.55.54.147/couponImg/lbs/766570200828461114.png',
      // 'http://114.55.54.147/couponImg/lbs/766570200828461114.png'
    ],
    menuArray:[{ name: '家居个护', id: 2 },
      { name: '美容彩妆', id: 3 },
      { name: '休闲零食', id: 4 },
      { name: '户外运动', id: 5 }
    ],
    id:1,
    iconIsShow:false,
    menuIsShow: false,
    isToastShow: false,
    msg:'',
    flag: true,
    cityName:'',
    cityCode:'',
    positionNS:'',
    positionWE:'',
    callBackData:[],
    page:1,
    pageSize:5,
    loading:false,
    isShow: false,
    dataStatus: false,
    isNoCoupons: false,
    isNoMore: false
  },
  //事件处理函数
  onPageScroll:function(e) {
    var that = this;
    
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindShowIcon:function(){
    console.log('show')
    var that = this;
    that.setData({
      iconIsShow: false
    })
  },
  bindHiddenIcon: function () {
    console.log('hidden')
    var that = this;
    that.setData({
      iconIsShow: true
    })
  },
  bindShowMenu: function () {
    var that = this;
    that.setData({
      menuIsShow: false
    })
  },
  bindHiddenMenu: function () {
    var that = this;
    that.setData({
      menuIsShow: true
    })
  },
  bindToCouponDetails: function(e){
    console.log(e)
    wx.navigateTo({
      url: '../couponDetails/couponDetails?pubid=' + e.currentTarget.dataset.pubid + '&type=' + e.currentTarget.dataset.type + '&flag=' + e.currentTarget.dataset.flag
    })
  },

  //领券
  getCoupon: function(e){
    var that = this; 
    
    if(app.globalData.userData){
      var pubId = e.target.dataset.pid;
      api.receiveCouponPublishOnTaoCoupon(app.globalData.userData.id, app.globalData.userData.token, pubId, new Date().getTime() + app.globalData.differ, function (res) {
        if (res.code == 200) {
          console.log(that.data.callBackData)
          var couponData = that.data.callBackData
          for (let i = 0; i < couponData.length; i++) {
            if (couponData[i].pubid == pubId) {
              couponData[i].couponcount--;
              if (couponData[i].couponcount == 0) {
                couponData[i].flag = 1
              }
            }
          }
          that.setData({
            callBackData: couponData
          })
        } else {
          wx.showModal({
            title: res.msg,
            showCancel: false,
            success: function (res) {

            }
          })
        }
      })
    }else{
      wx.navigateTo({
        url: '../login/login'
      })
    }
  },
  //获取首页券列表
  getCouponList: function (page) {
    var that = this;
    api.getCouponList(page, that.data.pageSize, app.globalData.isOpenPosition, app.globalData.positionNS, app.globalData.positionWE, app.globalData.userData.id, app.globalData.userData.token, app.globalData.cityCode, new Date().getTime() + app.globalData.differ, function (res) {
      console.log(res)
      if(res.code == 200){
        var datalist = res.data.couponList;
        if (datalist.length == 0 && page == 1){
          that.setData({
            isNoCoupons:true,
            isNoMore:false,
            page: page-1
          })
        } else if (datalist.length == 0 && page != 1){
          that.setData({
            isNoCoupons: false,
            isNoMore:true,
            page: page-1
          })
        } else {
          for (let i = 0; i < datalist.length; i++) {
            //判断券状态
            if (datalist[i].couponamout == datalist[i].fetch_num && datalist[i].couponamount != -1) {
              if (datalist[i].receivecount <= 0) {
                //已领完
                datalist[i].flag = 4;
              } else {
                if (datalist[i].receivecount == datalist[i].usedcount) {
                  //已使用
                  datalist[i].flag = 2;
                } else if (datalist[i].receivecount == datalist[i].invalidcount || datalist[i].receivecount == (datalist[i].invalidcount + datalist[i].usedcount)) {
                  //已过期
                  datalist[i].flag = 3;
                } else {
                  //去使用
                  datalist[i].flag = 1;
                }
              }
            } else {
              if (datalist[i].couponcount == 0) {
                if (datalist[i].receivecount == datalist[i].usedcount) {
                  //已使用
                  datalist[i].flag = 2;
                } else if (datalist[i].receivecount == datalist[i].invalidcount || datalist[i].receivecount == (datalist[i].invalidcount + datalist[i].usedcount)) {
                  //已过期
                  datalist[i].flag = 3;
                } else {
                  //去使用
                  datalist[i].flag = 1;
                }
              } else {
                //去领取
                datalist[i].flag = 0;
              }
            }
            //处理memo字段
            if (datalist[i].memo) {
              if (datalist[i].memo.indexOf('color') != '-1') {
                datalist[i].memoColor = datalist[i].memo.substring(datalist[i].memo.indexOf('#'), datalist[i].memo.indexOf('#') + 7)
                datalist[i].memo = datalist[i].memo.substring(datalist[i].memo.indexOf('>') + 1, datalist[i].memo.indexOf('</font>'))
              }
            }
          }
          that.setData({
            callBackData: that.data.callBackData.concat(res.data.couponList),
            isShow: true,
            loading: false,
            isNoCoupons: false,
            isNoMore: false
            // showBnt: data.attributes.markets.length > 0 ? true : false
          });
        }
        
      } else {
        wx.showModal({
          title: res.msg,
          showCancel: false,
          success: function (res) {

          }
        })
      }
    })
    // api.getCouponList("", 10, page, function (data) {
    //   console.log(data)
    //   that.setData({
    //     callBackData: that.data.callBackData.concat(data.couponList.markets),
    //     isShow: true,
    //     loading: false,
    //     showBnt: data.attributes.markets.length > 0 ? true : false
    //   });
    // })
  },
  //根据品类id获取券列表
  getCouponPublishListByHotCategoryId:function(page,id){
    var that = this;
    api.getCouponPublishListByHotCategoryId(id, app.globalData.cityCode, page, that.data.pageSize, app.globalData.userData.id, app.globalData.userData.token, new Date().getTime() + app.globalData.differ, function (res) {
      console.log(res)
      if (res.code == 200) {
        var datalist = res.data.couponList;
        if (datalist.length == 0 && page == 1) {
          that.setData({
            isNoCoupons: true,
            isNoMore: false,
            page: page-1
          })
        } else if (datalist.length == 0 && page != 1) {
          that.setData({
            isNoCoupons: false,
            isNoMore: true,
            page: page-1
          })
        } else {
          for (let i = 0; i < datalist.length; i++) {
            //判断券状态
            if (datalist[i].couponamout == datalist[i].fetch_num && datalist[i].couponamount != -1) {
              if (datalist[i].receivecount <= 0) {
                //已领完
                datalist[i].flag = 4;
              } else {
                if (datalist[i].receivecount == datalist[i].usedcount) {
                  //已使用
                  datalist[i].flag = 2;
                } else if (datalist[i].receivecount == datalist[i].invalidcount || datalist[i].receivecount == (datalist[i].invalidcount + datalist[i].usedcount)) {
                  //已过期
                  datalist[i].flag = 3;
                } else {
                  //去使用
                  datalist[i].flag = 1;
                }
              }
            } else {
              if (datalist[i].couponcount == 0) {
                if (datalist[i].receivecount == datalist[i].usedcount) {
                  //已使用
                  datalist[i].flag = 2;
                } else if (datalist[i].receivecount == datalist[i].invalidcount || datalist[i].receivecount == (datalist[i].invalidcount + datalist[i].usedcount)) {
                  //已过期
                  datalist[i].flag = 3;
                } else {
                  //去使用
                  datalist[i].flag = 1;
                }
              } else {
                //去领取
                datalist[i].flag = 0;
              }
            }
            //处理memo字段
            if (datalist[i].memo) {
              if (datalist[i].memo.indexOf('color') != '-1') {
                datalist[i].memoColor = datalist[i].memo.substring(datalist[i].memo.indexOf('#'), datalist[i].memo.indexOf('#') + 7)
                datalist[i].memo = datalist[i].memo.substring(datalist[i].memo.indexOf('>') + 1, datalist[i].memo.indexOf('</font>'))
              }
            }
          }
          that.setData({
            callBackData: that.data.callBackData.concat(res.data.couponList),
            isShow: true,
            loading: false,
            isNoCoupons: false,
            isNoMore: false
            // showBnt: data.attributes.markets.length > 0 ? true : false
          });
        }

      } else {
        wx.showModal({
          title: res.msg,
          showCancel: false,
          success: function (res) {

          }
        })
      }
    })
  },
  //获取当前选中菜单项以及展示对应专题内容
  getCur: function (e) {
    var id = e.target.dataset.id
    var that = this
    if (id != that.data.id) {
      console.log(id)
      that.setData({
        id: id,
        isShow: false,
        dataStatus: false,
        callBackData: [],
        page: 1
      })
      if(id == 1){
        that.getCouponList(1)
      }else{
        that.getCouponPublishListByHotCategoryId(1,id)
      }
    }

  },
  getOut:function(){
    api.logout(app.globalData.userData.id, app.globalData.userData.token, new Date().getTime() + app.globalData.differ, function(res){
      if (res.code == 200) {
        console.log(res)
        
      } else {
        wx.showModal({
          title: res.msg,
          showCancel: false,
          success: function (res) {

          }
        })
      }
    })
  },
  //页面初始化
  pageInit:function(){
    var that = this;
    //获取首页Banner列表
    api.getBannerList(app.globalData.cityCode, new Date().getTime() + app.globalData.differ, function (res) {
      console.log(res)
      if (res.code == 200) {
        var imgUrls = [];
        for (let i = 0; i < res.data.bannerList.length; i++) {
          imgUrls.push(res.data.bannerList[i].picurl)
        }
        that.setData({
          imgUrls: imgUrls
        })
      } else {
        wx.showModal({
          title: res.msg,
          showCancel: false,
          success: function (res) {

          }
        })
      }
    })

    //获取首页品类列表
    api.getHotCategoryList(app.globalData.cityCode, new Date().getTime() + app.globalData.differ, function (res) {
      console.log(res)
      if (res.code == 200) {
        that.setData({
          menuArray: res.data.hotCategoryList
        })
      } else {
        wx.showModal({
          title: res.msg,
          showCancel: false,
          success: function (res) {

          }
        })
      }
    })
    console.log(app.globalData.userData)
    //获取首页淘券列表
    that.getCouponList(1);
  },
  //上拉加载更多
  onReachBottom: function () {
    var that = this;
    console.log('bt')
    if(that.id == 1){
      this.setData({
        loading: true,
        page: that.data.page++
      });
      that.getCouponList(++that.data.page);
    }else{
      this.setData({
        loading: true,
        page: that.data.page++
      });
      that.getCouponPublishListByHotCategoryId(++that.data.page, that.data.id);
    }
    


  },
  onLoad: function (e) {
    var that = this
    //获取用户信息（缓存）
    if (wx.getStorageSync('userData')) {
      app.globalData.userData = JSON.parse(wx.getStorageSync('userData'));
    } 
    //获取地理位置
    if (app.globalData.selectedCityName != '') {
      that.setData({
        cityName: app.globalData.selectedCityName,
        cityCode: app.globalData.cityCode,
        positionNS: app.globalData.positionNS,
        positionWE: app.globalData.positionWE
      })
    } else {
      var myAmapFun = new amapFile.AMapWX({ key: 'd146f5b22847334e4255872654ce6f22' });
      myAmapFun.getRegeo({
        success: function (data) {
          console.log('获取地理位置成功')
          console.log(data)
          console.log(data[0].regeocodeData.addressComponent.city)
          var cityName = data[0].regeocodeData.addressComponent.city
          var cityCode = data[0].regeocodeData.addressComponent.adcode.substr(0, 4) + '00';
          // var lastWord=city.substr(city.length-1,1)
          // if(lastWord=='市'){
          //   city=city.substr(0,city.length-1)
          // }
          app.globalData.isOpenPosition = 1
          app.globalData.selectedCityName = cityName
          app.globalData.cityCode = cityCode
          app.globalData.positionWE = data[0].longitude
          app.globalData.positionNS = data[0].latitude
          that.setData({
            cityName: app.globalData.selectedCityName,
            cityCode: app.globalData.cityCode,
            positionNS: app.globalData.positionNS,
            positionWE: app.globalData.positionWE
          })
          that.pageInit();
        },
        fail: function (info) {
          //失败回调
          that.setData({
            cityName: "杭州市",
            cityCode: "300100",
          })
          app.globalData.selectedCityName = "杭州市"
          app.globalData.isOpenPosition = 0
          console.log('获取地理位置失败')
          that.pageInit();
        }
      })
    }

    
  }
})

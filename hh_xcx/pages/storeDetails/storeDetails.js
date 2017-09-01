//index.js
//获取应用实例
var app = getApp()
var api=require("../utils/api")
Page({
  data: {
    isShow:false,
    callbackData:{},
    mask:false,
    userInfo: {},
    couponType:[
      "立减券","品牌满减券","现金抵用券","生鲜券"
    ],
    mask:false,
    msg:'恭喜您！领券成功'
  },

//弹框显示隐藏
  showCoupon:function(){
      this.setData({
            'mask':true
        }) ;
  },
  closeMask: function() {
    console.log("closeMask")
    this.setData({
        'mask':false
    }) 
  },
  //事件处理函数
  getCoupon: function(e) {
    console.log("getCoupon")
    var that=this;
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    console.log(e.currentTarget.dataset.pubid)
    api.getAvailCp(e.currentTarget.dataset.pubid,function(data){
      console.log(data);
        wx.hideToast();
        if(data.result=="200"){
             that.setData({
                'mask':true,
                'msg':'恭喜您！领券成功'
            }) ;
            var items=that.data.callbackData;
            for(var i=0;i<items.coupons.length;i++){
              if(items.coupons[i].pubid==e.currentTarget.dataset.pubid){
                items.coupons[i].flag=2;
                break;
              }
            }
            that.setData({
              callbackData:items
            })
        }else{
            that.setData({
                'mask':true,
                'msg':data.msg
            }) ;
        }
    })
  
  },
  goTo:function(){
    wx.switchTab({
      url: "/pages/mine/mine",
      success: function(res){
        console.log("success")
      },
      fail: function() {
        console.log("fail")
      },
      complete: function() {
         console.log("complete")
      }
    })
  },

//获取门店数据
 queryMarketCoupons:function(getPara){
    var that=this;
    api.queryMarketCoupons(getPara.saas,getPara.marketid,function(data){
      console.log(data);
      that.setData({
        callbackData:data.attributes,
        isShow:true
      })
    })
  },
  makePhoneCall:function(e){
    console.log('phonenum:::'+e.target.dataset.phonenum)
    wx.makePhoneCall({
      phoneNumber: e.target.dataset.phonenum
    })
  },
  onLoad: function (e) {
    wx.setNavigationBarTitle({
      title: '门店详情'
    })
    var that = this
   
    that.queryMarketCoupons(e); //获取门店详情数据

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
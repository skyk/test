//app.js
App({
  onLaunch: function() {
    var that = this;
    wx.request({
      url: 'https://hhtest.miyapay.com/hh/getServerDate/HHWeChat',
      success:function(res){
        console.log(res)
        var server_timestamp = res.data.data.currentTime;
        var local_timestamp = new Date().getTime();
        console.log(server_timestamp)
        console.log(local_timestamp)
        that.globalData.differ = server_timestamp - local_timestamp;
        
      }
    })

  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  toast:function(msg){
    var that = this;
    console.log('aaa')
    clearTimeout(timer);
    that.globalData.isToastShow = true;
    var timer = setTimeout(function(){
      that.globalData.isToastShow = false;
    },2000)
  },

  isLogin:function(){
    //获取用户信息（缓存）
    if (wx.getStorageSync('userData')) {
      return true
    } else {
      wx.redirectTo({
        url: '../login/login',
      })
    }
  },

  new_signkey: function (keyarr, data, callback) {
    var that = this;
    var lib = require("./pages/utils/lib");
    
    var signstr = "";
    keyarr.sort();
    for (var i = 0; i < keyarr.length; i++) {
      signstr = signstr + keyarr[i] + "=";
      for (var j = 0; j < data.length; j++) {
        if (data[j].key == keyarr[i]) {
          signstr = signstr + data[j].value + "&";
        }
      }
    }
    signstr = signstr + "signKey=" + that.globalData.signKey;
    signstr = lib.md5(signstr).toLocaleUpperCase();
    callback(signstr);
        
  },
  globalData: {
    userInfo: null,
    userData: '',
    // path: 'https://hhsc.miyapay.com', //生产环境
    path: 'https://hhtest.miyapay.com', //测试环境
    // path: 'http://10.8.0.82:8080',
    signKey: 'c800372c04c648e7b2e273d0dc81def0',
    AES_KEY: 'f609cb3c055b4610',
    differ: '',
    isToastShow: false,
    selectedCityName:'',
    cityCode:'330100',
    positionNS:'',
    positionWE:'',
    isOpenPosition: 0
  }
})

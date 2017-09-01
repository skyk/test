// pages/huayu/huayu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textCounts:'0',
    isExceed:true,
  },

  inText:function(e){
    var that = this;
    that.setData({
      textCounts:e.detail.value.length
    })
    //console.log(textCounts);
    if(that.data.textCounts>100){
      that.setData({
        isExceed:false,
      })
      wx.showToast({
        title: '字数过多啦！',
        icon: 'success',
        duration: 2000
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '花语',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
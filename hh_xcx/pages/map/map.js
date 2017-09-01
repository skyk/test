//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
    marketName:"",
    address:"",
    markers: [{
      latitude: 23.099994,
      longitude: 113.324520,
      name: '',
      iconPath: "../../images/icon_position_detail.png"
    }]
  },
  onLoad:function(e){
    console.log(e);
    this.setData({
      latitude:e.positionns,
      longitude:e.positionwe,
      marketName:e.name,
      address:e.address,
      markers:[{
      latitude: e.positionns,
      longitude: e.positionwe,
      name: e.address,
      iconPath: "../../images/icon_position_detail.png"
      }]
    })
    this.data.latitude=e.positionns
  }
})

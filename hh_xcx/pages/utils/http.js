/**
 * Created by lenovo on 2017/1/10.
 */
module.exports=(url,data,cb)=>{
    wx.request({
        url:url,
        data:data,
        method:"POST",
        dataType:"json",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res){
            cb(res.data)
        }
    })
}
module.exports.get=(url,data,cb)=>{
    wx.request({
        url:url,
        data:data,
        method:"GET",
        dataType:"json",
        header: {
          'content-type': 'application/json'
        },
        success(res){
            cb(res.data)
        }
    })
}
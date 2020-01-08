// miniprogram/pages/showPhoto/showPhoto.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[],
    arrHttpsList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //图片点击事件
  　　enlarge: function (event) {
    let arrHttpsList=this.data.arrHttpsList
  　　　　var index = event.currentTarget.dataset.index;
  　　　　//图片预览
  　　　　wx.previewImage({
  　　　　　　current: arrHttpsList[index], // 当前显示图片的http链接
              urls: arrHttpsList
  　　　　})
  　　},
 onLoad: function() {
    let self=this;
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    const db = wx.cloud.database()

    db.collection('oneYear').get({
      success: res => {
        let list=res.data
        this.setData({
          arr: list
        })
        let list2=[]
        list.map((v,k)=>{
          list2.push(v.path)
        })
        wx.cloud.getTempFileURL({
          fileList: list2,
          success: res => {
            // get temp file URL
            let list3=[]
             res.fileList.map((v,k)=>{
             list3.push(v.tempFileURL)  
             })
            self.setData({
              arrHttpsList:list3
            })
            
          },
          fail: err => {
            // handle error
          }
        })
      },fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
      }
    })
    // 查询当前用户所有的 cardImg
    // db.collection('cardImg')
    // .where({
    //   _openid: this.data.openid
    // })
    // .get({
    //   success: res => {
    //     console.log(res)
    //     console.log(JSON.stringify(res.data, null, 2))
    //     this.setData({
    //       queryResult: res.data
    //     })
    //     console.log('[数据库] [查询记录] 成功: ', res)
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '查询记录失败'
    //     })
    //     console.error('[数据库] [查询记录] 失败：', err)
    //   }
    // })
 
 
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
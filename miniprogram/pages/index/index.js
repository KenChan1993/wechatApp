//index.js

const app = getApp()
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    userName:'',
    arr:[],
    arrHttpsList:[],
    queryResult:[],
    showMain:true
  },
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
goToShowPhoto:function(){
  wx.navigateTo({
    url:'../showPhoto/showPhoto'
  })
},
 checkPsw:function(){
    this.setData({
      showMain:false
    })
 },
 confirm:function(){
   
 },
 checkPsw:function(){
    this.setData({
      showMain:true
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
    
    
    
    
    db.collection('lifePhoto').get({
      success: res => {
        console.log(res)
        console.log(JSON.stringify(res.data, null, 2))
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
    db.collection('cardImg')
    .where({
      _openid: this.data.openid
    })
    .get({
      success: res => {
        console.log(res)
        console.log(JSON.stringify(res.data, null, 2))
        this.setData({
          queryResult: res.data
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })


  },

  getEmisData:function(){
    wx.request({
      url: '',
    })
  },
  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })






    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
                userName: res.userInfo.nickName
              })
            }
          })
        }
      }
    })


  },
  showTitle:function(e){
    console.log(e.currentTarget.dataset.id);
    var detail = e.currentTarget.dataset.id;
    app.globalData.hero = detail
    wx.navigateTo({
      url: '../hero/demo',
    })
    // const heroDteail = wx.cloud.database().collection('heroDteail')
    // console.log(heroDteail)
    // heroDteail
    // .where({
    //   no: counts
    // })
    // .get({
    //   success: res => {
    //     console.log(res)
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
  testVideo:function(){
    wx.navigateTo({
      url: '../testVideo/testVideo',
    })
  },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  getLocalDate:function(){

  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })
        const filePath = res.tempFilePaths[0]
         const name = Math.random() * 1000000;
        console.log(filePath)
        let title=name + filePath.match(/\.[^.]+?$/)[0];
        // 上传图片
        const cloudPath = 'oneYear/'+name + filePath.match(/\.[^.]+?$/)[0]
               console.log(cloudPath)
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            const db = wx.cloud.database()
            db.collection('oneYear').add({
              // data 字段表示需新增的 JSON 数据
              data: {
             title:title,
             path:res.fileID
              },
              success: function(res) {
                // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                console.log(res)
              },
              fail: console.error,
              complete: console.log
            })
            
            
            
            
            
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})

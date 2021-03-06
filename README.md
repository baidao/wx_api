# Description
> 微信js api

# Usage
> bower install YTX_WechatApi

> browserify or requirejs or window.WechatApi ..

```
WechatApi.ready(function() {
    // 微信分享的数据
    var data = {
      title: '我是你爸爸！',
      desc: '1',
      link: 'http://www.baidu.com', //默认当前top window href
      imgUrl: 'http://tp1.sinaimg.cn/1862940640/180/5634214186/1'
    };

    // 分享的回调
    var callbacks = {
      // 分享操作开始之前
      before: function() {
        alert("准备分享");
      },
      // 分享被用户自动取消
      cancel: function(resp) {
        alert("分享被取消");
      },
      // 分享失败了
      error: function(resp) {
        alert("分享失败");
      },
      // 分享成功
      success: function(resp) {
        alert("分享成功");
      },
      // 整个分享过程结束
      always: function(resp) {
        alert("分享结束");
      }
    };

    // 分享给好友
    WechatApi.shareToFriend(data, callbacks);
    // 分享到朋友圈
    WechatApi.shareToTimeline(data, callbacks);
    // 分享到腾讯微博
    WechatApi.shareToWeibo(data, callbacks);
    // 分享到邮件
    WechatApi.shareToEmail(data, callbacks);
    // 5.4之后 分享
    WechatApi.share({title:'我是你爸爸2', desc: '2'}, callbacks);
    /*
    // 更蛋疼的需求
    WechatApi.share({
      friend: {
        title:'我是你爸爸3',
        desc: '3'
      },
      timeline: {
        title:'我是你爸爸4',
        desc: '4'
      }
    }, callbacks, true);
    */
    // 图片轮播
    document.getElementById('previewImage').addEventListener('click', function() {
      current = 'http://img5.douban.com/view/photo/photo/public/p2189106907.jpg';
      /*urls = [*/
        'http://img3.douban.com/view/photo/photo/public/p2184021900.jpg',
        'http://img5.douban.com/view/photo/photo/public/p2189106907.jpg',
        'http://img5.douban.com/view/photo/photo/public/p2184021999.jpg'
      /*]*/;
      WechatApi.previewImage(current, urls);
    }, false);
    // 网络状态
    document.getElementById('network').addEventListener('click', function() {
      WechatApi.getNetworkType(function (type){
        alert(type);
      });
    }, false);
    // 关闭窗口
    document.getElementById('close').addEventListener('click', function() {
      WechatApi.closeWindow()
    }, false);
});
```
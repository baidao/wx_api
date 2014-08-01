# Description
> 微信js api

# Usage
> bower install YTX_WechatApi

> browserify or requirejs or window.WechatApi ..

```
WechatApi.ready(function() {
  // 微信分享的数据
  var data = {
    title: '左安龙、刘涛领衔银天下专家团队，快来订阅！',
    desc: '订阅明星分析师，时刻关注专家动向，抓住市场投资先机！',
    link: 'http://mp.weixin.qq.com/s?__biz=MjM5NjMwODY2NA==&mid=204586318&idx=1&sn=4742dd9c88502ef5fd2494fc3df8a4bd',
    imgUrl: 'http://www.tiantong99.com/static/theme/wechat/images/welcome.jpg'
  };

  // 分享的回调
  var callbacks = {
    // 分享之前
    before: function() {
      alert("准备分享");
    },
    // 用户取消分享
    cancel: function(resp) {
      alert("分享被取消");
    },
    // 分享失败
    error: function(resp) {
      alert("分享失败");
    },
    // 分享成功
    success: function(resp) {
      alert("分享成功");
    },
    // 分享结束
    always: function(resp) {
      alert("分享结束");
    }
  };
  //分享给好友
  WechatApi.shareToFriend(data, callbacks);
  //分享到朋友圈
  WechatApi.shareToTimeline(data, callbacks);
  //分享到腾讯微博
  WechatApi.shareToWeibo(data, callbacks);
  //分享到邮件
  WechatApi.shareToEmail(data, callbacks);
  //图片轮播
  document.getElementById('previewImage').addEventListener('click', function() {
    current = 'http://img5.douban.com/view/photo/photo/public/p2189106907.jpg';
    urls = [
      'http://img3.douban.com/view/photo/photo/public/p2184021900.jpg',
      'http://img5.douban.com/view/photo/photo/public/p2189106907.jpg',
      'http://img5.douban.com/view/photo/photo/public/p2184021999.jpg'
    ];
    WechatApi.previewImage(current, urls);
  }, false);
});
```
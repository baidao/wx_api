'use strict'

( (root, factory) ->
  if typeof define is 'function' and define.amd
    define factory
  else if typeof exports is 'object'
    module.exports = factory()
  else
    root.WechatApi = factory()
)(@, ->
  # 微信JS
  _WXJS =
    on: (namespace, callback=->) ->
      window.WeixinJSBridge?.on namespace, callback
    emit: (namespace, data={}, callback=->) ->
      window.WeixinJSBridge?.invoke namespace, data, callback

  # WXJsBridge加载完成
  ready = (callback) ->
    if typeof window.WeixinJSBridge is 'undefined'
      document.addEventListener 'WeixinJSBridgeReady', callback, false
    else
      callback()

  # 分享到朋友圈
  shareToTimeline = (data, callbacks={}) ->
    _WXJS.on 'menu:share:timeline', (argv) ->
      callbacks.before? argv
      # 分享
      _WXJS.emit 'shareTimeline',
        appid: data.appId or ''
        img_url: data.imgUrl
        link: data.link
        desc: data.desc
        title: data.title
      , (resp) ->
        switch resp.err_msg
          # 用户取消
          when 'share_timeline:cancel'
            callbacks.cancel? resp
          # 发送失败
          when 'share_timeline:fail'
            callbacks.error? resp
          # 发送成功
          when 'share_timeline:confirm', 'share_timeline:ok'
            callbacks.success? resp
        # 成功失败都执行
        callbacks.always? resp

  # 分享给好友
  shareToFriend = (data, callbacks={}) ->
    _WXJS.on 'menu:share:appmessage', (argv) ->
      callbacks.before? argv
      # 分享
      _WXJS.emit 'sendAppMessage',
        appid: data.appId or ''
        img_url: data.imgUrl
        link: data.link
        desc: data.desc
        title: data.title
      , (resp) ->
        switch resp.err_msg
          # 用户取消
          when 'send_app_msg:cancel'
            callbacks.cancel? resp
          # 发送失败
          when 'send_app_msg:fail'
            callbacks.error? resp
          # 发送成功
          when 'send_app_msg:confirm', 'send_app_msg:ok'
            callbacks.success? resp
        # 成功失败都执行
        callbacks.always? resp

  # 分享到腾讯微博
  shareToWeibo = (data, callbacks) ->
    _WXJS.on 'menu:share:weibo', (argv) ->
      callbacks.before? argv
      # 分享
      _WXJS.emit 'shareWeibo',
        content: data.desc
        url: data.link
      , (resp) ->
        switch resp.err_msg
          # 用户取消
          when 'share_weibo:cancel'
            callbacks.cancel? resp
          # 发送失败
          when 'share_weibo:fail'
            callbacks.error? resp
          # 发送成功
          when 'share_weibo:confirm', 'share_weibo:ok'
            callbacks.success? resp
        # 成功失败都执行
        callbacks.always? resp

  # 分享到邮件
  shareToEmail = (data, callbacks) ->
    _WXJS.on 'menu:share:email', (argv) ->
      callbacks.before? argv
      # 分享
      _WXJS.emit 'sendEmail',
        title_link: data.link
        content: data.desc
        title: data.title
      , (resp) ->
        switch resp.err_msg
          # 用户取消
          when 'share_email:cancel'
            callbacks.cancel? resp
          # 发送失败
          when 'share_email:fail'
            callbacks.error? resp
          # 发送成功
          when 'share_email:confirm', 'share_email:ok'
            callbacks.success? resp
        # 成功失败都执行
        callbacks.always? resp

  # 显示菜单按钮
  showOptionMenu = ->
    _WXJS.emit 'showOptionMenu'

  # 显示菜单按钮
  hideOptionMenu = ->
    _WXJS.emit 'hideOptionMenu'

  # 显示底部工具栏
  showToolbar = ->
    _WXJS.emit 'showToolbar'

  # 隐藏底部工具栏
  hideToolbar = ->
    _WXJS.emit 'hideToolbar'

  # 微信Native的图片播放组件
  previewImage = (current, urls) ->
    return unless (current and urls and urls.length > 0)
    WeixinJSBridge.invoke 'imagePreview',
      current: current
      urls: urls

  # #设置字体大小
  # setFontSize = (size) ->
  #   fontSize = '100%'
  #   switch size
  #     when 1 then fontSize = '80%'
  #     when 2 then fontSize = '100%'
  #     when 3 then fontSize = '120%'
  #     when 4 then fontSize = '140%'
  #     when 5 then fontSize = '200%'
  #   WeixinJSBridge.invoke 'setFontSizeCallback',
  #     fontSize: fontSize
  #   , (resp) ->
  #     alert resp.err_msg


  # WechatApi
  version: "0.0.1"
  ready: ready
  shareToTimeline: shareToTimeline
  shareToFriend: shareToFriend
  shareToWeibo: shareToWeibo
  shareToEmail: shareToEmail
  showOptionMenu: showOptionMenu
  hideOptionMenu: hideOptionMenu
  showToolbar: showToolbar
  hideToolbar: hideToolbar
  previewImage: previewImage
  # setFontSize: setFontSize # android
)
'use strict'

( (root, factory) ->
  if typeof define is 'function' and define.amd
    define factory
  else if typeof exports is 'object'
    module.exports = factory()
  else
    root.WechatApi = factory()
)(@, ->
  _WXJS =
    on: (namespace, callback=->) ->
      window.WeixinJSBridge?.on namespace, callback
    emit: (namespace, data={}, callback=->) ->
      window.WeixinJSBridge?.invoke namespace, data, callback

  _extend = (obj) ->
    type = typeof obj
    return obj unless (type is 'function' or type is 'object' and !!obj)
    for source in arguments
      for prop of source
        obj[prop] = source[prop]
    obj

  _invokeCallbacks = (resp, callbacks) ->
    msg = resp.err_msg
    if /:ok$/.test msg
      callbacks.success? resp
    else if /:confirm$/.test msg
      callbacks.success? resp
    else if /:cancel$/.test msg
      callbacks.cancel? resp
    else if /:fail$/.test msg
      callbacks.error? resp
    callbacks.always? resp

  _defaults =
    link: window.top.location.href
    img_width: '256'
    img_height: '256'
    img_url: undefined
    appid: undefined
    title: undefined
    desc: undefined

  # WXJsBridge加载完成
  ready = (callback) ->
    if typeof window.WeixinJSBridge is 'undefined'
      document.addEventListener 'WeixinJSBridgeReady', callback, false
    else
      callback()

  # 5.4 版本之后 通用share
  ###
    diff 用来不同分享类型 不同数据
    这是个很蛋疼的需求
    data =
      friend: 好友
      timeline: 朋友圈
      weibo: 微博
      email: email
  ###
  share = (data, callbacks, diff=false) ->
    _WXJS.on 'menu:general:share', (argv) ->
      callbacks.before? argv
      shareTo = argv.shareTo
      type = undefined
      switch shareTo
        when 'friend', 'appmessage', 'sendappmessage'
          type = 'sendAppMessage'
          data = data.friend if diff
        when 'timeline'
          type = 'shareTimeline'
          data = data.timeline if diff
        when 'weibo'
          type = 'shareWeibo'
          data = data.weibo if diff
        when 'email'
          type = 'sendEmail'
          data = data.emial if diff
      return unless type
      _WXJS.emit type, _extend({}, _defaults, data), (resp) ->
        _invokeCallbacks resp, callbacks

  # 分享到朋友圈
  shareToTimeline = (data, callbacks={}) ->
    _WXJS.on 'menu:share:timeline', (argv) ->
      callbacks.before? argv
      _WXJS.emit 'shareTimeline', _extend({}, _defaults, data), (resp) ->
        _invokeCallbacks resp, callbacks

  # 分享给好友
  shareToFriend = (data, callbacks={}) ->
    _WXJS.on 'menu:share:appmessage', (argv) ->
      callbacks.before? argv
      _WXJS.emit 'sendAppMessage', _extend({}, _defaults, data), (resp) ->
        _invokeCallbacks resp, callbacks

  # 分享到腾讯微博
  shareToWeibo = (data, callbacks) ->
    _WXJS.on 'menu:share:weibo', (argv) ->
      callbacks.before? argv
      _WXJS.on 'shareWeibo', _extend({}, _defaults, data), (resp) ->
        _invokeCallbacks resp, callbacks

  # 分享到邮件
  shareToEmail = (data, callbacks) ->
    _WXJS.on 'menu:share:email', (argv) ->
      callbacks.before? argv
      _WXJS.on 'sendEmail', _extend({}, _defaults, data), (resp) ->
        _invokeCallbacks resp, callbacks

  # 显示菜单按钮
  showOptionMenu = ->
    _WXJS.emit 'showOptionMenu'

  # 隐藏菜单按钮
  hideOptionMenu = ->
    _WXJS.emit 'hideOptionMenu'

  # 显示底部工具栏
  showToolbar = ->
    _WXJS.emit 'showToolbar'

  # 隐藏底部工具栏
  hideToolbar = ->
    _WXJS.emit 'hideToolbar'

  # 关闭当前窗口
  closeWindow = ->
    _WXJS.emit 'closeWindow'

  # 当前网络
  getNetworkType = (callback) ->
    _WXJS.emit 'getNetworkType', {}, (resp) ->
      type = resp.err_msg
      # wifi: wifi, edge:edge, wwan:2G/3G, fail:网络断开
      callback if type then type['network_type:'.length...] else type

  # 微信Native的图片播放组件
  previewImage = (current, urls) ->
    return unless (current and urls and urls.length > 0)
    _WXJS.emit 'imagePreview',
      current: current
      urls: urls

  # WechatApi
  version: "0.0.3"
  ready: ready
  share: share
  shareToTimeline: shareToTimeline
  shareToFriend: shareToFriend
  shareToWeibo: shareToWeibo
  shareToEmail: shareToEmail
  showOptionMenu: showOptionMenu
  hideOptionMenu: hideOptionMenu
  showToolbar: showToolbar
  hideToolbar: hideToolbar
  closeWindow: closeWindow
  getNetworkType: getNetworkType
  previewImage: previewImage
)
'use strict';
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    return define(factory);
  } else if (typeof exports === 'object') {
    return module.exports = factory();
  } else {
    return root.WechatApi = factory();
  }
})(this, function() {
  var hideOptionMenu, hideToolbar, previewImage, ready, shareToEmail, shareToFriend, shareToTimeline, shareToWeibo, showOptionMenu, showToolbar, _WXJS;
  _WXJS = {
    on: function(namespace, callback) {
      var _ref;
      if (callback == null) {
        callback = function() {};
      }
      return (_ref = window.WeixinJSBridge) != null ? _ref.on(namespace, callback) : void 0;
    },
    emit: function(namespace, data, callback) {
      var _ref;
      if (data == null) {
        data = {};
      }
      if (callback == null) {
        callback = function() {};
      }
      return (_ref = window.WeixinJSBridge) != null ? _ref.invoke(namespace, data, callback) : void 0;
    }
  };
  ready = function(callback) {
    if (typeof window.WeixinJSBridge === 'undefined') {
      return document.addEventListener('WeixinJSBridgeReady', callback, false);
    } else {
      return callback();
    }
  };
  shareToTimeline = function(data, callbacks) {
    if (callbacks == null) {
      callbacks = {};
    }
    return _WXJS.on('menu:share:timeline', function(argv) {
      if (typeof callbacks.before === "function") {
        callbacks.before(argv);
      }
      return _WXJS.emit('shareTimeline', {
        appid: data.appId || '',
        img_url: data.imgUrl,
        link: data.link,
        desc: data.title,
        title: data.desc
      }, function(resp) {
        switch (resp.err_msg) {
          case 'share_timeline:cancel':
            if (typeof callbacks.cancel === "function") {
              callbacks.cancel(resp);
            }
            break;
          case 'share_timeline:fail':
            if (typeof callbacks.error === "function") {
              callbacks.error(resp);
            }
            break;
          case 'share_timeline:confirm':
          case 'share_timeline:ok':
            if (typeof callbacks.success === "function") {
              callbacks.success(resp);
            }
        }
        return typeof callbacks.always === "function" ? callbacks.always(resp) : void 0;
      });
    });
  };
  shareToFriend = function(data, callbacks) {
    if (callbacks == null) {
      callbacks = {};
    }
    return _WXJS.on('menu:share:appmessage', function(argv) {
      if (typeof callbacks.before === "function") {
        callbacks.before(argv);
      }
      return _WXJS.emit('sendAppMessage', {
        appid: data.appId || '',
        img_url: data.imgUrl,
        link: data.link,
        desc: data.desc,
        title: data.title
      }, function(resp) {
        switch (resp.err_msg) {
          case 'send_app_msg:cancel':
            if (typeof callbacks.cancel === "function") {
              callbacks.cancel(resp);
            }
            break;
          case 'send_app_msg:fail':
            if (typeof callbacks.error === "function") {
              callbacks.error(resp);
            }
            break;
          case 'send_app_msg:confirm':
          case 'send_app_msg:ok':
            if (typeof callbacks.success === "function") {
              callbacks.success(resp);
            }
        }
        return typeof callbacks.always === "function" ? callbacks.always(resp) : void 0;
      });
    });
  };
  shareToWeibo = function(data, callbacks) {
    return _WXJS.on('menu:share:weibo', function(argv) {
      if (typeof callbacks.before === "function") {
        callbacks.before(argv);
      }
      return _WXJS.emit('shareWeibo', {
        content: data.desc,
        url: data.link
      }, function(resp) {
        switch (resp.err_msg) {
          case 'share_weibo:cancel':
            if (typeof callbacks.cancel === "function") {
              callbacks.cancel(resp);
            }
            break;
          case 'share_weibo:fail':
            if (typeof callbacks.error === "function") {
              callbacks.error(resp);
            }
            break;
          case 'share_weibo:confirm':
          case 'share_weibo:ok':
            if (typeof callbacks.success === "function") {
              callbacks.success(resp);
            }
        }
        return typeof callbacks.always === "function" ? callbacks.always(resp) : void 0;
      });
    });
  };
  shareToEmail = function(data, callbacks) {
    return _WXJS.on('menu:share:email', function(argv) {
      if (typeof callbacks.before === "function") {
        callbacks.before(argv);
      }
      return _WXJS.emit('sendEmail', {
        title_link: data.link,
        content: data.desc,
        title: data.title
      }, function(resp) {
        switch (resp.err_msg) {
          case 'share_email:cancel':
            if (typeof callbacks.cancel === "function") {
              callbacks.cancel(resp);
            }
            break;
          case 'share_email:fail':
            if (typeof callbacks.error === "function") {
              callbacks.error(resp);
            }
            break;
          case 'share_email:confirm':
          case 'share_email:ok':
            if (typeof callbacks.success === "function") {
              callbacks.success(resp);
            }
        }
        return typeof callbacks.always === "function" ? callbacks.always(resp) : void 0;
      });
    });
  };
  showOptionMenu = function() {
    return _WXJS.emit('showOptionMenu');
  };
  hideOptionMenu = function() {
    return _WXJS.emit('hideOptionMenu');
  };
  showToolbar = function() {
    return _WXJS.emit('showToolbar');
  };
  hideToolbar = function() {
    return _WXJS.emit('hideToolbar');
  };
  previewImage = function(current, urls) {
    if (!(current && urls && urls.length > 0)) {
      return;
    }
    return WeixinJSBridge.invoke('imagePreview', {
      current: current,
      urls: urls
    });
  };
  return {
    version: "0.0.1",
    ready: ready,
    shareToTimeline: shareToTimeline,
    shareToFriend: shareToFriend,
    shareToWeibo: shareToWeibo,
    shareToEmail: shareToEmail,
    showOptionMenu: showOptionMenu,
    hideOptionMenu: hideOptionMenu,
    showToolbar: showToolbar,
    hideToolbar: hideToolbar,
    previewImage: previewImage
  };
});

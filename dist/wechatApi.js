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
  var closeWindow, getNetworkType, hideOptionMenu, hideToolbar, previewImage, ready, share, shareToEmail, shareToFriend, shareToTimeline, shareToWeibo, showOptionMenu, showToolbar, _WXJS, _defaults, _extend, _invokeCallbacks;
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
  _extend = function(obj) {
    var prop, source, type, _i, _len;
    type = typeof obj;
    if (!(type === 'function' || type === 'object' && !!obj)) {
      return obj;
    }
    for (_i = 0, _len = arguments.length; _i < _len; _i++) {
      source = arguments[_i];
      for (prop in source) {
        obj[prop] = source[prop];
      }
    }
    return obj;
  };
  _invokeCallbacks = function(resp, callbacks) {
    var msg;
    msg = resp.err_msg;
    if (/:ok$/.test(msg)) {
      if (typeof callbacks.success === "function") {
        callbacks.success(resp);
      }
    } else if (/:confirm$/.test(msg)) {
      if (typeof callbacks.success === "function") {
        callbacks.success(resp);
      }
    } else if (/:cancel$/.test(msg)) {
      if (typeof callbacks.cancel === "function") {
        callbacks.cancel(resp);
      }
    } else if (/:fail$/.test(msg)) {
      if (typeof callbacks.error === "function") {
        callbacks.error(resp);
      }
    }
    return typeof callbacks.always === "function" ? callbacks.always(resp) : void 0;
  };
  _defaults = {
    link: window.top.location.href,
    img_width: '256',
    img_height: '256',
    img_url: void 0,
    appid: void 0,
    title: void 0,
    desc: void 0
  };
  ready = function(callback) {
    if (typeof window.WeixinJSBridge === 'undefined') {
      return document.addEventListener('WeixinJSBridgeReady', callback, false);
    } else {
      return callback();
    }
  };

  /*
    diff 用来不同分享类型 不同数据
    这是个很蛋疼的需求
    data =
      friend: 好友
      timeline: 朋友圈
      weibo: 微博
      email: email
   */
  share = function(data, callbacks, diff) {
    if (diff == null) {
      diff = false;
    }
    return _WXJS.on('menu:general:share', function(argv) {
      var shareTo, type;
      if (typeof callbacks.before === "function") {
        callbacks.before(argv);
      }
      shareTo = argv.shareTo;
      type = void 0;
      switch (shareTo) {
        case 'friend':
        case 'appmessage':
        case 'sendappmessage':
          type = 'sendAppMessage';
          if (diff) {
            data = data.friend;
          }
          break;
        case 'timeline':
          type = 'shareTimeline';
          if (diff) {
            data = data.timeline;
          }
          break;
        case 'weibo':
          type = 'shareWeibo';
          if (diff) {
            data = data.weibo;
          }
          break;
        case 'email':
          type = 'sendEmail';
          if (diff) {
            data = data.emial;
          }
      }
      if (!type) {
        return;
      }
      return _WXJS.emit(type, _extend({}, _defaults, data), function(resp) {
        return _invokeCallbacks(resp, callbacks);
      });
    });
  };
  shareToTimeline = function(data, callbacks) {
    if (callbacks == null) {
      callbacks = {};
    }
    return _WXJS.on('menu:share:timeline', function(argv) {
      if (typeof callbacks.before === "function") {
        callbacks.before(argv);
      }
      return _WXJS.emit('shareTimeline', _extend({}, _defaults, data), function(resp) {
        return _invokeCallbacks(resp, callbacks);
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
      return _WXJS.emit('sendAppMessage', _extend({}, _defaults, data), function(resp) {
        return _invokeCallbacks(resp, callbacks);
      });
    });
  };
  shareToWeibo = function(data, callbacks) {
    return _WXJS.on('menu:share:weibo', function(argv) {
      if (typeof callbacks.before === "function") {
        callbacks.before(argv);
      }
      return _WXJS.on('shareWeibo', _extend({}, _defaults, data), function(resp) {
        return _invokeCallbacks(resp, callbacks);
      });
    });
  };
  shareToEmail = function(data, callbacks) {
    return _WXJS.on('menu:share:email', function(argv) {
      if (typeof callbacks.before === "function") {
        callbacks.before(argv);
      }
      return _WXJS.on('sendEmail', _extend({}, _defaults, data), function(resp) {
        return _invokeCallbacks(resp, callbacks);
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
  closeWindow = function() {
    return _WXJS.emit('closeWindow');
  };
  getNetworkType = function(callback) {
    return _WXJS.emit('getNetworkType', {}, function(resp) {
      var type;
      type = resp.err_msg;
      return callback(type ? type.slice('network_type:'.length) : type);
    });
  };
  previewImage = function(current, urls) {
    if (!(current && urls && urls.length > 0)) {
      return;
    }
    return _WXJS.emit('imagePreview', {
      current: current,
      urls: urls
    });
  };
  return {
    version: "0.0.3",
    ready: ready,
    share: share,
    shareToTimeline: shareToTimeline,
    shareToFriend: shareToFriend,
    shareToWeibo: shareToWeibo,
    shareToEmail: shareToEmail,
    showOptionMenu: showOptionMenu,
    hideOptionMenu: hideOptionMenu,
    showToolbar: showToolbar,
    hideToolbar: hideToolbar,
    closeWindow: closeWindow,
    getNetworkType: getNetworkType,
    previewImage: previewImage
  };
});

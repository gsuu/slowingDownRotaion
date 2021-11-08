'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var defaultProperty = {
  currentPlayCount: null,
  playCount: null,
  currentIndex: null,
  stopIndex: null,
  slowDownStartindex: null,
  isSlowdown: false,
  isPlay: false,
  isStop: false,
  countTimer: null
};
var defaultSetting = {
  wrapperElement: null,
  targetElement: null,
  itemElements: null,
  speed: 100,
  stopIndex: 0,
  playCount: 3,
  autoStart: false,
  stopCallback: function stopCallback() {},
  startCallback: function startCallback() {},
  slowDownCallback: function slowDownCallback() {}
};

var slowingDownRotation = /*#__PURE__*/function () {
  function slowingDownRotation(options) {
    _classCallCheck(this, slowingDownRotation);

    Object.assign(this, {
      options: Object.assign({}, defaultProperty, defaultSetting, options)
    });
  }

  _createClass(slowingDownRotation, [{
    key: "init",
    value: function init() {
      var options = this.options;

      if (options.autoStart) {
        this.start();
      }
    }
  }, {
    key: "start",
    value: function start() {
      var options = this.options;

      if (options.countTimer) {
        clearTimeout(options.countTimer);
      }

      if (!options.isPlay) {
        options.isPlay = true;
      }

      options.startCallback();
      this.roll(options.playCount, options.speed);
    }
  }, {
    key: "stop",
    value: function stop() {
      var options = this.options;

      if (!options.isSlowdown) {
        if (options.countTimer) {
          clearTimeout(options.countTimer);
        }

        options.stopCallback();

        if (options.itemElements.length >= options.stopIndex && options.stopIndex >= 0) {
          options.isSlowdown = true;
          options.currentPlayCount = 0;
          this.roll(Math.max(1, Math.ceil(20 / options.itemElements.length)), options.speed);
          options.slowDownCallback();
        }
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      var options = this.options;
      options.playCount = defaultProperty.playCount;
      options.currentIndex = defaultProperty.currentIndex;
      options.slowDownStartindex = defaultProperty.slowDownStartindex;
      options.isSlowdown = defaultProperty.isSlowdown;
      options.isStop = defaultProperty.isStop;

      if (options.countTimer) {
        clearTimeout(options.countTimer);
        options.countTimer = null;
      }
    }
  }, {
    key: "roll",
    value: function roll(_count, _speed) {
      var _this = this;

      var options = this.options;
      options.currentIndex++;

      if (options.currentIndex >= options.itemElements.length) {
        options.currentIndex = 0;
        options.currentPlayCount++;
      }

      if (options.isSlowdown) {
        if (options.currentPlayCount > _count && options.currentIndex - 1 === options.stopIndex) {
          this.reset();
          return;
        }

        _speed = Math.floor(_speed + _count * (options.currentIndex * options.currentPlayCount));
      } else {
        if (options.currentPlayCount > _count) {
          this.stop();
          return;
        }
      }

      this.output();
      options.countTimer = setTimeout(function () {
        _this.roll(_count, _speed);
      }, _speed);
    }
  }, {
    key: "output",
    value: function output() {
      var options = this.options;
      var activeClass = 'is-active';
      var prevIndex = options.currentIndex - 1;

      if (prevIndex < 0) {
        prevIndex = options.itemElements.length - 1;
      }

      options.itemElements[prevIndex].classList.remove(activeClass);
      options.itemElements[options.currentIndex].classList.add(activeClass);
    }
  }]);

  return slowingDownRotation;
}();

module.exports = slowingDownRotation;

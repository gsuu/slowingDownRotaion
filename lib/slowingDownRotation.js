const defaultProperty = {
  currentPlayCount: null,
  playCount: null,
  currentIndex : null,
  stopIndex: null,
  slowDownStartindex : null,

  isSlowdown : false,
  isPlay: false,
  isStop : false,
  
  countTimer: null,
}

const defaultSetting = {
  wrapperElement : null,
  targetElement : null,
  itemElements : null,
  speed: 100,
  stopIndex : 0,
  playCount: 3,
  autoStart: false,
  stopCallback: () => {},
  startCallback: () => {},
  slowDownCallback: () => {}
};

export default class slowingDownRotation {
  constructor(options) {
    Object.assign(this, {
      options: Object.assign({}, defaultProperty, defaultSetting, options)
    })
  }

  init() {
    const { options } = this;

    if(options.autoStart) {
      this.start();
    }
  }

  start() {
    const { options } = this;

    if(options.countTimer) {
      clearTimeout(options.countTimer)
    }
    
    if(!options.isPlay) {
      options.isPlay = true;
    }

    options.startCallback();

    this.roll(options.playCount, options.speed);
  }

  stop() {
    const { options } = this;

    if (!options.isSlowdown) {
      if(options.countTimer) {
        clearTimeout(options.countTimer)
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

  reset() {
    const { options } = this;
    options.playCount = defaultProperty.playCount;
    options.currentIndex = defaultProperty.currentIndex;
    options.slowDownStartindex = defaultProperty.slowDownStartindex;
    options.isSlowdown = defaultProperty.isSlowdown;
    options.isStop = defaultProperty.isStop;

    if(options.countTimer) {
      clearTimeout(options.countTimer);
      options.countTimer = null;
    }
  }

  roll(_count, _speed) {
    const { options } = this;

    options.currentIndex++;

    if(options.currentIndex >= options.itemElements.length) {
      options.currentIndex = 0;
      options.currentPlayCount++;
    }

    if (options.isSlowdown) {
      if (options.currentPlayCount > _count && options.currentIndex-1 === options.stopIndex) {
        this.reset();
        return;
      }
      _speed = Math.floor(_speed + (_count * (options.currentIndex * options.currentPlayCount)));
    } else {
      if (options.currentPlayCount > _count) {
        this.stop();
        return;
      }
    }
    this.output();

    options.countTimer = setTimeout(() => {
      this.roll(_count, _speed)
    }, _speed);
  }

  output() {
    const { options } = this;
    const activeClass = 'is-active';

    let prevIndex = options.currentIndex - 1;
    if(prevIndex < 0) {
      prevIndex = options.itemElements.length - 1;
    }
    options.itemElements[prevIndex].classList.remove(activeClass);
    options.itemElements[options.currentIndex].classList.add(activeClass);
  }
}

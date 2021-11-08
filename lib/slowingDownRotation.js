const defaultProperty = {
  currentPlayCount: 0,
  playCount: 0,
  currentIndex : -1,
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
  startIndex: 2,
  stopIndex : 0,
  playCount: 3,
  autoStart: false,
  reverse: false,
  stopCallback: () => {},
  startCallback: () => {},
  slowDownCallback: () => {}
};

export default class SlowingDownRotation {
  constructor(options) {
    this.updateOption(options);
  }

  init() {
    const { options } = this;

    if(options.autoStart) {
      this.start();
    }
  }

  updateOption(options) {
    Object.assign(this, {
      options: Object.assign({}, defaultProperty, defaultSetting, options)
    })
    if(!this.options.reverse) {
      this.options.currentIndex = options.startIndex ? options.startIndex - 1 : defaultSetting.startIndex - 1;
    } else {
      this.options.currentIndex = options.startIndex ? options.startIndex: defaultSetting.startIndex;

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
    if(options.countTimer) {
      clearTimeout(options.countTimer);
      options.countTimer = null;
    }

    options.playCount = defaultProperty.playCount;
    options.currentIndex = options.startIndex - 1;
    options.slowDownStartindex = defaultProperty.slowDownStartindex;
    options.isSlowdown = defaultProperty.isSlowdown;
    options.isStop = defaultProperty.isStop;
  }

  roll(_count, _speed) {
    const { options } = this;

    if (options.isSlowdown) {
      if (options.currentPlayCount > _count && options.currentIndex === options.stopIndex) {
        this.reset();
        return;
      }
      _speed = Math.floor(_speed + (_count * (options.currentIndex * options.currentPlayCount)));
    } else {
      if (options.currentPlayCount === _count) {
        this.stop();
        return;
      }
    }
    this.controllIndex();

    options.countTimer = setTimeout(() => {
      this.roll(_count, _speed)
    }, _speed);
  }

  controllIndex() {
    const { options } = this;
    const index = {
      xPrev: null,
      prev: null, 
      current: null, 
      next: null, 
      xNext: null
    }
    if(!options.reverse) {
      options.currentIndex++;
      if(options.currentIndex === options.itemElements.length) {
        options.currentIndex = 0;
        options.currentPlayCount++;
      }

      index.prev = options.currentIndex - 1;
      if(index.prev < 0) {
        index.prev = options.itemElements.length - 1;
      }
      
      index.xPrev = index.prev - 1;
      if(index.xPrev < 0) {
        index.xPrev = options.itemElements.length - 1;
      }

      index.next = options.currentIndex + 1;
      if(index.next === options.itemElements.length) {
        index.next = 0;
      }

      index.current = options.currentIndex;
    } else {
      options.currentIndex--;
      if(options.currentIndex === -1) {
        options.currentIndex = options.itemElements.length - 1;
      }

      if(options.currentIndex === 0) {
        options.currentPlayCount++;
      }

      index.prev = options.currentIndex - 1;
      if(index.prev < 0) {
        index.prev = options.itemElements.length - 1;
      }

      index.next = options.currentIndex + 1;
      if(index.next === options.itemElements.length) {
        index.next = 0;
      }
      if(index.next < 0) {
        index.next = options.itemElements.length - 1;
      }

      index.xNext = index.next + 1;
      if(index.xNext === options.itemElements.length) {
        index.xNext = 0;
      }
     
      index.current = options.currentIndex;
    }

    this.output(index);
  }

  output(index) {
    const { options } = this;
    const { xPrev, xNext, prev, current, next } = index;
    const activeClass = 'sdr-active';
    const prevClass = 'sdr-prev';
    const nextClass = 'sdr-next';

    if(!options.reverse) {
      options.itemElements[xPrev].classList.remove(prevClass);
      options.itemElements[prev].classList.add(prevClass);
      options.itemElements[prev].classList.remove(activeClass);
      options.itemElements[current].classList.add(activeClass);
      options.itemElements[current].classList.remove(nextClass);
      options.itemElements[next].classList.add(nextClass);
    } else {
      options.itemElements[current].classList.remove(prevClass);
      options.itemElements[next].classList.remove(activeClass);
      options.itemElements[xNext].classList.remove(nextClass);
      options.itemElements[current].classList.add(activeClass);
      options.itemElements[next].classList.add(nextClass);
      options.itemElements[prev].classList.add(prevClass);
    }
  }
}

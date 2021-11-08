const roulette = new SlowingDownRotation({
  wrapperElement: document.querySelector('.sdr-motion'),
  targetElement: document.querySelector('.sdr-motion__target'),
  itemElements: document.querySelectorAll('.sdr-motion__item'),
  speed: 100,
  stopIndex : 4,
  playCount: 3,
  autoStart: true,
})
roulette.init();
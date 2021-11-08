const roulette = new SlowingDownRotation({
  wrapperElement: document.querySelector('.demo__wrapper'),
  targetElement: document.querySelector('.demo__list'),
  itemElements: document.querySelectorAll('.demo__item'),
  speed: 100,
  stopIndex : 4,
  playCount: 3,
  autoStart: true,
})
roulette.init();
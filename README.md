# slowingDownRotaion
원하는 만큼 반복하다가 점점 감속되는 모션을 위한 라이브러리 입니다.

## Options
```js
{
    wrapperElement : null, // Element Node
    targetElement : null, // Element Node
    itemElements : null, // Element Nodes
    speed: 100, // 모션 기본 스피드
    stopIndex : 0, // 정지 될 인덱스
    playCount: 3, // 반복 횟수
    autoStart: false, // 자동시작여부
    stopCallback: () => {},
    startCallback: () => {},
    slowDownCallback: () => {}
}
```

## Examples
app.html
```html
<div class="demo">
    <div class="demo__wrapper">
      <ul class="demo__list">
        <li class="demo__item">
          <span class="day">월</span>
        </li>
        <li class="demo__item">
          <span class="day">화</span>
        </li>
        <li class="demo__item">
          <span class="day">수</span>
        </li>
        <li class="demo__item">
          <span class="day">목</span>
        </li>
        <li class="demo__item">
          <span class="day">금</span>
        </li>
        <li class="demo__item">
          <span class="day">토</span>
        </li>
        <li class="demo__item">
          <span class="day">일</span>
        </li>
      </ul>
    </div>
</div>
```

app.js
```js
const roulette = new SlowingDownRotation({
    wrapperElement: document.querySelector('.demo__wrapper'),
    targetElement: document.querySelector('.demo__list'),
    itemElements: document.querySelectorAll('.demo__item'),
    speed: 100,
    stopIndex : 4,
    playCount: 3,
    autoStart: true,
});
roulette.init();
```

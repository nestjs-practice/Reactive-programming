##  Pipable operators:

---

* Observable의 데이터를 pure function으로 가공<br>
* (현존하는 데이터를 수정하지 않음)
* rxjs.operators에서 로드
* pipe 함수에 하나 이상 넣어 연결

```typescript
import { range } from 'rxjs'

const { filter } = rxjs.operators
const observable$ = range(1, 10)

const observer = {
  next: x => console.log(x + ' 발행'),
  error: err => console.error('발행중 오류', err),
  complete: () => console.log('발행물 완결'),
}

// * 파이프를 사용하여 1~10 중 2로 나누었을때 나머지가 0인(짝수)수만 filter 후 구독 생성
observable$.pipe(
  filter(x => x % 2 === 0)
).subscribe(observer)
```

### 파이프에는 하나 이상의 operator들이 쉼표로 구분되어 들어갈 수 있다.
```typescript
// * map 추가해보기
map(x => x * x)
```

### 시간, 이벤에 의한 발행물에 적용
```typescript
import { interval } from 'rxjs'

const { tap, filter, map } = rxjs.operators
const observable$ = interval(1000)

// * ... observer 정의

observable$.pipe(
  tap(console.log),
  filter(x => x % 2 === 0),
  map(x => x * x)
).subscribe(observer)
```
```typescript
import { fromEvent } from 'rxjs'

const { map } = rxjs.operators
const observable$ = fromEvent(document, 'click') 

// * ... observer 정의

observable$.pipe(
  map(e => e.x + ' ' + e.y),
).subscribe(observer)
```
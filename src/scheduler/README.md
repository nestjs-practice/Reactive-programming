## Scheduler

**옵저버블이나 연산자, 구독자가 멀티스레딩 환경에서 어느 스레드상에 실행될지**를 정하는 것<br>

🚀_ 지금 뭐가 진행되고 있든 이 작업을 지금 당장 실행해버릴지<br>
🐇_ 현재 진행되고 있는 작은 작업을 마치는대로 최대한 빨리 실행할지<br>
🐌_ 느긋하게 맨 뒤로 밀어서, 하고 있는 일들을 다 마치고 실행할지<br>
⏰_ 특정 시간을 정해서 때가 되면 실행할지<br>


**예를 들어**
* debounce처럼 콜백이 이벤트 루프를 돌아 지연 처리되는 연산자는 computation
* timestamp나 timeInterval처럼 발행 즉시 구독자에게 넘겨지는 연산자는 immediate
* repeat처럼 대기중인 큐가 다 처리된 다음 실행되는 연산자에는 trampoline


| RxJS용 스케줄러 | 설명 | 
|---------|---------|
| null| 스케줄러 없음. 동기적으로 또는 재귀적으로 사용되는 연산자에 사용|
| queueScheduler| 새 작업을 현재의 작업(task) 대기줄 맨 끝에 세움. 반복 연산자에 사용|
| asapScheduler| Promise에 사용되는 것과 동일 - 현 소작업(microtask)이 끝나고 그 다음 소작업을 하기 전 실행. 비동기 작업에 사용|
| asyncScheduler| setInterval과 함께 사용됨. 시간 관련 연산자에 사용|
| animationFrameScheduler| 브라우저가 내용을 새로 그리기(repaint) 전 실행됨. 부드러운 애니메이션을 위해 사용|


이러한 스케줄러들을 파이프에 적용하기 위해 언어들마다 공통적으로 사용되는 연산자들

| 연산자 | 설명                                      |
|---------|-----------------------------------------|
| SubscribeOn| **옵저버블** 또는 이를 처리할 **연산자**를 실행할 스케줄러 지정 |
| ObserverOn| **구독자**에게 알림을 보낼 때 사용할 스케줄러 지정          |


```typescript
import { of, asyncScheduler } from 'rxjs'
import { subscribeOn, observeOn, tap } from 'rxjs.operators'

const tapper = x => console.log(`${x} IN`)
const observer = x => console.log(`${x} OUT`)

of(1, 2, 3).pipe(
  tap(tapper),
  subscribeOn(asyncScheduler)
).subscribe(observer)

of(4, 5, 6).pipe(
  tap(tapper),
).subscribe(observer)


of('A', 'B', 'C').pipe(
  tap(tapper),
  observeOn(asyncScheduler)
).subscribe(observer)

of('D', 'E', 'F').pipe(
  tap(tapper),
).subscribe(observer)
```
위의 예제에서 숫자 1, 2, 3을 발행하는 스트림과 문자 'A', 'B, 'C'를 발행하는 스트림에,
각 발행물을 현재의 마이크로태스크 다음에 발행하도록 하는 **asyncScheduler**를 적용했습니다.
때문에 각각은 4, 5, 6,과 'D', 'E', 'F'보다 다음에 나오죠.

차이가 있다면, 1, 2, 3은 **subscribeOn**을 써서 구독,
즉 **옵저버블이나 연산자가 실행되는** 시점부터 해당 스케줄러를 지정했습니다.
그리고 'A', 'B', 'C'는 observeOn을 사용해서
이들이 **구독자에게 전달되는** 시점만 async로 동작하도록 했죠.


때문에 전자는 tap('~ IN')되는 동작까지 모두 4, 5, 6보다 늦게 나온 반면

후자는 tap 부분은 먼저 출력되고
subscribe('~ OUT')되는 부분만 'D', 'E', 'F'보다 나중에 출력된 것입니다.


---

연산자들은 각각이 이미 적절한 스케줄러가 부여되어 있으므로
subscribeOn으로 이들을 굳이 지정하기보다는,

구독자가 이를 받아 작업을 수행하는 시점을 정하는
observeOn이 실무에서 보다 활용될 것입니다.


자바스크립트처럼 상대적으로 덜 부각되는 환경도 있지만
iOS 앱 개발을 위한 스위프트 등에서와 같이

각 작업이 어떤 스레드에서 진행되는가(ex: UI가 업데이트되는 큐)가 중요한 곳에서는
이 스케줄러를 공부해 둘 필요가 있습니다.
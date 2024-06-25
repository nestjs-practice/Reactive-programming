## Observable과의 차이

### Observable
* 누군가 구독을 해야 발행을 시작
* 각 구독자에게 따로 발행
* unicast
* cold 발행
* Netflix

### Subject
* 개발자가 원하는 때에 발행
* 모든 구독자에게 똑같이 발행
* multicast
* hot 발행
* TV 채널

```typescript
import { Subject } from 'rxjs'
const subject = new Subject()

setTimeout(_ => {
    let x = 0
    setInterval (_ => {
        subject.next(x++)
    }, 2000)
}, 5000)

subject.subscribe(x => console.log('바로구독: ' + x))
setTimeout(_ => {
    subject.subscribe(x => console.log('3초 후 구독: ' + x))
}, 3000)

setTimeout(_ => {
    subject.subscribe(x => console.log('10초 후 구독: ' + x))
}, 10000)

setTimeout(_ => {
    subject.subscribe(x => console.log('14초 후 구독: ' + x))
}, 14000)
```

### 일반 Observable에 결합하기
```typescript
import { interval } from 'rxjs'

const obs$ = interval(1000)

obs$.subscribe(x => console.log('바로구독: ' + x))
setTimeout(_ => {
    obs$.subscribe(x => console.log('3초 후 구독: ' + x))
}, 3000)

setTimeout(_ => {
    obs$.subscribe(x => console.log('5초 후 구독: ' + x))
}, 5000)

setTimeout(_ => {
    obs$.subscribe(x => console.log('10초 후 구독: ' + x))
}, 10000)
```

### Subject 결합
subject를 observable에 subscriber로서 넘겨줄 수 있다.
```typescript
import { interval, Subject } from 'rxjs'

const subject = new Subject()
const obs$ = interval(1000)

obs$.subscribe(subject)

subject.subscribe(x => console.log('바로구독: ' + x))
setTimeout(_ => {
    subject.subscribe(x => console.log('3초 후 구독: ' + x))
}, 3000)

setTimeout(_ => {
    subject.subscribe(x => console.log('5초 후 구독: ' + x))
}, 5000)

setTimeout(_ => {
    subject.subscribe(x => console.log('10초 후 구독: ' + x))
}, 10000)
```
⭐ 다른 시기에 구독을 시작한 observer들이 같은 값을 발행받도록 할 때 Subject를 사용할 수 있습니다.


---

## 추가 기능이 있는 Subject

## BehaviorSubject

마지막 값을 저장 후 추가 구독자에게 발행
```typescript
import { BehaviorSubject } from 'rxjs'
const subject = new BehaviorSubject(0) // 초기값이 있음
 
subject.subscribe((x) => console.log('A: ' + x))
 
subject.next(1)
subject.next(2)
subject.next(3)
 
subject.subscribe((x) => console.log('B: ' + x))
 
subject.next(4)
subject.next(5)
```

## ReplaySubject

마지막 N개 값을 저장 후 추가 구독자에게 발행
```typescript
import { ReplaySubject } from 'rxjs'
const subject = new ReplaySubject(3) // 마지막 3개 값 저장
 
subject.subscribe((x) => console.log('A: ' + x))
 
subject.next(1)
subject.next(2)
subject.next(3)
subject.next(4)
subject.next(5)
 
subject.subscribe((x) => console.log('B: ' + x))
 
subject.next(6)
subject.next(7)
```

## AsyncSubject

Complete 후의 마지막 값만 발행
```typescript
import { AsyncSubject } from 'rxjs'
const subject = new AsyncSubject()
 
subject.subscribe((x) => console.log('A: ' + x))
 
subject.next(1)
subject.next(2)
subject.next(3)
 
subject.subscribe((x) => console.log('B: ' + x))
 
subject.next(4)
subject.next(5)

subject.subscribe((x) => console.log('C: ' + x))

subject.next(6)
subject.next(7)
subject.complete()
```
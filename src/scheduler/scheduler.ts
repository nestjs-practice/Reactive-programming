import { of, asyncScheduler } from 'rxjs';
import { tap, subscribeOn, observeOn } from 'rxjs/operators';

export const scheduler = () => {
  const tapper = (x) => console.log(`${x} IN`);
  const observer = (x) => console.log(`${x} OUT`);

  // * subscribeOn - 긴 작업을 비동기적으로 처리하고 싶은 경우, 주 스레드에서 블로킹 작업을 피하고 싶을 때 사용
  of(1, 2, 3)
    .pipe(tap(tapper), subscribeOn(asyncScheduler)) // * asyncScheduler를 사용하여 비동기적으로 구독
    .subscribe(observer);

  of(4, 5, 6).pipe(tap(tapper)).subscribe(observer);

  // * observeOn - 특정 오퍼레이터 이후의 처리를 별도의 스케줄러에서 실행하고 싶을 때 사용
  of('A', 'B', 'C')
    .pipe(tap(tapper), observeOn(asyncScheduler)) // * asyncScheduler를 사용하여 비동기적으로 구독
    .subscribe(observer);

  of('D', 'E', 'F').pipe(tap(tapper)).subscribe(observer);
};

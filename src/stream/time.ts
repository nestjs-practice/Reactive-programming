import { delay, interval, take } from 'rxjs';

export const timeStream = () => {
  // * 1초마다 값을 리턴
  const obs1$ = interval(1000);
  // * 3초후에 시작하고 1초마다 값을 리턴
  const obs2$ = interval(1000).pipe(delay(3000), take(10));

  obs1$.subscribe((item) => console.log(`interval: ${item}`));
  obs2$.subscribe((item) => console.log(`timer: ${item}`));
};

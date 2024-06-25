import { Observable } from 'rxjs';

export const customStream = () => {
  const obs$ = new Observable((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);

    // * 값을 모두 발행한 뒤에는 complete를 실행하여 메모리 해제
    subscriber.complete();
  });

  obs$.subscribe((item) => console.log(item));
  // 1
  // 2
  // 3
};

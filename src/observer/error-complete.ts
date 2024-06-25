import { Observable } from 'rxjs';

export const errorObservable = () => {
  const obs$ = new Observable((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.next(4);
  });

  obs$.subscribe(
    console.log,
    (err) => console.error('발행 오류', err),
    () => console.log('발행 완료'),
  );
};

export const completeObservable = () => {
  const obs$ = new Observable((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.complete();
    // * 구독 발행을 완료시키면 4는 출력x
    subscriber.next(4);
  });

  obs$.subscribe(
    console.log,
    (err) => console.error('발행 오류', err),
    () => console.log('발행 완료'),
  );
};

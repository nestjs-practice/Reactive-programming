import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

export const subject = () => {
  const subject = new Subject();

  subject.subscribe(console.log);

  subject.next(1);
  subject.next(2);
  subject.next(3);
};

export const behaviorSubject = () => {
  const subject = new BehaviorSubject(0); // * 초기값 필요

  subject.subscribe((x) => console.log('A: ' + x));

  subject.next(1);
  subject.next(2);
  subject.next(3);

  subject.subscribe((x) => console.log('B: ' + x));

  subject.next(4);
  subject.next(5);
};

export const replaySubject = () => {
  const subject = new ReplaySubject(3); // * 마지막 3개 값 저장

  subject.subscribe((x) => console.log('A: ' + x));

  subject.next(1);
  subject.next(2);
  subject.next(3);
  subject.next(4);
  subject.next(5);

  subject.subscribe((x) => console.log('B: ' + x));

  subject.next(6);
  subject.next(7);
};

export const asyncSubject = () => {
  // * complete 후의 마지막 값만 발행
  const subject = new AsyncSubject();

  subject.subscribe((x) => console.log('A: ' + x));

  subject.next(1);
  subject.next(2);
  subject.next(3);

  subject.subscribe((x) => console.log('B: ' + x));

  subject.next(4);
  subject.next(5);

  subject.subscribe((x) => console.log('C: ' + x));

  subject.next(6);
  subject.next(7);
  subject.complete();
};

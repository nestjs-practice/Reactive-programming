import { from } from 'rxjs';

export const createObserver = () => {
  const observable$ = from([1, 2, 3, 4, 5]);
  const observer = {
    next: console.log,
    error: (e: any) => console.error('발행중 오류', e),
    complete: () => console.log('발행 완료'),
  };
  observable$.subscribe(observer);
};

import { interval } from 'rxjs';

export const deleteObservable = () => {
  const obs$ = interval(1000);
  const subscription = obs$.subscribe(console.log);

  // * 5초 뒤 구독 취소
  setTimeout(() => subscription.unsubscribe(), 5000);
};

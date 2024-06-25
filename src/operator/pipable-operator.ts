import { filter, range } from 'rxjs';

export const pipableOperator = () => {
  const observable$ = range(1, 10);

  const observer = {
    next: (x: number) => console.log(x + ' 발행'),
    error: (err: any) => console.error('발행 오류', err),
    complete: () => console.log('발행 완료'),
  };

  // * 파이프를 사용하여 1~10 중 2로 나누었을때 나머지가 0인(짝수)수만 filter 후 구독 생성
  observable$.pipe(filter((x) => x % 2 === 0)).subscribe(observer);

  // 2 발행
  // 4 발행
  // 6 발행
  // 8 발행
  // 10 발행
  // 발행 완료
};

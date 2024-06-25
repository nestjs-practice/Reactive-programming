import { of, from, range } from 'rxjs';

// ! 배열된 스트림
// * 주어진 인수들을 그대로 방출하는 Observable생성
const obs1$ = of(1, 2, 3, 4, 5);
// * Promise, Iterable 객체, 또는 Observable과 같은 유사 배열 객체를 Observable로 변환
const obs2$ = from([6, 7, 8, 9, 10]);
// * 시작 숫자부터 시작하여 지정된 수만큼의 연속적인 정수를 방출
const obs3$ = range(11, 5);

// console.log(obs1$.subscribe((item) => console.log(`of: ${item}`)));
// console.log(obs2$.subscribe((item) => console.log(`from: ${item}`)));
// console.log(obs3$.subscribe((item) => console.log(`range: ${item}`)));

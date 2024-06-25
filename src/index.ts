import { arrayStream } from './stream/array';
import { timeStream } from './stream/time';
import { customStream } from './stream/custom';
import { createObserver } from './observer/create';
import { completeObservable, errorObservable } from './observer/error-complete';
import { deleteObservable } from './observer/delete';

// * 배열 스트림
// arrayStream();

// * 시간에 의한 스트림
// timeStream();

// * 직접 만드는 스트림
// customStream();

// * 구독
// createObserver();
// errorObservable()
// completeObservable();
deleteObservable();

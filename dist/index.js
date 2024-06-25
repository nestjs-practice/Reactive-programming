"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const obs1$ = (0, rxjs_1.of)(1, 2, 3, 4, 5);
const obs2$ = (0, rxjs_1.from)([6, 7, 8, 9, 10]);
const obs3$ = (0, rxjs_1.range)(11, 5);
console.log(obs1$.subscribe((item) => console.log(`of: ${item}`)));
console.log(obs2$.subscribe((item) => console.log(`from: ${item}`)));
console.log(obs3$.subscribe((item) => console.log(`range: ${item}`)));

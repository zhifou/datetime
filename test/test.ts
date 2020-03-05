import DateTime from '../dist/index';

console.log(new DateTime().addDays(1));
console.log(new DateTime().diffDays(new DateTime(2020, 2, 10)));
console.log(new DateTime().dayOfYear());
console.log(new DateTime().getTime());
console.log(new DateTime(1583035200000).toString());
console.log(new DateTime().dayOfYear());
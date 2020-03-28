import DateTime from '../dist/index';

console.log(new DateTime().addDays(1));
console.log(new DateTime().diffDays(new DateTime(2020, 2, 10)));
console.log(new DateTime().dayOfYear());
console.log(new DateTime().getTime());
console.log(new DateTime(1583035200000).toString());
console.log(new DateTime().dayOfYear());
console.log(new DateTime().getMilliseconds());
const dt: DateTime = new DateTime();
console.log(dt.toString('yyyy-MM-dd hh:mm:ss.fff'));
const dt1: DateTime = dt.addMilliseconds(123);
const dt2: DateTime = new DateTime();
console.log(dt1.toString('yyyy-MM-dd hh:mm:ss.ff'));
console.log(dt1.compareTo(dt2));
console.log(new DateTime('2020-03-03').addDays(-1));
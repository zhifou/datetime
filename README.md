# datetime 介绍
定义一个日期时间对象，用于方便前端像写C#语言一样使用
## 安装
```
$ npm install -S xdatetime
```
## 使用
```
import DateTime from 'xdatetime';

new DateTime();
new DateTime(new Date());
new DateTime(2019, 12, 12);
new DateTime(2019, 12, 12, 12, 12, 12);
new DateTime().toString();
new DateTime().toString('yyyy-MM-dd');
new DateTime().toString('yyyy-MM-dd hh:mm:ss');
new DateTime().addYears(1).toString();
new DateTime().addMonths(1).toString();
new DateTime().addDays(1).toString();
new DateTime().addHours(1).toString();
new DateTime().addMinutes(1).toString();
new DateTime().addSeconds(1).toString();
new DateTime().addMilliseconds(123);
new DateTime().getYears();
new DateTime().getMonths();
new DateTime().getDays();
new DateTime().getHours();
new DateTime().getMinutes();
new DateTime().getSeconds();
new DateTime().getMilliseconds();
new DateTime().dayOfWeek();
new DateTime().dayOfYear();
new DateTime().weekOfYear();
new DateTime().daysOfMonth();
new DateTime().instanceOfDate;
new DateTime().compareTo();
new DateTime().diffDays();
new DateTime().isLeapYear();
DateTime.now().toString();
DateTime.today().toString();
DateTime.daysOfMonth();
DateTime.isLeapYear(2020);
DateTime.formatPassTime(new DateTime(2019, 4, 18));
DateTime.format(new DateTime(2020, 6, 8, 22, 30), 'yyyy-MM-dd hh:mm')
```
## 方法介绍
```
/**
  * 格式化日期
  * @param format 格式化字符串，yyyy-代表年，MM-代表月，dd-代表日，hh-代表小时，mm-代表分钟，ss-代表秒数 -是可替换字符
  */
toString(format?: string): string;

/**
  * 判断是否为闰年
  * @param year 年份
  */
isLeapYear(): boolean;

/**
 * 增加年份，构建一个新的日期
 * @param num 年份数量
 */
addYears(num: number): DateTime;

/**
 * 增加月份，构建一个新的日期
 * @param num 月份数量
 */
addMonths(num: number): DateTime;

/**
 * 增加天数，构造一个新的日期
 * @param num 天数量
 */
addDays(num: number): DateTime;

/**
 * 增加小时，构造一个新的日期
 * @param num 小时数量
 */
addHours(num: number): DateTime;

/**
 * 增加分钟，构造一个新的日期
 * @param num 分钟数量
 */
addMinutes(num: number): DateTime;

/**
 * 增加秒数，构造一个新的日期
 * @param num 秒数数量
 */
addSeconds(num: number): DateTime;

/**
  * 增加毫秒数，构造一个新的日期
  * @param num 毫秒数数量
  */
addMilliseconds(num: number): DateTime;

/**
 * 获取年份
 */
getYears(): number;

/**
 * 获取月份
 */
getMonths(): number;

/**
 * 获取天数
 */
getDays(): number;

/**
 * 获取小时
 */
getHours(): number;

/**
 * 获取分钟
 */
getMinutes(): number;

/**
 * 获取秒数
 */
getSeconds(): number;

/**
  * 获取毫秒秒数
  */
getMilliseconds(): number;

/**
 * 可返回一周（0~6）的某一天的数字。注: 星期天为 0, 星期一为 1, 以此类推。
 */
dayOfWeek(): number;

/**
 * 获取该实例所表示的日期是一年的第几天
 */
dayOfYear(): number;

/**
 * 获取该实例所表示的日期所在一年中的第几周
 */
weekOfYear(): number;

/**
 * 获取当前月的天数
 */
daysOfMonth(): number;

/**
  * 当前的Date类型内置对象
  */
instanceOfDate: Date;

/**
  * 和另外一个日期对象比较，是否相同日期
  * @param compareDate
  */
compareTo(compareDate: DateTime): boolean;

/**
  * 与一个日期对象差的天数，不足一天舍弃不计算，并且不区分正负，返回一个正整数
  * @param compareDate 比较的日期
  * @returns 返回一个正整数，不关心谁大
  */
diffDays(compareDate: DateTime): number;

/**
  * 获取时间戳，单位：毫秒
  * @return 返回一个正整数，单位：毫秒
  */
getTime(): number;

/**
  * 格式化显示距离当前日期已经过去多少时间
  * @return 返回一个格式化的字符串名称
  */
formatPassTime(): string;

/**
  * 今天
  */
static today(): DateTime;

/**
  * 当前时间
  */
static now(): DateTime;

/**
  * 获取某年某月的天数
  */
static daysOfMonth(year: number, month: number): number;

/**
  * 判断是否为闰年
  * @param year 年份
  */
static isLeapYear(year: number): boolean;

/**
  * 格式化现在的已过时间
  * @param  startTime {Date} 开始时间
  * @return {String}
  */
static formatPassTime(startTime: DateTime | Date): string;

/**
  * 格式化日期数据
  * @param date 
  * @param format 
  */
static format(date: DateTime | Date, format?: string): string;
```

## 链接
- **Github源码** ：[https://github.com/zhifou/datetime][1]

[1]: https://github.com/zhifou/datetime
[2]: https://github.com/zhifou/proofs
[3]: https://github.com/zhifou/request-idle-callback
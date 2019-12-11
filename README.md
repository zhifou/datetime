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
new DateTime().getYears();
new DateTime().getMonths();
new DateTime().getDays();
new DateTime().getHours();
new DateTime().getMinutes();
new DateTime().getSeconds();
new DateTime().dayOfWeek();
new DateTime().instanceOfDate;
DateTime.now().toString();
DateTime.today().toString();

```
## 方法介绍
```
    /**
     * 格式化日期
     * @param format 格式化字符串，yyyy-代表年，MM-代表月，dd-代表日，hh-代表小时，mm-代表分钟，ss-代表秒数 -是可替换字符
     */
    toString(format?: string): string;

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
```
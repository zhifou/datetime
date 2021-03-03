"use strict";
exports.__esModule = true;
/**
 * 一分钟的毫秒值 60000 = 60 * 1000
 */
var MILLISECONDS_MIN = 60000;
/**
 * 一小时的毫秒值 3600000 = 60 * 60 * 1000
 */
var MILLISECONDS_HOUR = MILLISECONDS_MIN * 60;
/**
 * 一天的毫秒值 86400000 = 24 * 60 * 60 * 1000
 */
var MILLISECONDS_DAY = MILLISECONDS_HOUR * 24;
var DateTime = /** @class */ (function () {
    /**
     * 构造函数
     * @param year 年
     * @param month 月
     * @param day 日
     * @param hours 小时
     * @param minutes 分钟
     * @param seconds 秒
     * @param milliseconds 毫秒
     */
    function DateTime(year, month, day, hours, minutes, seconds, milliseconds) {
        /**
         * 内部私有的date对象
         */
        this._date = null;
        /**
         * 当前的Date类型内置对象
         */
        this.instanceOfDate = null;
        if (arguments.length === 0) {
            this._date = new Date();
        }
        else if (arguments.length === 1) {
            // 保持new Date()参数的默认特征
            this._date = new Date(year);
        }
        else {
            if (typeof year !== 'number') {
                throw new Error('only support number type');
            }
            this._date = new Date(year, (month || 1) - 1, day || 1, hours || 0, minutes || 0, seconds || 0, milliseconds || 0);
        }
        this.instanceOfDate = this._date;
    }
    /**
     * 获取年份
     */
    DateTime.prototype.getYears = function () {
        return this._date.getFullYear();
    };
    /**
     * 获取月份
     */
    DateTime.prototype.getMonths = function () {
        return this._date.getMonth() + 1;
    };
    /**
     * 获取天数
     */
    DateTime.prototype.getDays = function () {
        return this._date.getDate();
    };
    /**
     * 获取小时
     */
    DateTime.prototype.getHours = function () {
        return this._date.getHours();
    };
    /**
     * 获取分钟
     */
    DateTime.prototype.getMinutes = function () {
        return this._date.getMinutes();
    };
    /**
     * 获取秒数
     */
    DateTime.prototype.getSeconds = function () {
        return this._date.getSeconds();
    };
    /**
     * 获取毫秒秒数
     */
    DateTime.prototype.getMilliseconds = function () {
        return this._date.getMilliseconds();
    };
    /**
     * 可返回一周（0~6）的某一天的数字。注: 星期天为 0, 星期一为 1, 以此类推。
     */
    DateTime.prototype.dayOfWeek = function () {
        return this._date.getDay();
    };
    /**
     * 获取该实例所表示的日期是一年的第几天
     */
    DateTime.prototype.dayOfYear = function () {
        var currentYear = this.getYears();
        // 今天减今年的第一天（xxxx年01月01日）
        var hasTimestamp = new Date(currentYear, this.getMonths() - 1, this.getDays()).getTime()
            - new Date(currentYear, 0, 1).getTime();
        var hasDays = Math.ceil(hasTimestamp / MILLISECONDS_DAY);
        return hasDays + 1;
    };
    /**
     * 获取该实例所表示的日期所在一年中的第几周
     */
    DateTime.prototype.weekOfYear = function () {
        var currentYear = this.getYears();
        var firstDay = new Date(currentYear, 0, 1);
        var dayOfWeek = firstDay.getDay();
        var spendDay = 1;
        if (dayOfWeek !== 0) {
            spendDay = 7 - dayOfWeek + 1;
        }
        firstDay = new Date(currentYear, 0, 1 + spendDay);
        var d = Math.ceil((this._date.getTime() - firstDay.getTime()) / MILLISECONDS_DAY);
        var result = Math.ceil(d / 7);
        return result + 1;
    };
    /**
     * 获取当前月的天数
     */
    DateTime.prototype.daysOfMonth = function () {
        return DateTime.daysOfMonth(this.getYears(), this.getMonths());
    };
    /**
     * 格式化日期
     * @param format 格式化字符串，yyyy-代表年，MM-代表月，dd-代表日，hh-代表小时，mm-代表分钟，ss-代表秒数，SSS-代表3位毫秒数 -是可替换字符
     */
    DateTime.prototype.toString = function (format) {
        format = format || 'yyyy-MM-dd hh:mm:ss';
        return DateTime.format(this, format);
    };
    /**
     * 判断是否为闰年
     * @param year 年份
     */
    DateTime.prototype.isLeapYear = function () {
        return DateTime.isLeapYear(this.getYears());
    };
    /**
     * 增加年份，构建一个新的日期
     * @param num 年份数量
     */
    DateTime.prototype.addYears = function (num) {
        var year = this.getYears();
        year += num;
        var month = this.getMonths();
        var day = this.getDays();
        if (month === 2 && day === 29 && !DateTime.isLeapYear(year)) {
            // 如果是平年，则取28日，为最后一天
            day = 28;
        }
        var hours = this.getHours();
        var minutes = this.getMinutes();
        var seconds = this.getSeconds();
        var milliseconds = this.getMilliseconds();
        return new DateTime(year, month, day, hours, minutes, seconds, milliseconds);
    };
    /**
     * 增加月份，构建一个新的日期
     * @param num 月份数量
     */
    DateTime.prototype.addMonths = function (num) {
        var year = this.getYears();
        year = year > 0 ? year : 1;
        var month = this.getMonths() + num;
        var newDate = new Date(year, month - 1, 1);
        var newMonth = newDate.getMonth() + 1;
        var newYear = newDate.getFullYear();
        var day = this.getDays();
        var newDay = DateTime.daysOfMonth(newYear, newMonth);
        if (newDay < day) {
            day = newDay;
        }
        var hours = this.getHours();
        var minutes = this.getMinutes();
        var seconds = this.getSeconds();
        var milliseconds = this.getMilliseconds();
        return new DateTime(newYear, newMonth, day, hours, minutes, seconds, milliseconds);
    };
    /**
     * 增加天数，构造一个新的日期
     * @param num 天数量
     */
    DateTime.prototype.addDays = function (num) {
        var addMillis = num * MILLISECONDS_DAY;
        var time = this.getTime();
        return new DateTime(time + addMillis);
    };
    /**
     * 增加小时，构造一个新的日期
     * @param num 小时数量
     */
    DateTime.prototype.addHours = function (num) {
        var addMillis = num * MILLISECONDS_HOUR;
        var time = this.getTime();
        return new DateTime(time + addMillis);
    };
    /**
     * 增加分钟，构造一个新的日期
     * @param num 分钟数量
     */
    DateTime.prototype.addMinutes = function (num) {
        var addMillis = num * 60 * 1000;
        var time = this.getTime();
        return new DateTime(time + addMillis);
    };
    /**
     * 增加秒数，构造一个新的日期
     * @param num 秒数数量
     */
    DateTime.prototype.addSeconds = function (num) {
        var addMillis = num * 1000;
        var time = this.getTime();
        return new DateTime(time + addMillis);
    };
    /**
     * 增加毫秒数，构造一个新的日期
     * @param num 毫秒数数量
     */
    DateTime.prototype.addMilliseconds = function (num) {
        var addMillis = num;
        var time = this.getTime();
        return new DateTime(time + addMillis);
    };
    /**
     * 和另外一个日期比较，是否相同日期
     * @param equalDate
     * @return 返回true或false
     */
    DateTime.prototype.equalTo = function (equalDate) {
        return (this._date.getTime() ===
            equalDate._date.getTime());
    };
    /**
     * 与一个日期对象差的天数，不足一天舍弃不计算，并且不区分正负，返回一个正整数
     * @param compareDate 比较的日期
     * @return 返回一个正整数，不关心谁大
     */
    DateTime.prototype.diffDays = function (compareDate) {
        var diff = Math.abs(this._date.getTime() - compareDate._date.getTime());
        var result = Math.floor(Math.abs(diff) / MILLISECONDS_DAY);
        return result;
    };
    /**
     * 获取时间戳，单位：毫秒
     * @return 返回一个正整数，单位：毫秒
     */
    DateTime.prototype.getTime = function () {
        return this._date.getTime();
    };
    /**
     * 格式化显示距离当前日期已经过去多少时间
     * @return 返回一个字符串
     */
    DateTime.prototype.formatPassTime = function () {
        return DateTime.formatPassTime(this._date);
    };
    /**
     * 今天
     */
    DateTime.today = function () {
        var date = new Date();
        var dt = new DateTime(date.getFullYear(), date.getMonth() + 1, date.getDate());
        return dt;
    };
    /**
     * 当前时间
     */
    DateTime.now = function () {
        return new DateTime();
    };
    /**
     * 判断是否为闰年
     * @param year 年份
     */
    DateTime.isLeapYear = function (year) {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * 获取某年某月的天数
     * @param year 年份
     * @param month 月份
     * @return 这个月份的天数
     */
    DateTime.daysOfMonth = function (year, month) {
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                return 31;
            case 4:
            case 6:
            case 9:
            case 11:
                return 30;
            case 2:
                // 闰年判断
                if (DateTime.isLeapYear(year)) {
                    return 29;
                }
                else {
                    return 28;
                }
        }
        // 默认31
        return 31;
    };
    /**
     * 格式化现在的已过时间
     * @param startTime {Date} 开始时间
     * @param options 配置选项，可空
     *  例如：{yearText: '年前', monthText: '个月前', dayText: '天前',
     *        hourText: '小时前', minText: '分钟前', secondText: '刚刚'}
     * @return 格式化好的已过时间文本
     */
    DateTime.formatPassTime = function (startTime, options) {
        var sTime = null;
        if (startTime instanceof DateTime) {
            sTime = startTime.instanceOfDate;
        }
        else if (startTime instanceof Date) {
            sTime = startTime;
        }
        else {
            return '';
        }
        options = Object.assign({
            yearText: '年前',
            monthText: '个月前',
            dayText: '天前',
            hourText: '小时前',
            minText: '分钟前',
            secondText: '刚刚'
        }, options);
        var st = sTime.getTime();
        var currentTime = new Date().getTime(), time = currentTime - st, min = Math.floor(time / MILLISECONDS_MIN), hour = Math.floor(time / MILLISECONDS_HOUR), day = Math.floor(time / MILLISECONDS_DAY), month = Math.floor(time / (30 * MILLISECONDS_DAY)), year = Math.floor(time / (12 * 30 * MILLISECONDS_DAY));
        if (year)
            return "" + year + options.yearText;
        if (month)
            return "" + month + options.monthText;
        if (day)
            return "" + day + options.dayText;
        if (hour)
            return "" + hour + options.hourText;
        if (min)
            return "" + min + options.minText;
        return options.secondText;
    };
    /**
     * 格式化日期数据
     * @param date
     * @param format
     */
    DateTime.format = function (date, format) {
        format = format || 'yyyy-MM-dd hh:mm:ss';
        var d = (date instanceof Date) ? date : date.instanceOfDate;
        var o = {
            'M+': d.getMonth() + 1,
            'd+': d.getDate(),
            'h+': d.getHours(),
            'm+': d.getMinutes(),
            's+': d.getSeconds(),
            'q+': Math.floor((d.getMonth() + 3) / 3),
            'S+': d.getMilliseconds() // millisecond
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(format)) {
                var formatStr = '';
                for (var i = 1; i <= RegExp.$1.length; i++) {
                    formatStr += '0';
                }
                var replaceStr = '';
                if (RegExp.$1.length === 1) {
                    replaceStr = o[k];
                }
                else {
                    formatStr = formatStr + o[k];
                    var index = ('' + o[k]).length;
                    formatStr = formatStr.substr(index);
                    replaceStr = formatStr;
                }
                format = format.replace(RegExp.$1, replaceStr);
            }
        }
        return format;
    };
    return DateTime;
}());
exports["default"] = DateTime;

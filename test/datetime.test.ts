import DateTime from '../src/index';
import * as mocha from 'mocha';
import * as chai from 'chai';

const expect = chai.expect;
describe('My datetime library', () => {

  it('测试DateTime.isLeapYear()是否正确' , () => {
    expect(DateTime.isLeapYear(2020)).to.equal(true);
  });

  it('测试DateTime.new()是否正确' , () => {
    const current = new Date();
    expect(new DateTime().toString('yyyy-M-d')).
      to.equal(`${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`);
  });

  it('测试DateTime.new(2020)是否正确' , () => {
    expect(new DateTime(2020).toString('yyyy-MM-dd')).to.equal('1970-01-01');
  });

  it('测试DateTime.new(2020, 2)是否正确' , () => {
    expect(new DateTime(2020, 2).toString('yyyy-MM-dd')).to.equal('2020-02-01');
  });

  it('测试DateTime.new(\'2020\')是否正确' , () => {
    expect(new DateTime('2020').toString('yyyy-MM-dd')).to.equal('2020-01-01');
  });

  it('测试DateTime.new(\'\')是否正确' , () => {
    expect(new DateTime('').toString('yyyy-MM-dd')).to.equal('NaN-aN-aN');
  });

  it('测试DateTime.new(new Date())是否正确' , () => {
    expect(new DateTime(new Date(2020, 1, 18)).toString('yyyy-MM-dd')).to.equal('2020-02-18');
  });

  it('测试DateTime.new()是否正确' , () => {
    expect(new DateTime('2020-2-18').toString('yyyy-MM-dd')).to.equal('2020-02-18');
  });

  it('测试DateTime.toString()是否正确' , () => {
    expect(new DateTime(2020, 2, 2).toString()).to.equal('2020-02-02 00:00:00');
  });

  it('测试DateTime.toString("yyyy-MM-dd")是否正确' , () => {
    expect(new DateTime(2020, 2, 2, 2, 2, 2).toString('yyyy-MM-dd')).to.equal('2020-02-02');
  });

  it('测试DateTime.toString("hh:mm:ss")是否正确' , () => {
    expect(new DateTime(2020, 2, 2, 2, 2, 2).toString('hh:mm:ss')).to.equal('02:02:02');
  });

  it('测试DateTime.toString("yyyy-MM-dd hh:mm")是否正确' , () => {
    expect(new DateTime(2020, 2, 2, 2, 2, 2).toString('yyyy-MM-dd hh:mm')).to.equal('2020-02-02 02:02');
  });

  it('测试DateTime.toString("yyyy-MM-dd hh:mm:ss")是否正确' , () => {
    expect(new DateTime(2020, 2, 2, 2, 2, 2).toString('yyyy-MM-dd hh:mm:ss')).to.equal('2020-02-02 02:02:02');
  });

  it('测试DateTime.toString("yyyy-MM-dd hh:mm:ss.SSS")是否正确' , () => {
    expect(new DateTime(2020, 2, 2, 2, 2, 2, 200).toString('yyyy-MM-dd hh:mm:ss.SSS')).to.equal('2020-02-02 02:02:02.200');
  });

  it('测试DateTime.isLeapYear()是否是闰年 -- 闰年年份' , () => {
    expect(new DateTime(2020, 2, 29).isLeapYear()).to.equal(true);
  });

  it('测试DateTime.isLeapYear()是否是闰年 -- 平年年份' , () => {
    expect(new DateTime(2021, 2, 2).isLeapYear()).to.equal(false);
  });

  it('测试DateTime.addYears()是否正确 -- 正常年份' , () => {
    expect(new DateTime(2020, 1, 29).addYears(-2).toString('yyyy-MM-dd')).to.equal('2018-01-29');
  });

  it('测试DateTime.addYears()是否正确 -- 测试闰年' , () => {
    expect(new DateTime(2020, 2, 29).addYears(1).toString('yyyy-MM-dd')).to.equal('2021-02-28');
  });

  it('测试DateTime.addMonths()是否正确 -- 正常天数' , () => {
    expect(new DateTime(2020, 2, 29).addMonths(1).toString('yyyy-MM-dd')).to.equal('2020-03-29');
  });

  it('测试DateTime.addMonths()是否正确 -- 闰年2月到平年2月份' , () => {
    expect(new DateTime(2020, 2, 29).addMonths(12).toString('yyyy-MM-dd')).to.equal('2021-02-28');
  });

  it('测试DateTime.addMonths()是否正确 -- 31天月份到30天月份' , () => {
    expect(new DateTime(2020, 8, 31).addMonths(1).toString('yyyy-MM-dd')).to.equal('2020-09-30');
  });

  it('测试DateTime.addDays()是否正确 -- 正常增加' , () => {
    expect(new DateTime(2020, 8, 8).addDays(1).toString('yyyy-MM-dd')).to.equal('2020-08-09');
  });

  it('测试DateTime.addDays()是否正确 -- 跨月' , () => {
    expect(new DateTime(2020, 8, 30).addDays(3).toString('yyyy-MM-dd')).to.equal('2020-09-02');
  });

  it('测试DateTime.addDays()是否正确 -- 跨年' , () => {
    expect(new DateTime(2020, 12, 30).addDays(3).toString('yyyy-MM-dd')).to.equal('2021-01-02');
  });

  it('测试DateTime.addHours()是否正确 -- 正常' , () => {
    expect(new DateTime(2020, 12, 30, 12, 12, 12).addHours(2).toString('yyyy-MM-dd hh:mm:ss'))
      .to.equal('2020-12-30 14:12:12');
  });

  it('测试DateTime.addHours()是否正确 -- 跨天' , () => {
    expect(new DateTime(2020, 12, 30).addHours(25).toString('yyyy-MM-dd hh:mm:ss')).to.equal('2020-12-31 01:00:00');
  });


  it('测试DateTime.formatPassTime() 是否正确 -- 距离2年前' , () => {
    expect(new DateTime(2018, 4, 17).formatPassTime()).to.equal('2年前');
  });

  it('测试DateTime.formatPassTime() 是否正确 -- 距离2年前' , () => {
    expect(DateTime.formatPassTime(new DateTime(2018, 4, 17))).to.equal('2年前');
  });

  it('测试DateTime.formatPassTime() 是否正确 -- 距离3个月前' , () => {
    expect(new DateTime().addMonths(-3).formatPassTime()).to.equal('3个月前');
  });

  it('测试DateTime.formatPassTime() 是否正确 -- 距离3天前' , () => {
    expect(new DateTime().addDays(-3).formatPassTime()).to.equal('3天前');
  });

  it('测试DateTime.format() 是否正确 -- 2020-06-08' , () => {
    expect(DateTime.format(new DateTime(2020, 6, 8))).to.equal('2020-06-08 00:00:00');
  });

  it('测试DateTime.format() 是否正确 -- 2020-06-08 22:30' , () => {
    expect(DateTime.format(new DateTime(2020, 6, 8, 22, 30), 'yyyy-MM-dd hh:mm')).to.equal('2020-06-08 22:30');
  });

  it('测试DateTime.format() 是否正确 -- 2020-06-08 22:30:30' , () => {
    expect(DateTime.format(new DateTime(2020, 6, 8, 22, 30, 30), 'yyyy-MM-dd hh:mm:ss')).to.equal('2020-06-08 22:30:30');
  });

  it('测试DateTime.format() 是否正确 -- 2020-06-08 22:30:30.404' , () => {
    expect(DateTime.format(new DateTime(2020, 6, 8, 22, 30, 30, 404), 'yyyy-MM-dd hh:mm:ss.SSS')).to.equal('2020-06-08 22:30:30.404');
  });

  it('测试DateTime.format() 是否正确 -- 1季度' , () => {
    expect(DateTime.format(new DateTime(2020, 1, 8), 'q')).to.equal('1');
  });

  it('测试DateTime.format() 是否正确 -- 2季度' , () => {
    expect(DateTime.format(new DateTime(2020, 6, 30), 'q')).to.equal('2');
  });

  it('测试DateTime.format() 是否正确 -- 3季度' , () => {
    expect(DateTime.format(new DateTime(2020, 7, 1), 'q')).to.equal('3');
  });

  it('测试DateTime.format() 是否正确 -- 4季度' , () => {
    expect(DateTime.format(new DateTime(2020, 11, 1), 'q')).to.equal('4');
  });

  it('测试DateTime.format() 是否正确 -- 21年' , () => {
    expect(DateTime.format(new DateTime(2021, 11, 1), 'yy')).to.equal('21');
  });

  it('测试DateTime.dayOfWeek() 是否正确 -- 星期天' , () => {
    expect(new DateTime(2021, 2, 7).dayOfWeek()).to.equal(0);
  });

  it('测试DateTime.dayOfWeek() 是否正确 -- 星期六' , () => {
    expect(new DateTime(2021, 2, 6).dayOfWeek()).to.equal(6);
  });

  it('测试DateTime.dayOfYear() 是否正确 -- 1' , () => {
    expect(new DateTime(2021, 1, 1, 23, 23, 59).dayOfYear()).to.equal(1);
  });

  it('测试DateTime.dayOfYear() 是否正确 -- 40' , () => {
    expect(new DateTime(2021, 2, 9).dayOfYear()).to.equal(40);
  });

  it('测试DateTime.weekOfYear() 是否正确 -- 7' , () => {
    expect(new DateTime(2021, 2, 9).weekOfYear()).to.equal(7);
  });

  it('测试DateTime.daysOfMonth() 是否正确 -- 28' , () => {
    expect(new DateTime(2021, 2, 9).daysOfMonth()).to.equal(28);
  });

  it('测试DateTime.daysOfMonth() 是否正确 -- 31' , () => {
    expect(new DateTime(2021, 1, 9).daysOfMonth()).to.equal(31);
  });

  it('测试DateTime.equalTo() 是否正确 -- true' , () => {
    expect(new DateTime(2021, 1, 9).equalTo(new DateTime(2021, 1, 8).addDays(1))).to.equal(true);
  });

  it('测试DateTime.diffDays() 是否正确 -- 1' , () => {
    expect(new DateTime(2021, 1, 9).diffDays(new DateTime(2021, 1, 8))).to.equal(1);
  });

  it('测试DateTime.today() 是否正确 -- 2021-02-09' , () => {
    const current = new Date();
    expect(DateTime.today().toString('yyyy-M-d'))
      .to.equal(`${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`);
  });
});
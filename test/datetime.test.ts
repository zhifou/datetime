import DateTime from '../src/index';
import * as mocha from 'mocha';
import * as chai from 'chai';

const expect = chai.expect;
describe('My datetime library', () => {

  it('测试DateTime.isLeapYear()是否正确' , () => {
    expect(DateTime.isLeapYear(2020)).to.equal(true);
  });

  it('测试DateTime.toString()是否正确' , () => {
    expect(new DateTime(2020, 2, 2).toString()).to.equal('2020-02-02');
  });

  it('测试DateTime.toString("yyyy-MM-dd hh:mm:ss.fff")是否正确' , () => {
    expect(new DateTime(2020, 2, 2, 2, 2, 2, 200).toString('yyyy-MM-dd hh:mm:ss.fff')).to.equal('2020-02-02 02:02:02.200');
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

  it('测试DateTime.formatPassTime 是否正确 -- 距离2年前' , () => {
    expect(new DateTime(2018, 4, 17).formatPassTime()).to.equal('2年前');
  });

  it('测试DateTime.formatPassTime 是否正确 -- 距离2年前' , () => {
    expect(DateTime.formatPassTime(new DateTime(2018, 4, 17))).to.equal('2年前');
  });

  it('测试DateTime.formatPassTime 是否正确 -- 距离3个月前' , () => {
    expect(new DateTime(2020, 2, 29).formatPassTime()).to.equal('3个月前');
  });

  it('测试DateTime.formatPassTime 是否正确 -- 距离3天前' , () => {
    expect(new DateTime(2020, 6, 5).formatPassTime()).to.equal('3天前');
  });

  it('测试DateTime.format 是否正确 -- 2020-06-08' , () => {
    expect(DateTime.format(new DateTime(2020, 6, 8))).to.equal('2020-06-08');
  });

  it('测试DateTime.format 是否正确 -- 2020-06-08 22:30' , () => {
    expect(DateTime.format(new DateTime(2020, 6, 8, 22, 30), 'yyyy-MM-dd hh:mm')).to.equal('2020-06-08 22:30');
  });
});


// console.log(new DateTime().addDays(1));
// console.log(new DateTime().diffDays(new DateTime(2020, 2, 10)));
// console.log(new DateTime().dayOfYear());
// console.log(new DateTime().getTime());
// console.log(new DateTime(1583035200000).toString());
// console.log(new DateTime().dayOfYear());
// console.log(new DateTime().getMilliseconds());
// const dt: DateTime = new DateTime();
// console.log(dt.toString('yyyy-MM-dd hh:mm:ss.fff'));
// const dt1: DateTime = dt.addMilliseconds(123);
// const dt2: DateTime = new DateTime();
// console.log(dt1.toString('yyyy-MM-dd hh:mm:ss.ff'));
// console.log(dt1.compareTo(dt2));
// console.log(new DateTime('2020-03-03').addDays(-1));
// console.log(new DateTime('2020-03-03').getTime() / 1000);
// console.log(new DateTime(2020, 4, 1).toString());
// console.log(new DateTime(2020, 4, 1).addDays(-1).toString());
// console.log(new DateTime(2020, 4, 1).addDays(-2).toString());
// console.log(new DateTime(2020, 2, 29).addDays(-1).toString());
// console.log(new DateTime(2020, 3, 1, 0, 15, 0).addDays(10).toString('yyyy-MM-dd hh:mm:ss.fff'));
// console.log(new DateTime(2020, 3, 1, 0, 0, 0).addHours(-1).toString('yyyy-MM-dd hh:mm:ss.fff'));
// console.log(new DateTime(2020, 3, 31).addMonths(-1).toString('yyyy-MM-dd hh:mm:ss.yyy'));
// console.log(new DateTime().addYears(4).toString());
// console.log(new DateTime().addMonths(-1).toString('yyyy-MM-dd hh:mm:ss.fff'));
// console.log(new DateTime().addMonths(1).toString('yyyy-MM-dd hh:mm:ss.fff'));
// console.log(new DateTime().isLeapYear());
// console.log(new DateTime().addYears(1).isLeapYear());
// console.log(new DateTime().addYears(1).toString('yyyy-MM-dd hh:mm:ss.fff'));
// console.log(new DateTime(2020, 2, 29).addYears(1).toString());
// console.log(new DateTime(2020, 12, 31).addMonths(-1).toString());
// console.log(new DateTime(2020, 8, 31).addMonths(1).toString());
// console.log(new DateTime(2020, 8, 31).addMonths(6).toString());
// console.log(new DateTime(2020, 3, 31).addMonths(-1).toString());
// console.log(new DateTime(2020, 1, 31).addMonths(1).toString());
// console.log(new DateTime(2020, 6, 30).addMonths(1).toString());
// console.log(new DateTime(2020, 6, 30).addMonths(-4).toString());
// console.log(new DateTime(2020, 6, 30).addYears(1).addMonths(-4).toString());
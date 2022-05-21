let d = new Date(2020, 2, 1, 10, 15, 30)
const options = {
  dateStyle: 'full', // full, long, medium, short
  timeStyle: 'full', // full, long, medium, short
  // localeMatcher: 'lookup', // 'best fit', 'lookup'
  // formatMatcher: 'basic', // 'basic', 'best fit'
  // weekday: 'long',   // long, short, narrow
  // year: 'numeric',   // 2-digit, numeric
  // month: 'long',     // 2-digit, long, narrow, numeric, short
  // day: 'numeric',    // 2-digit, long, numeric
  // hour: '2-digit',   // 2-digit, numeric
  // minute: '2-digit', // 2-digit, numeric
  // second: '2-digit', // 2-digit, numeric
  // hour12: true,      // true / false
  // hourCycle: 'h12', // h11, h12, h23, h24
  // timeZone: 'UTC',
  // timeZoneName: 'short'  // short, long
}

const opt={
  dateStyle: 'short', // full, long, medium, short
  timeStyle: 'short', // full, long, medium, short
}
console.log(d.toLocaleString('ja-JP', options))
console.log(d.toLocaleString('ja-JP', opt))
// 2020年3月1日日曜日 10時15分30秒 アメリカ太平洋標準時
console.log(d.toLocaleString('en-US', options))
console.log(d.toLocaleString('en-US', opt))
console.log(d.toLocaleString('en-US', {dateStyle: 'short'}))
// Sunday, March 1, 2020 at 10:15:30 AM Pacific Standard Time

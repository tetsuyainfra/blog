const { parseISO } = require('date-fns')
const { format, zonedTimeToUtc, utcToZonedTime } = require('date-fns-tz')

// Dateは常にUTC
// console.log(new Date('2000-01-01T00:00:00+09:00'))
//=> 1999-12-31T15:00:00.000Z

// 変換対象が"指定タイムゾーン"として扱う(しかし、出てくるのはUTCなDate)
// const utcDate: Date = zonedTimeToUtc('2000-01-01T00:00:00', 'Asia/Tokyo')
// //=> 1999-12-31T15:00:00.000Z

// 変換対象をUTCとして扱う(出てくるのはUTCなDate)
// const utcDate2 = parseISO('2000-01-01T00:00:00')
//=> 2000-01-01T00:00:00.000Z
// const utcDate2 = parseISO('2023-02-10')

// まとめ
// parseISO() -> utcToZonedTime(, output_timeZone)-> format(, {output_timeZone})
// - Dateは常にUTCなデータ
// - zonedTimeToUtcは、強制的にタイムゾーンを指定する
// - utcToZonedTimeを使えばDateを各タイムゾーンに合わせて変換できる
// - formatはDateをいじらず出力する
//   - 出力時のタイムゾーンを指定しておけばいいかな？
//   - xxxのフォーマット指定子を使うとタイムゾーンが出力される

function test1(input: string, inZone: string, outZone: string) {
  // 入力文字列とタイムゾーンを指定する
  const utcDate = zonedTimeToUtc(input, inZone)

  // 出力時のタイムゾーンを指定して変換する(出力はUTCがタイムゾーン分ずれている)
  const jstDate = utcToZonedTime(utcDate, outZone)

  const output_date = format(jstDate, 'yyyy-MM-dd HH:mm:ss xxx', {
    timeZone: outZone,
  })

  console.log('----------------------------------------')
  console.log('input  ', input)
  console.log('utcDate', utcDate)
  console.log('jstDate', jstDate)
  console.log('format ', output_date)
}

function test2(input: string, inZone: string, outZone: string) {
  // 入力文字列とタイムゾーンを指定する
  const utcDate = parseISO(input)

  // 出力時のタイムゾーンを指定して変換する(出力はUTCがタイムゾーン分ずれている)
  const jstDate = utcToZonedTime(utcDate, outZone)

  const output_date = format(jstDate, 'yyyy-MM-dd HH:mm:ss xxx', {
    timeZone: outZone,
  })

  console.log('----------------------------------------')
  console.log('input  ', input)
  console.log('utcDate', utcDate)
  console.log('jstDate', jstDate)
  console.log('format ', output_date)
}

// 入力元はJSTでJSTとして出力したら・・？
test1('2000-01-01T00:00:00', 'Asia/Tokyo', 'Asia/Tokyo')

// 入力元はUTCでJSTとして出力したら・・？
test1('2000-01-01T00:00:00', 'UTC', 'Asia/Tokyo')

console.log(`
// 入力データがUTCでタイムゾーンを指定して出力すると？
// ※Zが付くとUTC扱い `)
test1('2000-01-01T00:00:00Z', 'UTC', 'Asia/Tokyo')
test1('2000-01-01T00:00:00Z', 'Asia/Tokyo', 'Asia/Tokyo')

console.log(`
// parseISOバージョン`)
test2('2000-01-01T00:00:00Z', 'UTC', 'Asia/Tokyo')
test2('2000-01-01T00:00:00Z', 'Asia/Tokyo', 'Asia/Tokyo')

console.log(`
// 入力が日付まででも？ `)
test1('2023-02-10', 'Asia/Tokyo', 'Asia/Tokyo')

export function Test(perams: any[], expect: any) {
  return function(target: any, name: string, descriptor: any) {
    const func = descriptor.value
    console.log('开始执行Method:', name)
    const start = new Date().getTime()
    const res = func(...perams)
    const end = new Date().getTime()
    console.log('res===', res, start, end)
    console.log(`执行耗时：${start - end} \n测试结果：${res === expect ? 'true' : 'false'}` )
  }
}

// const fs = require('fs')
// const { promisify } = require('util')

// const readFile = promisify(fs.readFile)


// const data = fs.readFileSync('./static/test.js')
// console.log(data.toString())


// fs.readFile('./static/test.js', (err, data) => {
//   if (err) throw err
//   console.log('data=',data.toString())
// })

// (async () => {
//   const fs = require('fs')
//   // const { promisify } = require('util')
//   const { promisify }  = require('util')
//   const readFile = promisify(fs.readFile)
//   const data = await readFile('./static/test.js')
//   console.log(data)
// })()


const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  // conslog.log('this is a request', req)
  // res.end("helloooo world")

  const { url, method } = req
  if (url === '/' && method === 'GET') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8' })
        res.end('500')
        return
      }
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      res.end(data)
    })
  } else {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain;charset=utf-8' )
    res.end('没有数据找到')
  }
})

server.listen(3000, () => {
  console.log('port 3000')
})
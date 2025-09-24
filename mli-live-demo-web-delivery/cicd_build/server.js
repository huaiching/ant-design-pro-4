const express = require('express')
const compression = require('compression')
const http = require('http')
const fs = require('fs')

const apps = [
  {
    modelName: 'container',
    port: 8000
  },
  {
    modelName: 'claim',
    port: 8001
  },
  {
    modelName: 'demo',
    port: 8002
  },
  {
    modelName: 'agent',
    port: 8003
  }
]

function addHeaders(app) {
  // 在定義路由之前新增標頭
  app.use(function (req, res, next) {
    // 您希望允許連接的網站
    res.setHeader('Access-Control-Allow-Origin', '*')

    // 您希望允許的請求方法
    res.setHeader('Access-Control-Allow-Methods', '*')

    // 您希望允許的請求方法
    res.setHeader('Access-Control-Allow-Headers', '*')

    //如果您需要網站在傳送的請求中包含 cookie，則設定為 true
    // 到 API（例如，如果您使用會話）
    res.setHeader('Access-Control-Allow-Credentials', false)

    // 傳遞到下一層中介軟體
    next()
  })

  app.use(compression())
}

function initExpressApp(app, filePath) {
  addHeaders(app)
  app.use('/', express.static(`webroot/${filePath}`, { index: ['index.html', 'index.htm'] }))

  // app.get('/config.json', (req, res) => {
  //   res.type('application/json')
  //   res.json({
  //     ...configEnv
  //   })
  // })

  app.get('/config.json', function (req, res) {
    const config = fs.readFileSync('config.json', 'utf-8')
    res.send(config)
  })

  app.get('/*', function (req, res) {
    const html = fs.readFileSync(`webroot/${filePath}/index.html`, 'utf-8')
    res.send(html)
  })

  app.get('/health', (req, res) => {
    res.status(200).send('OK')
  })
}

apps.forEach((app) => {
  const expressServer = express()
  initExpressApp(expressServer, app.modelName)
  const server = http.createServer(expressServer)
  server.listen(app.port, () =>
    console.info(`${app.modelName}App is listening on port ${app.port}`)
  )
})

const http = require('http')
const PORT = process.env.PORT || 5000
const data = require('./mockdata')



const server = http.createServer((req, res) => {

  let statusCode = 404
  let body = []
  let { method, url } = req
  let response = {
    success: false,
    data: null
  }

  req
    .on('data', (chunk) => {
      body.push(chunk)
    })

    .on('end', () => {

      if (method === 'GET' && url === '/todos') {
        statusCode === 200
        response.success = true
        response.data = data
      }

      if (method === 'POST' && url === '/todos') {
        const parsedBody = JSON.parse(body)
        const { id, title, duration } = parsedBody
        if (!id || !title) {
          response.success = false
          response.data = null
          response.error = "Invalid id or title"
        }
        else {
          data.push({id, title, duration})
          statusCode === 201
          response.success = true
          response.data = data
        }
      }


      res.writeHead(statusCode, {
        'Content-Type': 'application/json',
        'X-Powered-By': 'Node.js'
      })

      body = Buffer.concat(body).toString()

      res.end(JSON.stringify(response))
    })
})



server.listen(PORT, () => console.log(`Server running port on ${PORT}`))
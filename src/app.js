const http = require('http')
const fs = require('fs')
const path = require('path')
const ws = require('ws')
const express = require('express')

const port = 9095

const app = express()
const server = http.createServer(app)
const wss = new ws.Server({server})

const pixelData= [
  ['red','yellow','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink'],['red','yellow','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink'],['red','yellow','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink'],['red','yellow','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink'],['red','yellow','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink'],['red','yellow','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink'],['red','yellow','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink'],['red','yellow','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink'],['red','yellow','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink'],['red','yellow','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink'],['red','yellow','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink'],['red','yellow','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink'],['red','yellow','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink'],['red','yellow','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink'],['red','yellow','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink'],['red','yellow','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink'],['red','yellow','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink'],['red','yellow','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink'],['red','yellow','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink'],['red','yellow','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink','green','pink','red','yellow','green','pink'],
]




wss.on('connection',(ws,req) => {  //req建立
  ws.send(JSON.stringify({
    type:'init',
    pixelData:pixelData,
  })) //建立请求后发送画板数据

  ws.on('message', msg => {
    msg = JSON.parse(msg)
     
    if(msg.type == 'drawDot') {
      pixelData[msg.y][msg.x] = msg.color
      //告诉每一个客户端
      wss.clients.forEach(client => {
        client.send(JSON.stringify({
          type:'updateDot',
          x:msg.x,
          y:msg.y,
          color:msg.color,
        }))
      })
    }

  }) //监听事件


})

app.use(express.static(path.join(__dirname,'./static')))

server.listen(port,() => {
  console.log('server listening on port',port)
})
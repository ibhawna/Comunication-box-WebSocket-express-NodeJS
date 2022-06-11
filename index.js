const express = require('express')
const {WebSocketServer, WebSocket} = require('ws')
const path =  require('path')
const filepath = path.join(__dirname, 'file')
const app = express()
const port = 3500;
const wss = new WebSocketServer({
    port: 3501,
    clientTracking: true
})
// sending connections
wss.on('connection', function connection(ws) { 
    ws.on('message', function message(event){
        // const message = Buffer.from(event).toString()
        // console.log('recieved: ', message)
        const rawMsg = Buffer.from(event).toString()
        try{
            const {sender, message} = JSON.parse(rawMsg)
            for(const client of wss.clients){
                if(client.readyState === WebSocket.OPEN){
                    client.send(JSON.stringify({
                        sender, message
                    }))
                }
                
            }
        }

        // console.log(wss.clients)

        catch(error){

        }
        



    })
    ws.send(JSON.stringify({
        sender:'system',
        message: 'connection is established'
    }))
})

app.use(express.static(filepath))

// app.get('/', (req,res)=>{
//     console.log('hello')
//     res.send('hello from vscode')
// })


app.listen(port, ()=>{
    console.log(`listening to the server on port ${port}`)
})
// ws ==> download websockets


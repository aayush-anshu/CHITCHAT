const express = require('express');
const { Socket } = require('socket.io');
const app = express();

const http = require('http').createServer(app);



const PORT = process.env.PORT || 8000

http.listen(PORT, ()=>{
    console.log(`Listening on port http://localhost:${PORT}`)
})

app.use(express.static(__dirname + '/Myfiles'))

// Creating a server
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

// http pass beacuse to know on which server to work
const io = require('socket.io')(http)

io.on('connection',(socket)=>{
    console.log('connected...')

    socket.on('message',(msg)=>{
        // console.log(msg)
        socket.broadcast.emit('message',msg)
    })

})
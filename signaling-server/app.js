const  express=require ('express')
const {Server} =require('socket.io')
const http=require('http')
const cors=require('cors')

const app=express()
app.use(cors())

const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        // origin:'http://127.0.0.1:5500',
        origin:'http://localhost:5500',
        methods:["GET","POST"],
        allowedHeaders: ["*"],
    }
})
  
io.on('connection',(socket)=>{
 console.log(socket.id);
 socket.on('new_message1', (data) => {
    //send message to others except caller
    console.log(data);
    socket.broadcast.emit('new_message1', data);
})
})

app.get('/',(req,res)=>{
    res.send('socket chart started')
})

server.listen(8000,()=>console.log('app started at port  8000'))
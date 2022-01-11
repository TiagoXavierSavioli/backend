const express = require('express')
require('express-async-errors');
const morgan = require('morgan');
const { Server } = require('socket.io')
const http = require('http');

//routes
const chatRouter = require('./Utils/routes/chat')
const userRouter = require('./Utils/routes/user.js');
const momentRouter = require('./Utils/routes/moments.js')
const coordinateRouter = require('./Utils/routes/Coordinates')

require('./database')

//app
const app = express();
app.use(express.json());

// log route actions
if(process.env.NODE_ENV === 'devolpment') {
    app.use(morgan('dev'))
}

//use routes
app.use(
    userRouter,
    momentRouter,
    coordinateRouter,
    chatRouter,
)


app.use((err, req, res, next) => {
    if(err instanceof Error){
        return res.status(400).json({
            error: err.message
        })
    }
    return res.status(500),json({
        status: 'error',
        message: 'Internal Server Error'
    })
})
const port = process.env.PORT || 3000;

const serverHttp = http.createServer(app)

const io = new Server(serverHttp)

io.on('connection', (socket) => {
    console.log(socket.id)
})

app.listen(port, () => console.log(`Server running on port ${port}`));
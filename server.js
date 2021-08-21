const express = require('express')
require('express-async-errors');
const morgan = require('morgan');


//routes
const userRouter = require('./src/Utils/routes/user.js');
const momentRouter = require('./src/Utils/routes/moments.js')
const coordinateRouter = require('./src/Utils/routes/Coordinates')

require('./src/database')

//app
const app = express();
app.use(express.json());

// log route actions
if(process.env.NODE_ENV === 'devolpment') {
    app.use(morgan('dev'))
}

//use routes
app.use(userRouter, momentRouter, coordinateRouter)


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

app.listen(port, () => console.log(`Server running on port ${port}`));
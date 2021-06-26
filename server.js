const express = require('express')
require('express-async-errors');
const mongoose = require('mongoose');
const config = require('config');
const morgan = require('morgan');
const router = require('./src/Utils/router');
const app = express();
const server = require("http").createServer(app);

app.use(express.json());

// connect to mongo db
const db = config.get('mongoURI');
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log('mongodb is connected...'))
    .catch((err) => console.log(err))

// log route actions
if(process.env.NODE_ENV === 'devolpment') {
    app.use(morgan('dev'))
}

//use routes
app.use(router)
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
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const morgan = require('morgan');
const dotenv = require('dotenv');
const router = require('./src/Utils/router');

{/*io.use(async (socket, next) => {
    try {
      const token = socket.handshake.query.token;
      const payload = await jwt.verify(token, process.env.SECRET);
      socket.userId = payload.id;
      next();
    } catch (err) {}
  });

  io.on("connection", (socket) => {
    console.log("Connected: " + socket.userId);
  
    socket.on("disconnect", () => {
      console.log("Disconnected: " + socket.userId);
    });
  });
*/}

const app = express();

// boorder parser middleware
app.use(express.json());

// load env
//dotenv.config({ path: './config.env'})


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
//auth routes
app.use(router)

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`))



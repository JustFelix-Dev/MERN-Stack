const express = require('express');
const cors = require('cors')
const workoutRoutes = require('./routes/workout');
const userAuth = require('./routes/userAuth')
require('dotenv').config();
const morgan = require('morgan');
const { default: mongoose } = require('mongoose');
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Connect to DB
mongoose.connect(process.env.MONGOURI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
       console.log('Connected & Listening to port', process.env.PORT)
    })
}).catch((err)=>{
    console.log(err)
})


// Routes
app.use('/workout',workoutRoutes);
app.use(userAuth);

// VERCEL Deployment
if (process.env.NODE_ENV === "production") {
    const path = require("path");
    app.use(express.static(path.resolve(__dirname, 'client', 'build')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'),function (err) {
            if(err) {
                res.status(500).send(err)
            }
        });
    })
}


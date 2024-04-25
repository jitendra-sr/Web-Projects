// require('./db/connect'); // directly connecting to db after server spin
const connectDB=require('./db/connect');
const express=require('express');
const app=express();
const tasks=require('./routes/tasks');
require('dotenv').config(); // package facilitates setting and using environment variables
const notFound=require('./middlewares/not-found');
const errorHandlerMiddleware=require('./middlewares/error-handler');

app.use(express.static('public'));
app.use(express.json());

app.use('/api/v1/tasks',tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port=process.env.PORT || 4000;

// NOte: We can define the env variables in the .env file or on terminal while executing the file. Eg: PORT=5000 node app.js

// app.listen(port,()=>{
//     console.log('Server is listening..ṭ.');
// }) // We want to start server only after we have connected to db

const start = async ()=>{ // Since connectDB function will return a promise
    try {
        // await connectDB().then(()=>{console.log('Connected to db!')}); // using hard coded connection string
        await connectDB(process.env.MONGO_URI).then(()=>{console.log('Connected to db!')}); // using environment variables as connection string
        app.listen(port,()=>{console.log('Server is listening...')});
    } catch (error) {
        console.log(error);
    }
}
start();
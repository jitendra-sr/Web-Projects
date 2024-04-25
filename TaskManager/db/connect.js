const mongoose=require('mongoose');

// const connectionString='mongodb+srv://jitendra-sr:0A6PQyvY0YfK3H13@nodeexpressprojects.e3gaufa.mongodb.net/?retryWrites=true&w=majority&appName=NodeExpressProjects'
// Note: for security reasons we will use connectionString from '.env' file and we add '.env' to '.gitignore' so that no one have it if we have uploaded our code to github.
// And that's why we have made connectDB accept a argument.

// {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopplogy: true
// } // pass these options along with  connectionString to avoid warnings from db side

// mongoose.connect(connectionString).then(()=>{
//     console.log('Connected to db');
// }).catch((err)=>{
//     console.log(err);
// })
// // Now executing the app.js the server is spinning first and then the connection with db establishes, but in general we want to connect with db first so that if the db connection got failed then no need to start the server.
// // For that we will pass the connection promise to the app.js itself

const connectDB = (url)=>{
    // return mongoose.connect(connectionString);
    return mongoose.connect(url);
}
module.exports=connectDB;

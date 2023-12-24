const express = require('express');
const morgan = require("morgan");
const cors = require('cors');
const errorMiddleware = require('./middlewares/error');
// const bodyParser = require('body-parser')
const path = require('path');
require('dotenv').config();
const app = express();

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
  
    next();
  });
// const formData = require("express-form-data");

// const options = {
//     uploadDir: os.tmpdir(),
//     autoClean: true
//   };

// app.use(bodyParser())
app.use(cors());
// app.use(formData.parse(options));
// app.use(formData.format());
// // change the file objects to fs.ReadStream 
// app.use(formData.stream());
// // union the body and the files
// app.use(formData.union());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/public', express.static('public'));

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.get("/test", (req, res) => {
  res.send("This is a stackoverflow clone api")
})

// if (process.env.NODE_ENV != "production") {
//     require('dotenv').config({ path: './config/config.env' });
// }

// admin routes
const user = require('./routes/user');
const article = require('./routes/article');

app.use('/api/', user);
app.use('/api/', article);






// deployment
// __dirname = path.resolve();

// if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
//     app.use(express.static(path.join(__dirname, '../admin/build')));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, '../admin', 'build', 'index.html'));
//     });
// } else {
//     app.get('/', (req, res) => {
//         res.send('Server is Running! 🚀');
//     });
// }

// app.get('/', (req, res) => {
//     res.send('Server is Running! 🚀');
// });


// error middleware
app.use(errorMiddleware);
module.exports = app;
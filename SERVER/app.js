require('dotenv').config()

const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors');


const app = express();


// MY ROUTES
const authRoutes = require("./routes/auth");
const studentRoutes = require('./routes/student');
const professorRoutes = require('./routes/professor');
const articleRoutes = require('./routes/article');
const companyRoutes = require('./routes/company');
const deptRoutes = require('./routes/department');
const quesRoutes = require('./routes/question');

// DB CONNECTION
mongoose.connect(process.env.DATABASE ,{
    // useUnifiedTopology: true
}).then(() => {
    console.log("Database Connected");
}).catch((err) => {
    console.log(err);
});


// MIDDLEWARES
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// MY ROUTES
app.use('/api', authRoutes);
app.use('/api', studentRoutes);
app.use('/api', professorRoutes);
app.use('/api', articleRoutes);
app.use('/api',companyRoutes);
app.use('/api', deptRoutes);
app.use('/api', quesRoutes);





// NODEMAILSER STUFF
const nodemailer = require('nodemailer');
app.post("/send_mail", cors(), async(req, res) => {
    let {text} = req.body;
    const transport = nodemailer.createTransport({
        service:"gmail",
        auth: {
            user:"shamgar.exp@gmail.com",
            pass:"Shamgar@1exp"
        }
    })

    await transport.sendMail({
        from:"shamgar.exp@gmail.com",
        to:"shamgar.kommerla@gmail.com",
        subject:"test email",
        html:
        `
            <div>Test email</div>
            <p>${text}</p>
        `
    }
    )






})





















// PORT
const port = process.env.PORT || 8000

// Starting the server
app.listen(port, () => {
    console.log(`App is running at ${port}`);
})
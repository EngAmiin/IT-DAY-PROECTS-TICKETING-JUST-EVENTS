
const exp = require('express');
const app = exp()
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config()
app.use(exp.json())
app.use(cors())

// routes
const stdRouter = require("./routes/students.route");

app.use("/portal/student",stdRouter);

// listen

app.listen(3300,()=>console.log("running"))



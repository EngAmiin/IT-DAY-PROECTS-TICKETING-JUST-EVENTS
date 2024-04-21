
const exp = require('express');
const app = exp()
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config()
app.use(exp.json())
app.use(cors())

// routes
const stdRouter = require("./routes/students.route");
const userRouter = require("./routes/user.route");
const eventRouter = require("./routes/events.route")
const messageRouter = require("./routes/message")
const typeRouter = require("./routes/projectTypes")
app.use("/portal/student",stdRouter);
app.use("/portal/user",userRouter);
app.use("/portal/events",eventRouter);
app.use("/portal/messages",messageRouter);
app.use("/portal/projectTypes", typeRouter);

// listen

app.listen(3300,()=>console.log("running"))



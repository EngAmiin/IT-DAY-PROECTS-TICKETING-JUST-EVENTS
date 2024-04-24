
const exp = require('express');
const app = exp()
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config()
app.use(exp.json())
app.use(cors())
app.get("/", function(req, res, next) {
    return res.status(200).json({
        message : "welcome to the portal",
        description: "This portal is using for IT-DAY projects only",
        portal : "JUTSA",
        association_at : "JAMHUURIYA UNIVERSITY",
        developer : "Hadaf ICT",
        support : "jutsa@just.edu.so"
    })
})

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


app.use("/", function(req, res){
    return res.status(404).json({
        message : "the url you are requesting is not found",
        description : "you may request unavailable route, or you may mispelled the url. please make sure the url"
    })
})

// listen

app.listen(3300,()=>console.log("running"))



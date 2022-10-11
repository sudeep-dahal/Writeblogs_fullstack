const express=require('express')
const app=express();
const cors=require('cors')

app.use(cors())
app.use(express.json())


const db=require('./models')


//Routers

const postRouter=require("./routes/Posts")
app.use("/posts",postRouter);

const commentsRouter=require("./routes/Comments")
app.use("/comments",commentsRouter);

const usersRouter=require("./routes/Users")
app.use("/auth",usersRouter);





//sequelize and sync and listen
db.sequelize.sync().then(()=>{
    app.listen(5000,()=>{
        console.log("listening on port 5000")
    
    })

})




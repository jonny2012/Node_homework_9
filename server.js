import express from "express"
import { sequelize } from "./config/db.js"
import { router } from "./router.js"


const port =5001
const app = express()


app.use(express.json())
app.use("/api", router)
 


async function startApp(){
    
    try{
        sequelize.authenticate()
        sequelize.sync()
        console.log("successfull")
        app.listen(port)
        
    }
    catch(e){
        console.log(e)
    }
}

//npm run dev 
startApp().catch(console.dir)

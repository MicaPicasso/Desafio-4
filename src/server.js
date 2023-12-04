import express from "express"
import productsRouter from "./routes/products.router.js"
import cartRouter from "./routes/cart.router.js"

import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import productshbs from "./routes/productshbs.js"
import { Server } from "socket.io"

const app=express()
const httpServer= app.listen(8080, ()=> console.log("Escuchando desde el puerto 8080"))
const socketServer = new Server(httpServer)

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/api/products" , productsRouter)
app.use("/api/cart", cartRouter)
app.use(express.static(`${__dirname}/public`))
app.use("/", productshbs)

// app.get("/",(req,res)=>{
//     res.send("hola")
// })

// configuracion del motor de plantillas
app.engine("hbs", handlebars.engine({
    extname: "hbs",
    defaultLayout: "home"
}))

// seteo del motor
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`)

// rutas
const products=[];
socketServer.on("connection", (socketClient) =>{
    console.log("nuevo cliente conectado");
    socketClient.on("message", (data)=>{
     console.log(data);
    })

    // mensajes del form
    socketClient.on("form_message", (data)=>{
        console.log(data);
        products.push(data)
        socketClient.emit("form_list", products)
    })

    socketClient.emit("form_list", products)


    socketClient.on("form_delete", (data)=>{
        console.log(data);
        const index= products.findIndex((el)=> el.title === data)
        console.log(index);
        if(index === -1){
            console.log("no existe un producto con ese nombre");
            socketClient.emit("form_delete", "no existe un producto con ese nombre")
        }else{
            products.splice(index,1)
        }
      
        socketClient.emit("form_list", products)
    })
})
// app.listen(8080, ()=> console.log("Escuchando desde el puerto 8080"))
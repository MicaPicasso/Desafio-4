import { Router } from "express";
import {ProductManager} from "../productManager.js";

const router= Router()

const productManager=new ProductManager("./src/Productos.json");


// rutas 

router.get("/home",(req,res)=>{
    const products= productManager.getProducts()
   
    res.render("products",{
        list: products,
        style: 'style.css'
   })
})

router.get("/realTimeProducts", (req,res)=>{
    res.render("realTimeProducts", {
        style: "style.css"
    })
})


export default router
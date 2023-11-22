import { Router } from "express";
import {ProductManager} from "../productManager.js";

const router= Router()

const productManager=new ProductManager("./src/Productos.json");

router.get("/", (req,res)=>{
    const products= productManager.getProducts()
    const limit= req.query.limit
    if(limit){
        res.json(products.slice(0,limit))
    }else{
        res.json(products)

    }   
})

router.get("/:pid", (req,res)=>{
    const {pid}= req.params
    const id= productManager.getProductsById(Number(pid))
    res.json({product: id})

})

router.post("/", (req,res)=>{
    const {title,description,code,price, stock, category, thumbnails}= req.body
   
    const validacion= productManager.products.find((el)=> el.code === code)
    console.log(validacion);
    const newProduct= productManager.products[productManager.products.length - 1]
     if(validacion){
        res.json({status: "ya existe un producto con ese codigo"})
     }else{
        productManager.addProducts({
            title: title,
            description: description,
            code: code,
            price: Number(price),
            status: true,
            stock: Number(stock),
            category: category,
            thumbnails: thumbnails
        })
        res.json({"producto agregado": newProduct})
     }
    
})

router.put("/:pid", (req,res)=>{
    const {title,description,code,price, stock, category, thumbnails}= req.body
    const {pid}= req.params
    productManager.updateProduct({id: Number(pid), title:title, price:price, stock:stock}) 
    const products=productManager.products
    const id= products.findIndex((el)=>el.id === Number(pid))
    const product=products[id]
    res.json({product})
   
})

router.delete("/:pid", (req,res)=>{
    const {pid}= req.params
    const products=productManager.products
    const id= products.findIndex((el)=>el.id === Number(pid))
    const product=products[id]
    res.json({"producto eliminado": product})
    productManager.deleteProduct(Number(pid))
})

export default router
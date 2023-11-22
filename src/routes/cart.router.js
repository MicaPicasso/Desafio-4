import { Router } from "express";
import {CartManager} from "../productManager.js";

const router= Router()

const cartManager= new CartManager("./src/Cart.json")



router.post("/", (req,res)=>{
    cartManager.createCart()
    const carritos=cartManager.carts
    res.json({carts: carritos})
})



router.get("/:cid", (req,res)=>{
    const {cid}= req.params
    cartManager.getProductsByCartId(Number(cid))
    const index= cartManager.carts.findIndex((el)=> el.id === Number(cid))
    if(index=== -1){
        res.json({status: "el carrito solicitado no existe"})
    }
    const response= cartManager.carts[index].products
    res.json({carrito: Number(cid), products: response})

})


router.post("/:cid/product/:pid", (req,res)=>{
  const {pid,cid}=req.params
  cartManager.addProducts(Number(cid), Number(pid), "./src/Productos.json")
  const index= cartManager.carts.findIndex((el)=> el.id === Number(cid))
  const response= cartManager.carts[index]
    res.json({products: response})
    console.log(response);
    console.log(index);
})



export default router
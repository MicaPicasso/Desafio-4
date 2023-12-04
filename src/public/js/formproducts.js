const socket=io()

socket.emit("message", "mensaje desde el formulario")

const button= document.querySelector("#button")

socket.on("form_list", (data)=>{
    console.log(data);
    const div=document.querySelector("#div")

    div.innerHTML= `${data.map((product)=>`<h2>${product.title}</h2>
    <h3>${product.description}</h3>
    <p>Price: ${product.price}</p>
    <p>Stock: ${product.stock}</p>
    <p>Category: ${product.category}</p>
    <div class="line"></div>`)}`
})


button.addEventListener("click", (e)=>{
    e.preventDefault()

    const title= document.querySelector("#title")
    const description= document.querySelector("#description")
    const price= document.querySelector("#price")
    const stock= document.querySelector("#stock")
    const category= document.querySelector("#category")
    
    const product={
        title: title.value,
        description: description.value,
        price: price.value,
        stock: stock.value,
        category: category.value
    }

    socket.emit("form_message", product)

})

const eliminar= document.querySelector("#delete")

eliminar.addEventListener("click", (e)=>{
    e.preventDefault()

    const titleDelete= document.querySelector("#title-delete")
    const resp= document.querySelector("#resp")
    
    
    socket.emit("form_delete", titleDelete.value)
   
    socket.on("form_delete", (data)=>{
        console.log(data);
        resp.innerHTML=(data)
     })
    
    titleDelete.addEventListener("click", (e)=>{
        e.preventDefault()
        resp.innerHTML="";
     })
})



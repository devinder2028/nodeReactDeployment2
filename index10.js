// const http = require('http');
const express = require('express');
const fs = require('fs');
const morgan = require('morgan')
const index = fs.readFileSync('index.html','utf-8');
const data = JSON.parse(fs.readFileSync('data.json','utf-8'));

//const product = data.products[0];
const products = data.products;

const server = express();

//function ----------------------------------------------------------------------------
const createProduct = (req,res)=>{
    console.log(req.body);
    
    products.push(req.body);

    res.json(req.body)
}

const getAllProducts = (req,res)=>{
    
    res.json(products);
}

const getProduct = (req,res)=>{
    // console.log(req.params)
    // console.log(req.params.id)
    const myid = +req.params.id ;  //+ convert string to number

    const product = products.find(p=>p.id ===myid)
    res.json(product);
}

const replaceProduct = (req,res) =>{
    const id = +req.params.id;

                            // find give copy not the original object
    // const product = products.find(p=>p.id===id);
    
    const productIndex = products.findIndex(p=>p.id===id)

    //  ...  -> spread operator -> new object created with previous data

         //splice(index,  how many delete,  "new value",)

    products.splice(productIndex,1,{...req.body,id:id})

    res.status(201).json();
}

const updateProduct = (req,res) =>{
    const id = +req.params.id;

                            // find give copy not the original object
    // const product = products.find(p=>p.id===id);
    
    const productIndex = products.findIndex(p=>p.id===id)

    //  ...  -> spread operator

         //splice(index,  how many delete,  "new value",)

    const myitem = products[productIndex];

    products.splice(productIndex,1,{...myitem,...req.body})

    res.status(203).json();
}

const deleteProduct = (req,res) =>{
    const id = +req.params.id;

                            // find give copy not the original object
    // const product = products.find(p=>p.id===id);
    
    const productIndex = products.findIndex(p=>p.id===id)

    //  ...  -> spread operator -> new object created with previous data

         //splice(index,  how many delete,  "new value",)

    mydeltedItem = products[productIndex];
    products.splice(productIndex,1)  //like update 2nd parameter remove
                                    // but no 3rd parameter to add any thing

    res.status(205).json(mydeltedItem);
}

//---------------------------------------------------------------------------

// Middleware

server.use(express.json());  // express.json is middleware

//morgan middleware-3rd party
//server.use(morgan('dev'))
server.use(morgan('default'))

server.use((req,res,next)=>{
    console.log(req.method,req.ip,req.hostname,new Date());
    console.log(req.get("User-Agent"));
    next()
})

//REST API  ---------------------------------------------------

//Read Api  GET  /products
server.get('/products',getAllProducts)

//Read Api  GET  /products/:id
server.get('/products/:id',getProduct)

//CREATE API -- POST   /products      , createProduct is function
server.post('/products',createProduct)

// UPDATE API --- PUT   /products/:id
server.put('/products/:id',replaceProduct);

// PATCH API --- PATCH   /products/:id
server.patch('/products/:id',updateProduct);

// DELETE API --- DELETE   /products/:id
server.delete('/products/:id',deleteProduct);

//----------------------------------------------------------------

//server.listen(8070);

server.listen(8070,()=>{
    console.log('server started by devinder at 8070')
})


  
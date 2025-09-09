const express = require('express');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/' , (req, res)=> res.send('Hello World! we are in books crud'))

books=[{
    id:1,
    name:"Rich Dad Poor Dad",
    price: 2000,
    gen: 'v1.0'
}]

app.get('/getAllBooks' , (req , res)=>{
    res.status(200).send({books: books})
})

app.get('/getBookbyID/:ID' , (req, res)=>{
    console.log(req.params.ID);
    const ID = req.params.ID;
    const index = books.findIndex((b)=>b.id == ID);

    if(index == -1){
        res.status(404).send({msg: "Book not found" ,success: false})
    }else{
        const book = books.find((b)=> b.id == ID);
        res.status(200).send({book : book , status: true})
    }
})

app.post('/createBook' , (req, res)=>{
    console.log(req.body);
    newBook ={
        id: Date.now(),
        name: req.body.title,
        price: req.body.price,
        gen : req.body.gen
    }

    books.push(newBook)
    res.status(200).send({msg: "Book Added Successfully"})
})


app.delete('/deleteBook/:ID' , (req, res)=>{
    const ID = req.params.ID
    const index = books.findIndex((b)=> b.id == ID)

   if(index == -1){
    res.status(400).send({msg: "Book not Found" , success: false})

   }else{
    books.splice(index ,1)
    res.status(200).send({msg: "Book Deleted Successdully" , })
   }
})

app.put('/updateBook/:ID' , (req , res)=>{
    const ID = req.params.ID
    const index = books.findIndex((b)=> b.id == ID)

    if(index == -1){
        res.status(400).send({msg: "Book not Found ", success: false})
    }else{
        books[index].price = req.body.price || books[index].price
        res.status(200).send({msg: "Book updated successfully" })
    }
})


app.listen(port , ()=> console.log(`Example app listening on posrt ${port}!`));

// http://localhost:7777/getAllBooks
// http://localhost:7777/getBookbyID/1
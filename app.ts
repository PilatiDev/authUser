import express from "express";
import bodyParser from "body-parser";

const server = express();
server.use(bodyParser.urlencoded({extended:false}));

server.get("/ola", (req,res)=>{res.status(200).json("mundo")});
const port = 3000;
server.listen(port, ()=>console.log(`O server está rodando na porta: ${port}`))
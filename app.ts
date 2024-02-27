import express from "express";
import bodyParser from "body-parser";
import { registerUser } from "./src/controllers/registerUser";

const server = express();
server.use(express.json());

// server.get("/ola", (req,res)=>{res.status(200).json("mundo")});

server.post("/users", registerUser)
const port = 3000;
server.listen(port, ()=>console.log(`O server está rodando na porta: ${port}`))
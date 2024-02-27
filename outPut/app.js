"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registerUser_1 = require("./src/controllers/registerUser");
const server = (0, express_1.default)();
server.use(express_1.default.json());
// server.get("/ola", (req,res)=>{res.status(200).json("mundo")});
server.post("/users", registerUser_1.registerUser);
const port = 3000;
server.listen(port, () => console.log(`O server está rodando na porta: ${port}`));

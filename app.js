"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const server = (0, express_1.default)();
server.use(body_parser_1.default.urlencoded({ extended: false }));
server.get("/ola", (req, res) => { res.status(200).json("mundo"); });
const port = 3000;
server.listen(port, () => console.log(`O server está rodando na porta: ${port}`));
